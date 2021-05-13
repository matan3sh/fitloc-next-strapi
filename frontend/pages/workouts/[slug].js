import Link from 'next/link';
import Image from 'next/image';

import { Layout } from 'components/layout';

import { ToastContainer, toast } from 'react-toastify';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import { API_URL } from 'config';
import styles from 'styles/pages/workouts/Workout.module.css';
import { useRouter } from 'next/router';

const WorkoutPage = ({ workout }) => {
  const router = useRouter();

  const deleteWorkout = async () => {
    if (confirm('Are You Sure?')) {
      const res = await fetch(`${API_URL}/workouts/${workout.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) toast.error(data.message);
      else router.push(`/workouts`);
    }
  };

  return (
    <Layout>
      <div className={styles.workout}>
        <div className={styles.controls}>
          <Link href={`/workouts/edit/${workout.id}`}>
            <a>
              <FaPencilAlt /> Edit Workout
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteWorkout}>
            <FaTimes /> Delete Workout
          </a>
        </div>

        <span>
          {new Date(workout.date).toLocaleDateString('es-US')} at {workout.time}
        </span>
        <h1>{workout.name}</h1>
        <ToastContainer />

        {workout.image && (
          <div className={styles.image}>
            <Image
              src={workout.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Level:</h3>
        <p>{workout.minimumSkill}</p>
        <h3>Description:</h3>
        <p dangerouslySetInnerHTML={{ __html: workout.description }} />
        <h3>Duration & Price:</h3>
        <p>
          {workout.duration}min at ${workout.price}
        </p>

        <Link href='/workouts'>
          <a className={styles.back}>{'<'} Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/workouts?slug=${slug}`);
  const workout = await res.json();

  return {
    props: {
      workout: workout[0],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/workouts`);
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
