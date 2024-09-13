'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode' // Corrected import

export default function useAuth() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')

    const checkAuth = async () => {
      //console.log('Running useAuth hook...');
      if (token && verifyToken(token)) {
        setAuthenticated(true)
      } else if (refreshToken) {
        const newToken = refreshAuthToken(refreshToken)
        if (newToken) {
          localStorage.setItem('token', newToken.token)
          localStorage.setItem('refreshToken', newToken.refreshToken)
          setAuthenticated(true)
        } else {
          router.push('/sign-in')
        }
      } else {
        router.push('/sign-in')
      }
      setLoading(false)
    }

    checkAuth()
    //console.log('useAuth hook finished.');
  }, [router])
  //console.log('Returning from useAuth:', {authenticated, loading});
  return { authenticated, loading, setAuthenticated }
}

export const verifyToken = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp > currentTime
  } catch (error) {
    return false
  }
}

export const refreshAuthToken = (refreshToken: string) => {
  try {
    const decoded: any = jwtDecode(refreshToken)
    const currentTime = Math.floor(Date.now() / 1000)
    if (decoded.exp > currentTime) {
      return {
        token: decoded,
        refreshToken: refreshToken,
      }
    }
  } catch (error) {
    console.error('Failed to decode refresh token:', error)
  }
  return null
}
