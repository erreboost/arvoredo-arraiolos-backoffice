'use client';
import useAuth from '@/hooks/useAuth';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const {authenticated, loading} = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!authenticated) {
    return <div>Acesso não autorizado</div>;
  }

  return <>{children}</>;
}
