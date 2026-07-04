import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageTransition } from '@/components/layout/PageTransition'
import { getServerSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar user={session.user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={session.user} />
        <main className="flex-1 overflow-y-auto p-6">
          <PageTransition>
            <div className="mx-auto w-full max-w-7xl">
              <Breadcrumbs />
              {children}
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
