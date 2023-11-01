import { ReactNode } from 'react';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Page>
      <PageHeader title="Admin Panel" />
      {children}
    </Page>
  );
}
