import logo from '@/images/icon/logo.svg';
import clsx from 'clsx';
import Avatar from '../common/Avatar';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/lazyImage';
import { useLocation } from 'react-router-dom';

const tonHomeLink = '/wise-score';
function Header() {
  const { pathname } = useLocation();

  return (
    <header
      className={clsx(
        'top-0 z-20  text-white',
        'transition duration-300 ease-in-out',
        'absolute inset-x-0'
      )}
    >
      <div className="px-4 py-1.5 lg:px-20">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center">
            {pathname === tonHomeLink ? (
              <LazyImage src={logo} alt="logo" className="h-6 object-contain" />
            ) : (
              <Link to={tonHomeLink}>
                <LazyImage
                  src={logo}
                  alt="logo"
                  className="h-6 object-contain"
                />
              </Link>
            )}
          </div>

          <Avatar />
        </div>
      </div>
    </header>
  );
}

export default Header;
