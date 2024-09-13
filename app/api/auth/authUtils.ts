import { jwtDecode } from 'jwt-decode'

export const verifyToken = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp > currentTime
  } catch (error) {
    return false
  }
}

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Failed to refresh token:', error)
  }
  return null
}
