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
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

interface Props {
  className?: string;
}

async function MainNavigation({ className }: Props) {
  const { buildRoute } = useRoute();

  const databaseSettingLinks: NavigationIemProps[] = (
    await getAllSettingPages()
  ).map((settingPage) => {
    return {
      label: settingPage.title,
      route: buildRoute({
        category: RoutePath.Setting,
        slug: settingPage.slug,
      }),
    };
  });

  const databaseRuleLinks: NavigationIemProps[] = (await getAllRulePages()).map(
    (rulePage) => {
      return {
        label: rulePage.title,
        route: buildRoute({
          category: RoutePath.Rules,
          slug: rulePage.slug,
        }),
      };
    }
  );

  const databaseCampaignLinks: NavigationIemProps[] = (
    await getAllCampaigns()
  ).map((campaign) => {
    return {
      label: campaign.name,
      route: buildRoute({
        category: RoutePath.Campaigns,
        slug: campaign.slug,
      }),
    };
  });

  const defaultSettingLinks: NavigationIemProps[] = [
    {
      label: 'Cultures',
      route: buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Cultures,
      }),
    },
    {
      label: 'Backgrounds',
      route: buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Backgrounds,
      }),
    },
    {
      label: 'Languages',
      route: buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Languages,
      }),
    },
    {
      label: 'Locations',
      route: buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Locations,
      }),
    },
  ];

  const defaultRulesLinks: NavigationIemProps[] = [
    {
      label: 'Ancestries',
      route: buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.Ancestries,
      }),
    },
    {
      label: 'Heritages',
      route: buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.Heritages,
      }),
    },
    {
      label: 'Feats',
      route: buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.Feats,
      }),
    },
  ];

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
          route: buildRoute({
            category: RoutePath.Blog,
          }),
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
