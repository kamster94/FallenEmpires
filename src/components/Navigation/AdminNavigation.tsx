'use client';

import React from 'react';
import {
  faBook, faFlag, faGlobe, faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import NavigationCategoryDisclosure from '@/components/Navigation/NavigationCategoryDisclosure';
import { NavigationIemProps } from '@/components/Navigation/NavigationItem';

const defaultSettingLinks: NavigationIemProps[] = [
  {
    label: 'Custom Setting Pages',
    route: 'admin/setting/custom',
  },
  {
    label: 'Cultures',
    route: 'admin/setting/cultures',
  },
  {
    label: 'Backgrounds',
    route: 'admin/setting/backgrounds',
  },
  {
    label: 'Languages',
    route: 'admin/setting/languages',
  },
  {
    label: 'Locations',
    route: 'admin/setting/locations',
  },
];

const defaultRulesLinks: NavigationIemProps[] = [
  {
    label: 'Custom Rules Pages',
    route: 'admin/rules/custom',
  },
  {
    label: 'Ancestries',
    route: 'admin/rules/ancestries',
  },
  {
    label: 'Heritages',
    route: 'admin/rules/heritages',
  },
  {
    label: 'Feats',
    route: 'admin/rules/feats',
  },
];

const AdminNavigation = () => {
  return (
    <div className="mx-auto w-full max-w-md">
      <NavigationCategoryDisclosure navigationCategory={{ label: 'Setting', icon: faGlobe, navigationItems: defaultSettingLinks }} />
      <NavigationCategoryDisclosure navigationCategory={{ label: 'Rules', icon: faBook, navigationItems: defaultRulesLinks }} />
      <NavigationCategoryDisclosure navigationCategory={{ label: 'Campaigns', icon: faFlag }} />
      <NavigationCategoryDisclosure navigationCategory={{ label: 'Blog', icon: faNewspaper }} />
    </div>
  );
};

export default AdminNavigation;
