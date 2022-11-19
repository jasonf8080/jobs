const express = require('express');
const router = express.Router();

//Controllers (Jobs)
const {getAllJobs, getJob, createJob, updateJob, deleteJob} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;