import React from 'react';
import {
  faBook,
  faDiceD20,
  faFlag,
  faGlobe,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import NavigationCategoryMenu from '@/components/Navigation/NavigationCategoryMenu';
import { NavigationIemProps } from '@/components/Navigation/NavigationItem';
import {
  getAllCampaigns,
  getAllRulePages,
  getAllSettingPages,
} from '@/app/actions';

interface Props {
  className?: string;
}

const defaultSettingLinks: NavigationIemProps[] = [
  {
    label: 'Cultures',
    route: '/setting/cultures',
  },
  {
    label: 'Backgrounds',
    route: '/setting/backgrounds',
  },
  {
    label: 'Languages',
    route: '/setting/languages',
  },
  {
    label: 'Locations',
    route: '/setting/locations',
  },
];

const defaultRulesLinks: NavigationIemProps[] = [
  {
    label: 'Ancestries',
    route: '/rules/ancestries',
  },
  {
    label: 'Heritages',
    route: '/rules/heritages',
  },
  {
    label: 'Feats',
    route: '/rules/feats',
  },
];

async function MainNavigation({ className }: Props) {
  const databaseSettingLinks: NavigationIemProps[] = (
    await getAllSettingPages()
  ).map((settingPage) => {
    return {
      label: settingPage.title,
      route: `/setting/${settingPage.slug}`,
    };
  });

  const databaseRuleLinks: NavigationIemProps[] = (await getAllRulePages()).map(
    (rulePage) => {
      return {
        label: rulePage.title,
        route: `/rules/${rulePage.slug}`,
      };
    }
  );

  const databaseCampaignLinks: NavigationIemProps[] = (
    await getAllCampaigns()
  ).map((campaign) => {
    return {
      label: campaign.name,
      route: `/campaign/${campaign.slug}`,
    };
  });

  return (
    <div className={className}>
      <NavigationCategoryMenu
        navigationCategory={{
          label: 'Setting',
          icon: faGlobe,
          navigationItems: [...databaseSettingLinks, ...defaultSettingLinks],
        }}
      />
      <NavigationCategoryMenu
        navigationCategory={{
          label: 'Rules',
          icon: faBook,
          navigationItems: [...databaseRuleLinks, ...defaultRulesLinks],
        }}
      />
      <NavigationCategoryMenu
        navigationCategory={{
          label: 'Campaigns',
          icon: faFlag,
          navigationItems: databaseCampaignLinks,
        }}
      />
      <NavigationCategoryMenu
        navigationCategory={{
          label: 'Blog',
          icon: faNewspaper,
          route: '/blog',
        }}
      />
      <NavigationCategoryMenu
        navigationCategory={{
          label: 'Foundry VTT',
          icon: faDiceD20,
          route: 'http://foundry.fallenempires.eu/join',
          target: '_blank',
        }}
      />
    </div>
  );
}

export default MainNavigation;
