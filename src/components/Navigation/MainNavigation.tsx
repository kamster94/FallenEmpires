'use client';

import React from 'react';
import {
  faBook, faDiceD20, faFlag, faGlobe, faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import NavigationCategoryMenu from '@/components/Navigation/NavigationCategoryMenu';
import { NavigationIemProps } from '@/components/Navigation/NavigationItem';

interface Props {
  className?: string;
}

const defaultSettingLinks: NavigationIemProps[] = [
  {
    label: 'Cultures',
    route: 'setting/cultures',
  },
  {
    label: 'Backgrounds',
    route: 'setting/backgrounds',
  },
  {
    label: 'Languages',
    route: 'setting/languages',
  },
  {
    label: 'Locations',
    route: 'setting/locations',
  },
];

const defaultRulesLinks: NavigationIemProps[] = [
  {
    label: 'Ancestries',
    route: 'rules/ancestries',
  },
  {
    label: 'Heritages',
    route: 'rules/heritages',
  },
  {
    label: 'Feats',
    route: 'rules/feats',
  },
];

const MainNavigation = ({ className }: Props) => {
  return (
    <div className={className} >
      <NavigationCategoryMenu navigationCategory={{ label: 'Setting', icon: faGlobe, navigationItems: defaultSettingLinks }} />
      <NavigationCategoryMenu navigationCategory={{ label: 'Rules', icon: faBook, navigationItems: defaultRulesLinks }} />
      <NavigationCategoryMenu navigationCategory={{ label: 'Campaigns', icon: faFlag }} />
      <NavigationCategoryMenu navigationCategory={{ label: 'Blog', icon: faNewspaper, route: 'blog' }} />
      <NavigationCategoryMenu navigationCategory={{
        label: 'Foundry VTT', icon: faDiceD20, route: 'http://foundry.fallenempires.eu/join', target: '_blank',
      }} />
    </div>
  );
};

export default MainNavigation;