const router = require('express').Router();
let Habit = require('../../models/habit.model');

router.route('/').get((req, res) => {
  Habit.find()
  .then(habits => res.json(habits))
  .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/add').post((req, res) => {
  const habit = req.body.habit;
  const type = req.body.type;

  const newHabit = new Habit ({
    habit,
    type,
  });

  newHabit.save()
  .then(() => res.json('Habit added!'))
  .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/:id')
module.exports = router;