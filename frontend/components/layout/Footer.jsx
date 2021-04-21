import Link from 'next/link';

import styles from 'styles/components/layout/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; FitLoc 2021</p>
      <p>
        <Link href='/about'>About This Project</Link>
      </p>
    </footer>
  );
};

export default Footer;
