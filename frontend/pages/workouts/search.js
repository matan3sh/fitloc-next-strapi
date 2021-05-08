import { useRouter } from 'next/router';
import Link from 'next/link';

import { Layout } from 'components/layout';
import { WorkoutItem } from 'components/home';

import { API_URL } from 'config';
import qs from 'qs';

const SearchPage = ({ workouts }) => {
  const router = useRouter();
  return (
    <Layout title='Search Results'>
      <Link href='/workouts'>
        <a>Go Back</a>
      </Link>
      <h1>Search Results for {router.query.term}</h1>
      {workouts.length === 0 && <h3>No Workouts to Show</h3>}

      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </Layout>
  );
};

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [{ name_contains: term }, { description_contains: term }],
    },
  });

  const res = await fetch(`${API_URL}/workouts?${query}`);
  const workouts = await res.json();
  return {
    props: { workouts },
  };
}

export default SearchPage;
