import Link from 'next/link';

import Search from './Search';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import styles from 'styles/components/layout/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>FitLoc</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/workouts'>
              <a>Workouts</a>
            </Link>
          </li>

          <li>
            <Link href='/workouts/add'>
              <a>Add Workout</a>
            </Link>
          </li>

          <li>
            <Link href='/account/login'>
              <a className='btn-secondary btn-icon'>
                <FaSignInAlt /> Login
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
