import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

import { API_URL } from 'config';
import { parseCookies } from 'helpers';

import { Modal, ImageUpload } from 'components/shared';
import { Layout } from 'components/layout';
import { FaImage } from 'react-icons/fa';
import styles from 'styles/pages/workouts/AddWorkOut.module.css';

export default function EditWorkoutPage({ workout, token }) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: workout.name,
    duration: workout.duration,
    price: workout.price,
    minimumSkill: workout.minimumSkill,
    address: workout.address,
    date: workout.date,
    time: workout.time,
    description: workout.description,
  });
  const [imagePreview, setImagePreview] = useState(
    workout.image ? workout.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) toast.error('Please Fill In All Fields');

    const res = await fetch(`${API_URL}/workouts/${workout.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('Unauthorized');
        return;
      }
      toast.error('Something Went Wrong');
    } else {
      const workout = await res.json();
      router.push(`/workouts/${workout.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/workouts/${workout.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout>
      <ToastContainer />
      <Link href='/workouts'>
        <a>Go Back</a>
      </Link>
      <h1>Edit Workout</h1>

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
              value={moment(values.date).format('yyyy-MM-DD')}
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

        <input type='submit' value='Update Workout' className='btn' />
      </form>

      <h2>Workout Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No Image Uploaded</p>
        </div>
      )}

      <div>
        <button onClick={() => setShowModal(true)} className='btn-secondary'>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          workoutId={workout.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/workouts/${id}`);
  const workout = await res.json();

  return {
    props: {
      workout,
      token,
    },
  };
}
