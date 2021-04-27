import { Layout } from 'components/layout';

import { API_URL } from 'config';

const WorkoutPage = ({ workout }) => {
  debugger;
  return (
    <Layout>
      <h1>My Workout</h1>
    </Layout>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/workouts/${slug}`);
  const workout = await res.json();

  return {
    props: {
      workout: workout[0],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/workouts`);
  const workouts = await res.json();

  const paths = workouts.map((workout) => ({
    params: { slug: workout.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default WorkoutPage;
