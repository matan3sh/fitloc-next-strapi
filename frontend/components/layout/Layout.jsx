import Head from 'next/head';

import { Header, Footer } from 'components/layout';
import styles from 'styles/components/layout/Layout.module.css';

function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'FitLoc - All workouts in one place',
  description: 'Find all the workout session in your location',
  keywords: 'workout, sport, park, studio, fitness, location, one place',
};

export default Layout;
