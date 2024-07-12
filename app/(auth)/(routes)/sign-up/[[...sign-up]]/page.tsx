'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {toast} from 'react-hot-toast';

const isSecurePassword = (password: string) => {
  //  check password strength
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) return false;
  return true;
};

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isSecurePassword(password)) {
      setError(
        'A password deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.'
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('Registado efetuado! Avançando para Login...');
        router.push('/sign-in');
      } else {
        const data = await res.json();
        setError(data.message || 'O registo falhou');
        toast.error(data.message || 'Ocorreu um erro com o registo');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('Something went wrong');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4">Registar</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="firstName">Primeiro Nome</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="lastName">Apelido</Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'A carregar...' : 'Registar'}
        </Button>
      </form>
    </div>
  );
}
