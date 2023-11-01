import React from 'react';
import NavigationItem from '@/components/Navigation/NavigationItem';
import { Menu } from '@headlessui/react';
import NavigationCategory, { NavigationCategoryProps } from '@/components/Navigation/NavigationCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
  navigationCategory: NavigationCategoryProps;
}

const NavigationCategoryMenu = ({ navigationCategory }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className="flex w-full justify-between items-center px-4 text-left space-x-1 text-secondary hover:text-white">
            <NavigationCategory navigationCategory={navigationCategory} className="justify-center" />
            {navigationCategory.navigationItems && (
              <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} width={18} height={18} className="block md:none lg:block"/>
            )}
          </Menu.Button>
          {navigationCategory.navigationItems && open && (
            <Menu.Items static className="absolute right-0 mt-2 w-56 z-10 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1">
                {navigationCategory.navigationItems.map((navigationItem, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-primary text-white' : 'text-gray-900'
                        } group flex w-full items-center px-2 py-2 text-sm`}
                      >
                        <NavigationItem navigationItem={navigationItem} className="w-full"/>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  );
};

export default NavigationCategoryMenu;
