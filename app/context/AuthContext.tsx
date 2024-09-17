import { refreshAuthToken, verifyToken } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  editors?: any[];
  setEditors: Dispatch<SetStateAction<any[] | undefined>>;
  userType?: {
    userGroup: string;
  };
  setUserType: Dispatch<SetStateAction<{ userGroup: string }>>;
  setLatLong: Dispatch<
    SetStateAction<{ latitude: number | string; longitude: number | string }>
  >;
  latLong: { latitude: number | string; longitude: number | string };
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  treeToDeleteId?: string;
  setTreeToDeleteId: Dispatch<SetStateAction<string | undefined>>;
  dataUpdated: any;
  setDataUpdated: any;
  coordinates: any;
  setCoordinates: Dispatch<SetStateAction<{ x: number; y: number }>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [editors, setEditors] = useState<any[]>();
  const [userType, setUserType] = useState<{ userGroup: string }>({
    userGroup: "",
  });
  const [latLong, setLatLong] = useState<{
    latitude: number | string;
    longitude: number | string;
  }>({ latitude: 0, longitude: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [treeToDeleteId, setTreeToDeleteId] = useState<string>();
  const [dataUpdated, setDataUpdated] = useState<string>();
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    const checkAuth = async () => {
      //console.log('Running useAuth hook...');
      if (token && verifyToken(token)) {
        setToken(token);
        setUserType(jwtDecode(token));
        setAuthenticated(true);
      } else if (refreshToken) {
        const newToken = refreshAuthToken(refreshToken);
        if (newToken) {
          localStorage.setItem("token", newToken.token);
          localStorage.setItem("refreshToken", newToken.refreshToken);
          setAuthenticated(true);
        } else {
          router.push("/sign-in");
        }
      } else {
        router.push("/sign-in");
      }
      setLoading(false);
    };

    checkAuth();
    // //console.log('useAuth hook finished.');
  }, []);

  // //console.log('Returning from useAuth:', {authenticated, loading});
  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        loading,
        setLoading,
        token,
        setToken,
        editors,
        setEditors,
        userType,
        setUserType,
        latLong,
        setLatLong,
        showDeleteModal,
        setShowDeleteModal,
        treeToDeleteId,
        setTreeToDeleteId,
        dataUpdated,
        setDataUpdated,
        coordinates,
        setCoordinates,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuths = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
