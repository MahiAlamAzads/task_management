const express = require('express');
const authMiddleware = require('../../middlewares/isAuthenticate.middleware');
const router = express.Router();

// models
const tasklist = require('../../model/Project.model');


// this is test route
router.get('/', authMiddleware, function (req, res, next) {
  res.send("working")
});

// router.post('/upload', authMiddleware, uploadHouseController);
// router.delete('/delete/:id', authMiddleware, deleteHouseController);
// router.put('/update/:id', authMiddleware, updateHouseController);







module.exports = router;



