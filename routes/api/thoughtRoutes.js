const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought
  } = require('../../controllers/thoughtController');

// /api/thoughts -> get all thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId -> get thought by ID
router.route('/:thoughtId').get(getSingleThought);
  
module.exports = router;