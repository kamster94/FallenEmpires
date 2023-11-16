'use client';

import React from 'react';
import NavigationItem from '@/components/Navigation/NavigationItem';
import { Menu } from '@headlessui/react';
import NavigationCategory, {
  NavigationCategoryProps,
} from '@/components/Navigation/NavigationCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
  navigationCategory: NavigationCategoryProps;
}

const NavigationCategoryMenu = ({ navigationCategory }: Props) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      {({ open }) => (
        <>
          <Menu.Button className='flex w-full items-center justify-between space-x-1 px-4 text-left text-secondary hover:text-white'>
            <NavigationCategory
              navigationCategory={navigationCategory}
              className='justify-center'
            />
            {navigationCategory.navigationItems && (
              <FontAwesomeIcon
                icon={open ? faChevronUp : faChevronDown}
                width={18}
                height={18}
                className='md:none block lg:block'
              />
            )}
          </Menu.Button>
          {navigationCategory.navigationItems && open && (
            <Menu.Items
              static
              className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'
            >
              <div className='px-1 py-1'>
                {navigationCategory.navigationItems.map(
                  (navigationItem, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-primary text-white' : 'text-gray-900'
                          } group flex w-full items-center text-sm`}
                        >
                          <NavigationItem
                            navigationItem={navigationItem}
                            className='h-full w-full p-2'
                          />
                        </button>
                      )}
                    </Menu.Item>
                  )
                )}
              </div>
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  );
};

export default NavigationCategoryMenu;
