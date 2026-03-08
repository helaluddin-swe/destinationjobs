const express=require('express')
const router = express.Router();

const { delelteAnalysisResumeById, getAllAnalysisResume, getAnalysisResumeById, postAnalysisResume, resumeAnalysis } =require( '../controllers/gptResumeController.js')

router.post('/analyze-resume', resumeAnalysis);
router.post('/resume', postAnalysisResume);
router.get('/resume', getAllAnalysisResume);
router.get('/resume/:id', getAnalysisResumeById);
router.delete('/resume/:id', delelteAnalysisResumeById);

module.exports=router