const { Router } = require("express");
const PersonController = require('../controllers/PersonController');

const router = Router();

router.get('/people', PersonController.getActivePeople);

router.get('/people/all', PersonController.getAllPeople);

router.get('/people/:id', PersonController.getPersonById);

router.post('/people', PersonController.addPerson);

router.put('/people/:id', PersonController.updatePerson);

router.delete('/people/:id', PersonController.deletePerson);

router.get('/people/:student_id/enrollments/:enrollment_id', PersonController.getOneByStudentAndEnrollment);

router.post('/people/:student_id/enrollments/', PersonController.createEnrollment);

router.post('/people/:id/restore', PersonController.retorePerson);

router.put('/people/:student_id/enrollments/:enrollment_id', PersonController.updateEnrollment);

router.delete('/people/:student_id/enrollments/:enrollment_id', PersonController.deleteEnrollment);

router.post('/people/:student_id/enrollments/:enrollment_id/restore', PersonController.retoreEnrollment);

module.exports = router;