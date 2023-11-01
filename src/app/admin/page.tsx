import Image from 'next/image';

export default function Admin() {
  return (
    <div className="flex w-full justify-center">
      <Image src="/wizard.png" alt="Admin Wizard" width={400} height={400} />
    </div>
  );
}
