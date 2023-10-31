'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Menu } from '@headlessui/react';

const UserMenu = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2 text-secondary hover:text-white">
        <FontAwesomeIcon icon={faRightToBracket} width={18} height={18}/>
        <a href="/api/auth/login"><span className="hidden md:block">Sign in</span></a>
      </div>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center px-4 py-2 space-x-2 items-center text-secondary hover:text-white">
        <FontAwesomeIcon icon={faUser} width={18} height={18}/>
        <span className="hidden md:block">{user.name}</span>
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
                <a href="/admin" className="flex items-center w-full">Admin Panel</a>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-primary text-white' : 'text-gray-900'
                } group flex w-full items-center px-2 py-2 text-sm`}
              >
                <a href="/api/auth/logout" className="flex items-center w-full">Log out</a>
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default UserMenu;
