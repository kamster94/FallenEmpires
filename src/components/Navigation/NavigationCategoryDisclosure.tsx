import React from 'react';
import NavigationCategory, { NavigationCategoryProps } from '@/components/Navigation/NavigationCategory';
import { Disclosure } from '@headlessui/react';
import NavigationItem from '@/components/Navigation/NavigationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
  navigationCategory: NavigationCategoryProps;
}

const NavigationCategoryDisclosure = ({ navigationCategory }: Props) => {
  return (
    <Disclosure as="div" className="mb-4">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between px-4 text-left text-gray-600 hover:text-black">
            <NavigationCategory navigationCategory={navigationCategory} />
            {navigationCategory.navigationItems && (
              <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} width={18} height={18} className="visible md:invisible lg:visible"/>
            )}
          </Disclosure.Button>
          {navigationCategory.navigationItems && (
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm space-y-1">
              {navigationCategory.navigationItems.map((navigationItem, index) => (
                <NavigationItem navigationItem={navigationItem} className="w-full text-gray-600 hover:text-black" key={index}/>
              ))}
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};

export default NavigationCategoryDisclosure;
