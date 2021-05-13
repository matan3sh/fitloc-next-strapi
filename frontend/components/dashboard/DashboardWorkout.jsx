import Link from 'next/link';

import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from 'styles/components/dashboard/DashboardWorkout.module.css';

const DashboardWorkout = ({ workout, handleDelete }) => {
  return (
    <div className={styles.workout}>
      <h4>
        <Link href={`/workouts/${workout.slug}`}>
          <a>{workout.name}</a>
        </Link>
      </h4>

      <Link href={`/workouts/edit/${workout.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit</span>
        </a>
      </Link>

      <a className={styles.delete} onClick={() => handleDelete(workout.id)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
};

export default DashboardWorkout;
