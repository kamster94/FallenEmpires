'use client';

import React from 'react';
import {
  faBook,
  faCog,
  faFlag,
  faGlobe,
  faNewspaper,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import NavigationCategoryDisclosure from '@/components/Navigation/NavigationCategoryDisclosure';
import { NavigationIemProps } from '@/components/Navigation/NavigationItem';

const defaultSettingLinks: NavigationIemProps[] = [
  {
    label: 'Custom Setting Pages',
    route: '/admin/setting/custom',
  },
  {
    label: 'Cultures',
    route: '/admin/setting/cultures',
  },
  {
    label: 'Backgrounds',
    route: '/admin/setting/ancestries',
  },
  {
    label: 'Languages',
    route: '/admin/setting/languages',
  },
  {
    label: 'Locations',
    route: '/admin/setting/locations',
  },
];

const defaultRulesLinks: NavigationIemProps[] = [
  {
    label: 'Custom Rules Pages',
    route: '/admin/rules/custom',
  },
  {
    label: 'Ancestries',
    route: '/admin/rules/ancestries',
  },
  {
    label: 'Heritages',
    route: '/admin/rules/heritages',
  },
  {
    label: 'Feats',
    route: '/admin/rules/feats',
  },
];

const AdminNavigation = () => {
  return (
    <div className='mx-auto w-full max-w-md'>
      <NavigationCategoryDisclosure
        navigationCategory={{
          label: 'General Settings',
          icon: faCog,
          route: '/admin/general',
        }}
      />
      <NavigationCategoryDisclosure
        navigationCategory={{
          label: 'Setting',
          icon: faGlobe,
          navigationItems: defaultSettingLinks,
        }}
      />
      <NavigationCategoryDisclosure
        navigationCategory={{
          label: 'Rules',
          icon: faBook,
          navigationItems: defaultRulesLinks,
        }}
      />
      <NavigationCategoryDisclosure
        navigationCategory={{
          label: 'Campaigns',
          icon: faFlag,
          route: '/admin/campaigns',
        }}
      />
      <NavigationCategoryDisclosure
        navigationCategory={{
          label: 'Tags',
          icon: faTags,
          route: '/admin/tags',
        }}
      />
      <NavigationCategoryDisclosure
        navigationCategory={{
          label: 'Blog',
          icon: faNewspaper,
          route: '/admin/blog',
        }}
      />
    </div>
  );
};

export default AdminNavigation;
