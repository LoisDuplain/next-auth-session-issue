import { Session, getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import SignOutButton from './_components/auth/SignOutButton';
import Link from 'next/link';
import { LOGIN_PAGE_URL } from './login/page';
import { authOptions } from './api/auth/[...nextauth]/route';
import { USER_PAGE_URL } from './(protected)/(dashboard)/users/[username]/page';
import TestNextAuthIssue from './_components/test-next-auth-issue';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <TestNextAuthIssue />

        <h1 className='text-gray-900 text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl dark:text-white'>
          Bienvenue {JSON.stringify(session)}
        </h1>

        <div className='mt-8 flex'>
          <Link href={ USER_PAGE_URL.replace('[username]', session.user.username) } className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Mon profil
          </Link>
          <SignOutButton />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className='text-gray-900 text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl dark:text-white'>
        Aries Common Manager
      </h1>

      <div className='mt-8 flex'>
      <Link className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        href={ LOGIN_PAGE_URL }
      >
        Se connecter
      </Link>
      </div>
    </main>
  )
}
