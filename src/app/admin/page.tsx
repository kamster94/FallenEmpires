import Image from 'next/image';
import Section from '@/components/Section';

export default function Admin() {
  return (
    <Section className="justify-center">
      <Image src="/wizard.png" alt="Admin Wizard" width={400} height={400} />
    </Section>
  );
}
