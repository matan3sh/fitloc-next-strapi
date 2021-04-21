import Link from 'next/link';

import styles from 'styles/components/layout/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>FitLoc</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href='/workouts'>
              <a>Workouts</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
