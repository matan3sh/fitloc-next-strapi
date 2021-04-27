const { workouts } = require('./data.json');

export default (req, res) => {
  const workout = workouts.filter(
    (currentWorkout) => currentWorkout.slug === req.query.slug
  );

  if (req.method === 'GET') res.status(200).json(workout);
  else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
