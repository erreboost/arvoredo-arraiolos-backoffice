import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { useAuths } from '@/app/context/AuthContext'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setAuthenticated } = useAuths()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        setAuthenticated(true)
        const data = await res.json()
        localStorage.setItem('token', data.token)
        toast.success('Login')
        router.push('/')
      } else {
        const data = await res.json()
        setError(data.message || 'Authentication failed')
        toast.error(data.message || 'Authentication failed')
      }
    } catch (error) {
      setAuthenticated(false)
      console.error('Error during sign-in:', error)
      setError('Something went wrong')
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-[20px] flex gap-[2px] text-[12px]">
          <span>Ainda não possui uma conta?</span>
          <Link href={'/sign-up'} className="text-blue-400 hover:brightness-75">
            Registrar
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}
