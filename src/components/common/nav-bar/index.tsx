import { Fragment } from 'react';

import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from './navigation';

interface Props {}

/** 2023/06/30 - NavBar - by leekoby */
const NavBar: React.FC<Props> = (props): JSX.Element => {
  return (
    <>
      <svg
        className='absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block'
        fill='currentColor'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        aria-hidden='true'>
        <polygon points='50,0 100,0 50,100 0,100' />
      </svg>

      {/* NAVIGATION */}

      <div className='relative px-4 pt-6 sm:px-6 lg:px-8'>
        <nav
          className='relative flex items-center justify-between sm:h-10 lg:justify-start'
          aria-label='Global'>
          <div className='flex flex-shrink-0 flex-grow items-center lg:flex-grow-0'>
            <div className='flex w-full items-center justify-between md:w-auto'>
              <Link legacyBehavior href='/'>
                <>
                  <span className='sr-only'>Koby Blog & Portfolio</span>
                  <Image
                    width={30}
                    height={30}
                    alt='Koby Blog & Portfolio'
                    className='h-8 w-auto sm:h-10 rounded-full'
                    src='https://avatars.githubusercontent.com/u/118284808?v=4'
                  />
                </>
              </Link>
            </div>
          </div>
          <div className='hidden md:ml-10 md:block md:space-x-8 md:pr-4'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='font-medium text-gray-500 hover:text-gray-900'>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
