import Link from 'next/link';
import Image from 'next/image';

import styles from 'styles/components/home/WorkoutItem.module.css';

const WorkoutItem = ({ workout }) => {
  return (
    <div className={styles.workout}>
      <div className={styles.img}>
        <Image
          src={
            workout.image
              ? workout.image.formats.thumbnail.url
              : '/images/workout-default.png'
          }
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(workout.date).toLocaleDateString('es-US')} at {workout.time}
        </span>
        <h3>{workout.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/workouts/${workout.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
};

export default WorkoutItem;
