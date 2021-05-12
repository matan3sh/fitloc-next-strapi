import { useState } from 'react';

import { API_URL } from 'config';

import styles from 'styles/components/shared/Form.module.css';

const ImageUpload = ({ workoutId, imageUploaded }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'workouts');
    formData.append('refId', workoutId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) imageUploaded();
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Workout Image</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>

        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
};

export default ImageUpload;
