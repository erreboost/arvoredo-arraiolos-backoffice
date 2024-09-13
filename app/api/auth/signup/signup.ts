import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password, securePasswordFlag } =
      req.body

    try {
      const response = await fetch(`${process.env.BASE_URL}/auth/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          securePasswordFlag,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return res.status(response.status).json({ message: errorData.message })
      }

      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error during sign-up:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
