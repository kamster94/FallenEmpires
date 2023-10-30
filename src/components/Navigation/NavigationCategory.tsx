import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import NavigationItem from '@/components/Navigation/NavigationItem';
import { Menu } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  label: string;
  icon: IconDefinition;
}

const NavigationCategory = ({ label, icon }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center px-4 py-2 space-x-1 items-center text-secondary hover:text-white">
        <FontAwesomeIcon icon={icon} width={18} height={18}/>
        <span>{label}</span>
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 z-10 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-primary text-white' : 'text-gray-900'
                } group flex w-full items-center px-2 py-2 text-sm`}
              >
                <NavigationItem label="Test" route="/" className="w-full"/>
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default NavigationCategory;
