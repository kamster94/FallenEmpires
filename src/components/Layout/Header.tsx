'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightToBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import MainNavigation from '@/components/Navigation/MainNavigation';
import { Disclosure } from '@headlessui/react';

const Header = () => {
  return (
    <Disclosure as="header" className="flex flex-col items-center justify-start py-1 bg-primary text-white md:h-16 px-6 lg:px-8">
      {({ open }) => (
        <>
          <div className="flex items-center justify-start w-full h-16">
            <Disclosure.Button className="flex items-center justify-center">
              <FontAwesomeIcon icon={open ? faXmark : faBars} width={15} height={15} className="block md:hidden" />
            </Disclosure.Button>
            <div className="flex items-center justify-center w-full md:w-auto md:justify-start">
              <Link href="/" className="flex items-center text-xl space-x-2">
                <Image src="/logo.svg" alt="Site Logo" height={38} width={38} style={{ filter: 'invert(100%)' }} />
                <span>Age of Fallen Empires</span>
              </Link>
            </div>
            <MainNavigation className="hidden md:flex items-center justify-start"/>
            <div className="flex-auto flex items-center justify-end">
              <Link href="/" className="flex items-center space-x-2 text-secondary hover:text-white">
                <FontAwesomeIcon icon={faRightToBracket} width={18} height={18}/>
                <span className="hidden md:block">Sign in</span>
              </Link>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden flex">
            <MainNavigation className="flex flex-col"/>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
