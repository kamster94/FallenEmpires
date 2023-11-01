import Page from '@/components/Page';
import Image from 'next/image';

export default function Error() {
  return (
    <Page>
      <Image src="/404.svg" alt="Error 404 image" height={96} width={96} className="box-border h-24 mx-auto" />
      <h1 className="text-8xl m-4">404!</h1>
      <h2 className="text-lg m-4">
        The content you&apos;re looking for is gone, just like Garak!
      </h2>
    </Page>
  );
}
