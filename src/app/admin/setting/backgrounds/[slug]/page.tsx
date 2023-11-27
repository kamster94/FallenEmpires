import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import BackgroundForm from '@/components/Forms/BackgroundForm';
import { getBackground } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminBackgroundsEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();

  const background = await getBackground(params.slug);
  if (!background) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Backgrounds</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Backgrounds,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Editing: {background.title}</SubSectionHeader>
      </SubSection>

      <div>
        <BackgroundForm background={background} />
      </div>
    </Section>
  );
}
