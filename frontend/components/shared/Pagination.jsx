import Link from 'next/link';
import { PER_PAGE } from 'config';

const Pagination = ({ page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <>
      {page > 1 && (
        <Link href={`/workouts?page=${page - 1}`}>
          <a className='btn-secondary'>Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/workouts?page=${page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}
    </>
  );
};

export default Pagination;
