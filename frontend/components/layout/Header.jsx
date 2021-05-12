import { useContext } from 'react';
import Link from 'next/link';

import AuthContext from 'context/AuthContext';

import Search from './Search';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import styles from 'styles/components/layout/Header.module.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

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
          {user ? (
            <>
              <li>
                <Link href='/workouts/add'>
                  <a>Add Workout</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className='btn-secondary btn-icon'
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
