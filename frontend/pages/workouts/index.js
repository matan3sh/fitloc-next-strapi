import { Layout } from 'components/layout';
import { WorkoutItem } from 'components/home';

import { API_URL } from 'config';

const WorkoutsPage = ({ workouts }) => {
  return (
    <Layout>
      <h1>Workouts</h1>
      {workouts.length === 0 && <h3>No Workouts to Show</h3>}

      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/workouts`);
  const workouts = await res.json();
  return {
    props: { workouts },
    revalidate: 1,
  };
}

export default WorkoutsPage;
