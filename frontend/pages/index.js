import Link from 'next/link';

import { Layout } from 'components/layout';
import { WorkoutItem } from 'components/home';

import { API_URL } from 'config';

const HomePage = ({ workouts }) => {
  return (
    <Layout>
      <h1>Popular Workouts</h1>
      {workouts.length === 0 && <h3>No Workouts to Show</h3>}

      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}

      {workouts.length > 0 && (
        <Link href='/workouts'>
          <a className='btn-secondary'>View All Workouts</a>
        </Link>
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/workouts?_sort=date:ASC&_limit=3`);
  const workouts = await res.json();
  return {
    props: { workouts },
    revalidate: 1,
  };
}

export default HomePage;
