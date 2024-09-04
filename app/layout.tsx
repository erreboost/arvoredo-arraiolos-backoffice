'use client'
import type { Metadata } from 'next'
import { Noto_Sans_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import { AuthProvider } from './context/AuthContext'

const noto = Noto_Sans_Display({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Dashboard Arvoredo',
//   description: 'Powered by Boost',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={noto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

// import type { Metadata } from 'next';
// import { Noto_Sans_Display } from 'next/font/google';
// import { ThemeProvider } from '@/components/theme-provider';
// import { Toaster } from 'react-hot-toast';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import './globals.css';

// const noto = Noto_Sans_Display({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Dashboard Arvoredo',
//   description: 'Powered by Boost',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={noto.className}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <ProtectedRoute>{children}</ProtectedRoute>
//           <Toaster />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
