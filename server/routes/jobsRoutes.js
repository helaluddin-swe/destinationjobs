
const express=require("express")

const { getJobs, postJobs, getJobsById, deleteJobsById, putJobsById } = require("../controllers/JobsController")
const router=express.Router()
router.get('/jobs',getJobs)
router.post('/jobs',postJobs)
router.get('/jobs/:id',getJobsById)
router.delete('/jobs/:id',deleteJobsById)
router.put('/jobs/:id',putJobsById)
module.exports=router