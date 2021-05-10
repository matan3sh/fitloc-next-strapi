import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) toast.error('Please Fill In All Fields');

    const res = await fetch(`${API_URL}/workouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) toast.error('Something Went Wrong');
    else {
      const workout = await res.json();
      router.push(`/workouts/${workout.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout>
      <ToastContainer />
      <Link href='/workouts'>
        <a>Go Back</a>
      </Link>
      <h1>Add Workout</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Workout Name</label>
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
