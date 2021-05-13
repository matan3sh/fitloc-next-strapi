import { Layout } from 'components/layout';
import { API_URL } from 'config';

import { parseCookies } from 'helpers';

const DashboardPage = ({ workouts }) => {
  return (
    <Layout>
      <h2>I am Dashboard Page</h2>
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/workouts/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const workouts = await res.json();

  return {
    props: { workouts },
  };
}

export default DashboardPage;
