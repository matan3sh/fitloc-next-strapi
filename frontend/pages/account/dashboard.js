import { useRouter } from 'next/router';

import { Layout } from 'components/layout';

import { API_URL } from 'config';
import { DashboardWorkout } from 'components/dashboard';
import { parseCookies } from 'helpers';

import styles from 'styles/components/dashboard/Dashboard.module.css';

const DashboardPage = ({ workouts, token }) => {
  const router = useRouter();

  const deleteWorkout = async (id) => {
    if (confirm('Are You Sure?')) {
      const res = await fetch(`${API_URL}/workouts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) toast.error(data.message);
      else router.reload();
    }
  };

  return (
    <Layout>
      <div className={styles.dash}>
        <h2>Dashboard</h2>
        <h3>My Workouts</h3>

        {workouts.map((workout) => (
          <DashboardWorkout
            key={workout.id}
            workout={workout}
            handleDelete={deleteWorkout}
          />
        ))}
      </div>
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
    props: { workouts, token },
  };
}

export default DashboardPage;
