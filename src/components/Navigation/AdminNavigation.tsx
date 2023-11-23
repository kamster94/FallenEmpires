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
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const AdminNavigation = () => {
  const { buildRoute } = useRoute();
  const defaultSettingLinks: NavigationIemProps[] = [
    {
      label: 'Custom Setting Pages',
      route: buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.CustomPages,
        admin: true,
      }),
    },
    {
      label: 'Cultures',
      route: buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Cultures,
        admin: true,
      }),
    },
    {
      label: 'Backgrounds',
      route: buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Backgrounds,
        admin: true,
      }),
    },
    {
      label: 'Languages',
      route: buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Languages,
        admin: true,
      }),
    },
    {
      label: 'Locations',
      route: buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Locations,
        admin: true,
      }),
    },
  ];

  const defaultRulesLinks: NavigationIemProps[] = [
    {
      label: 'Custom Rules Pages',
      route: buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.CustomPages,
        admin: true,
      }),
    },
    {
      label: 'Ancestries',
      route: buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.Ancestries,
        admin: true,
      }),
    },
    {
      label: 'Heritages',
      route: buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.Heritages,
        admin: true,
      }),
    },
    {
      label: 'Feats',
      route: buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.Feats,
        admin: true,
      }),
    },
  ];

  return (
    <div className='mx-auto w-full max-w-md'>
      <NavigationCategoryDisclosure
        navigationCategory={{
          label: 'General Settings',
          icon: faCog,
          route: buildRoute({
            category: RoutePath.GeneralSettings,
            admin: true,
          }),
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
          route: buildRoute({
            category: RoutePath.Campaigns,
            admin: true,
          }),
        }}
      />
      <NavigationCategoryDisclosure
        navigationCategory={{
          label: 'Tags',
          icon: faTags,
          route: buildRoute({
            category: RoutePath.Tags,
            admin: true,
          }),
        }}
      />
      <NavigationCategoryDisclosure
        navigationCategory={{
          label: 'Blog',
          icon: faNewspaper,
          route: buildRoute({
            category: RoutePath.Blog,
            admin: true,
          }),
        }}
      />
    </div>
  );
};

export default AdminNavigation;
