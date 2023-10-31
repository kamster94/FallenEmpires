import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

function Admin() {
  return (
    <Page>
      <PageHeader title="Admin panel" />
      <div className="w-full md:px-12 space-y-2">
        <p>
          Admin page test
        </p>
      </div>
    </Page>
  );
}

export default withPageAuthRequired(Admin as any);
