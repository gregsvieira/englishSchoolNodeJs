const { Router } = require("express");

const EnrollmentController = require("../controllers/EnrollmentController");

const router = Router();

router.get('/enrollments', EnrollmentController.getAllEnrollments);

router.get('/enrollments/:id', EnrollmentController.getEnrollmentById);

router.post('/enrollments/', EnrollmentController.addEnrollment);

router.put('/enrollments/:id', EnrollmentController.updateEnrollment);

router.delete('/enrollments/:id', EnrollmentController.deleteEnrollment);


module.exports = router;