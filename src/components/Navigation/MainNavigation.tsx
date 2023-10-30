'use client';

import React from 'react';
import {
  faBook, faDiceD20, faFlag, faGlobe, faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import NavigationCategory from '@/components/Navigation/NavigationCategory';

interface Props {
  className?: string;
}

const MainNavigation = ({ className }: Props) => {
  return (
    <div className={className} >
      <NavigationCategory label="Setting" icon={faGlobe} />
      <NavigationCategory label="Campaigns" icon={faFlag} />
      <NavigationCategory label="Rules" icon={faBook} />
      <NavigationCategory label="Blog" icon={faNewspaper} />
      <NavigationCategory label="Foundry VTT" icon={faDiceD20} />
    </div>
  );
};

export default MainNavigation;
