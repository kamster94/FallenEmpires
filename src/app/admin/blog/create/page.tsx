import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import PostForm from '@/components/Forms/PostForm';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default function AdminCreatePost() {
  const { buildRoute } = useRoute();
  return (
    <Section>
      <SectionHeader>Posts</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({ category: RoutePath.Blog, admin: true })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <PostForm post={{ title: '', text: '', slug: '', author: '' }} />
      </div>
    </Section>
  );
}
