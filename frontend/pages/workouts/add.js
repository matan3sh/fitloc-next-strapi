import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { API_URL } from 'config';

import { Layout } from 'components/layout';
import styles from 'styles/pages/workouts/AddWorkOut.module.css';

export default function AddWorkoutPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    duration: '',
    price: '',
    minimumSkill: '',
    address: '',
    date: '',
    time: '',
    description: '',
    image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout>
      <Link href='/workouts'>
        <a>Go Back</a>
      </Link>
      <h1>Add Workout</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='duration'>Duration</label>
            <input
              type='text'
              name='duration'
              id='duration'
              value={values.duration}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='price'>Price</label>
            <input
              type='text'
              name='price'
              id='price'
              value={values.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Skill Level</label>
            <input
              type='text'
              name='minimumSkill'
              id='minimumSkill'
              value={values.minimumSkill}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Workout Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Add Workout' className='btn' />
      </form>
    </Layout>
  );
}
