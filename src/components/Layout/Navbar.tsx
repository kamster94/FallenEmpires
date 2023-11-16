'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Disclosure } from '@headlessui/react';
import UserMenu from '@/components/Layout/UserMenu';

interface Props {
  mainNavigation?: ReactNode;
  mobileNavigation?: ReactNode;
}

const Navbar = ({ mainNavigation, mobileNavigation }: Props) => {
  return (
    <Disclosure
      as='header'
      className='flex flex-col items-center justify-start bg-primary px-6 py-1 text-white md:h-16 lg:px-8'
    >
      {({ open }) => (
        <>
          <div className='flex h-16 w-full items-center justify-start'>
            <Disclosure.Button className='flex items-center justify-center md:hidden'>
              <FontAwesomeIcon
                icon={open ? faXmark : faBars}
                width={15}
                height={15}
                className='block md:hidden'
              />
            </Disclosure.Button>
            <div className='flex w-full items-center justify-center md:w-auto md:justify-start'>
              <Link href='/' className='flex items-center space-x-2 text-xl'>
                <Image
                  src='/logo.svg'
                  alt='Site Logo'
                  height={38}
                  width={38}
                  style={{ filter: 'invert(100%)' }}
                />
                <span>Age of Fallen Empires</span>
              </Link>
            </div>
            {mainNavigation}
            <div className='flex flex-auto items-center justify-end'>
              <UserMenu />
            </div>
          </div>
          <Disclosure.Panel className='mb-4 flex md:hidden'>
            {mobileNavigation}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
