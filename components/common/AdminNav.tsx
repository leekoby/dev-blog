import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { IconType } from 'react-icons';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = 'w-60';
const NAV_CLOSE_WIDTH = 'w-12';
const NAV_VISIBILITY = 'nav-visibility';

/** 2023/06/03 - AdminNavbar - by leekoby */
const AdminNav: React.FC<Props> = ({ navItems }): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const toggleNav = (visibility: boolean) => {
    const currentNav = navRef.current;
    if (!currentNav) return;
    const { classList } = currentNav;
    //TODO: 이 방법이 좋은지 tailwind css에 리터럴템플릿으로 옵션주는게 좋을지 고민해보자
    if (visible) {
      // nav 숨기기
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      // nav 보이기
      classList.add(NAV_OPEN_WIDTH);
      classList.remove(NAV_CLOSE_WIDTH);
    }
  };

  //TODO: 상태 로컬스토리지에 저장해서 유지 -> 나중에 zustand로 바꿔보자
  const updateNavState = () => {
    toggleNav(visible);

    const newState = !visible;
    setVisible(newState);
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
  };
  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);
    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
      toggleNav(!newState);
    } else {
      setVisible(true);
    }
  }, []);
  return (
    <nav
      ref={navRef}
      className='flex flex-col justify-between h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark transition-width overflow-hidden sticky top-0'>
      <div>
        {/* logo */}
        <Link href={`/admin`} className={`flex items-center space-x-2 p-3 mb-10`}>
          <Logo className={`fill-highlight-light dark:fill-highlight-dark w-5 h-5`} />
          {visible && (
            <span
              className={`text-highlight-light dark:text-highlight-dark text-xl font-semibold leading-none`}>
              Admin
            </span>
          )}
        </Link>
        {/* nav items */}
        <div className={`space-y-6`}>
          {navItems?.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition`}>
                <item.icon size={24} />
                {visible && <span className='ml-2 leading-none'>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>
      {/* nav toggler (button) */}
      <button
        onClick={updateNavState}
        className={`text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition self-end`}>
        {visible ? <RiMenuFoldFill size={25} /> : <RiMenuUnfoldFill size={25} />}
      </button>
    </nav>
  );
};

export default AdminNav;
