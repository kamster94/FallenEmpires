import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

interface Props {
}

const Header = (props: Props) => {
  return (
    <header className="flex items-center justify-between py-1 bg-primary text-white h-16 px-6 lg:px-8">
      <div className="flex-auto flex items-center justify-center sm:items-stretch sm:justify-start">
        <Link href="/" className="flex items-center text-xl space-x-2">
          <Image src="/logo.svg" alt="Site Logo" height={38} width={38} style={{ filter: 'invert(100%)' }} />
          <span>Age of Fallen Empires</span>
        </Link>
      </div>
      <div className="flex-auto flex items-center justify-end">
        <Link href="/" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faRightToBracket} width={18} height={18}/>
          <span>Sign in</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
