import { ReactNode } from 'react';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import AdminNavigation from '@/components/Navigation/AdminNavigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Page>
      <PageHeader title='Admin Panel' />
      <div className='container flex w-full flex-col px-4 md:flex-row md:px-12'>
        <div className='flex basis-1/5 flex-col md:max-w-[20%]'>
          <AdminNavigation />
        </div>
        <div className='flex basis-4/5 flex-col px-2 md:max-w-[80%]'>
          {children}
        </div>
      </div>
    </Page>
  );
}
