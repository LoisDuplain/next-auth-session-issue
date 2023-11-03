import type { Metadata } from 'next'
import './globals.css'
import { getServerSession } from 'next-auth/next'
import SessionProvider from './_components/session-provider'
import ModalContextProvider from './_components/modal/modal.provider'
import { Toaster } from 'sonner'
import moment from 'moment'
import 'moment/locale/fr';

export const metadata: Metadata = {
  title: 'Aries Common',
  description: 'Manage your Aries Software products',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="fr" className='dark'>
      <body className='bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white'>
        <SessionProvider session={session}>
          <Toaster position='bottom-right' richColors closeButton />
          <ModalContextProvider>
            {children}
          </ModalContextProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
