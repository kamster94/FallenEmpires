import { RoutePath } from '@/enums';

export default function useRoute() {
  function buildRoute({
    category,
    subcategory,
    slug,
    admin,
  }: {
    category: RoutePath;
    subcategory?: RoutePath;
    slug?: string;
    admin?: boolean;
  }) {
    const root = admin ? '/admin' : '';
    return `${root}/${category}${subcategory ? `/${subcategory}` : ''}${
      slug ? `/${slug}` : ''
    }`;
  }

  return {
    buildRoute,
  };
}
