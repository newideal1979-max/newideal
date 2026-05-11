import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'New Ideal Stitching & Cutting Institute | Since 1975',
  description: 'India\'s most trusted stitching and cutting institute since 1975. Professional tailoring courses for men and women. Online and offline batches available. Learn from expert Tosif Ahmed Mansuri.',
  keywords: 'stitching institute, cutting course, tailoring class, Ahmedabad, Gujarat, mens tailoring, womens tailoring, online stitching course',
  authors: [{ name: 'New Ideal Institute' }],
  openGraph: {
    title: 'New Ideal Stitching & Cutting Institute',
    description: 'Transform Skill Into Profession — Professional Tailoring Education Since 1975',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-bg font-body bg-bg-dark text-white antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1E293B',
                color: '#F8FAFC',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '12px',
              },
              success: { iconTheme: { primary: '#D4AF37', secondary: '#020617' } }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
