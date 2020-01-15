const router = require('express').Router();
let User = require('../../models/user.model');

// @route   GET /users
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error' + err))
})

// @route   POST /users
// @desc    Create A New User
// @access  Public
router.post('/add', (req, res) => {
  const newUser = new User(
    { username: req.body.username }
  );

  newUser.save()
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json('Error:' + err))
})

// @route   DELETE /users
// @desc    Delete An Existing User
// @access  Public
router.delete('/delete/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    user.remove()
    .then(() => res.json({success: true}))
    .catch(err => res.status(400).json({success: false}))
  })
  .catch(err => console.log(err));
})

module.exports = router;