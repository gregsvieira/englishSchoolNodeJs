const { Router } = require("express");
const LevelController = require('../controllers/LevelController');

const router = Router();

router.get('/levels', LevelController.getAllLevels);

router.get('/levels/:id', LevelController.getLevelById);

router.post('/levels/', LevelController.addLevel);

router.put('/levels/:id', LevelController.updateLevel);

router.delete('/levels/:id', LevelController.deleteLevel);


module.exports = router;