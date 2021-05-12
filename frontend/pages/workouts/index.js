import { Layout } from 'components/layout';
import { WorkoutItem } from 'components/home';
import { Pagination } from 'components/shared';

import { API_URL, PER_PAGE } from 'config';

const WorkoutsPage = ({ workouts, page, total }) => {
  return (
    <Layout>
      <h1>Workouts</h1>
      {workouts.length === 0 && <h3>No Workouts to Show</h3>}

      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
};

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calc start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/workouts/count`);
  const total = await totalRes.json();

  // Fetch workouts
  const workoutsRes = await fetch(
    `${API_URL}/workouts?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const workouts = await workoutsRes.json();

  return {
    props: { workouts, page: +page, total },
  };
}

export default WorkoutsPage;
