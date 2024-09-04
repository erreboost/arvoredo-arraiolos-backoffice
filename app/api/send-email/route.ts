import { NextResponse, NextRequest } from 'next/server'
import dotenv from 'dotenv'
dotenv.config()

import nodemailer from 'nodemailer'
import { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  message?: string
  success?: string
  error?: string
}

const POST = async (req: Request | NextRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      return
    }

    const body = await req.json()

    //console.log('BODY', body)

    const info = {
      from: process.env.NEXT_PUBLIC_EMAIL_USERNAME_CONTACT_US,
      to: process.env.NEXT_PUBLIC_EMAIL_FIRST_TARGET,
      cc: '',
      subject: 'NEW ARVOREDO REPORT',
      text: 'ARVOREDO REPORT',
      html: `
        <p>Full Name: ${body.fullName}</p>
        <p>Email: ${body.email}</p>
        <p>Message: ${body.comments}</p>
        <p>CoordinateX: ${body.catchoordinateX}</p>
        <p>CoordinateY: ${body.catchoordinateY}</p>
      `,
    }

    //console.log(Object.assign({}, info));

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Changed to false, as secure: true is for port 465
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME_CONTACT_US,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD_CONTACT_US,
      },
    })

    const result = await transporter.sendMail(info)
    //console.log('RESULT', result)
    return NextResponse.json({ message: result }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}

export { POST }
