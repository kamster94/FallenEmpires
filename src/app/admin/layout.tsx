import { ReactNode } from 'react';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import AdminNavigation from '@/components/Navigation/AdminNavigation';

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Page>
      <PageHeader title="Admin Panel" />
      <div className="flex flex-col md:flex-row container px-4 w-full md:px-12">
        <div className="basis-1/5 md:max-w-[20%] flex flex-col">
          <AdminNavigation />
        </div>
        <div className="basis-4/5 md:max-w-[80%] flex flex-col px-2">{children}</div>
      </div>
    </Page>
  );
}
