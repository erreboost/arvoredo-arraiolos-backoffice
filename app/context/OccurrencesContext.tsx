import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getAllOccurrences } from '../api/ocurrences'

interface OccurrencesContextType {
  allOccurrences: any
  setAllOccurrences: any
}

interface OccurrencesProviderProps {
  children: ReactNode
}

export const OccurrencesContext = createContext<
  OccurrencesContextType | undefined
>(undefined)

export const OccurrencesProvider: FC<OccurrencesProviderProps> = ({
  children,
}) => {
  const [allOccurrences, setAllOccurrences] = useState()

  useEffect(() => {
    getAllOccurrences(setAllOccurrences)
  }, [])

  return (
    <OccurrencesContext.Provider value={{ allOccurrences, setAllOccurrences }}>
      {children}
    </OccurrencesContext.Provider>
  )
}

export const useOccurrences = () => {
  const context = useContext(OccurrencesContext)
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider')
  }
  return context
}
