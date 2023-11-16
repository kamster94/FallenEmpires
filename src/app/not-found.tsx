import Page from '@/components/Page';
import Image from 'next/image';

export default function Error() {
  return (
    <Page>
      <Image
        src='/404.svg'
        alt='Error 404 image'
        height={96}
        width={96}
        className='mx-auto box-border h-24'
      />
      <h1 className='m-4 text-8xl'>404!</h1>
      <h2 className='m-4 text-lg'>
        The content you&apos;re looking for is gone, just like Garak!
      </h2>
    </Page>
  );
}
