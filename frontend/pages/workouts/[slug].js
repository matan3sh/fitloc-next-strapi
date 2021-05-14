import Link from 'next/link';
import Image from 'next/image';

import { Layout } from 'components/layout';
import { WorkoutMap } from 'components/map';

import { API_URL } from 'config';
import styles from 'styles/pages/workouts/Workout.module.css';

const WorkoutPage = ({ workout }) => {
  return (
    <Layout>
      <div className={styles.workout}>
        <span>
          {new Date(workout.date).toLocaleDateString('es-US')} at {workout.time}
        </span>
        <h1>{workout.name}</h1>

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

        <WorkoutMap workout={workout} />

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
