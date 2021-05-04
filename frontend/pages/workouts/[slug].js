import Link from 'next/link';
import Image from 'next/image';
import { Layout } from 'components/layout';

import { API_URL } from 'config';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from 'styles/pages/workouts/Workout.module.css';

const WorkoutPage = ({ workout }) => {
  const deleteWorkout = () => console.log('Delete');

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
          {workout.date} at {workout.time}
        </span>
        <h1>{workout.name}</h1>
        {workout.image && (
          <div className={styles.image}>
            <Image src={workout.image} width={960} height={600} />
          </div>
        )}

        <h3>Level:</h3>
        <p>{workout.minimumSkill}</p>
        <h3>Description:</h3>
        <p>{workout.description}</p>
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
