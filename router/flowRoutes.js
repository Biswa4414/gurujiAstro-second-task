const express = require('express');
const { connectUser, toggleTopAstrologer, createUser, createAstrologer } = require('../controller/flowController');

const router = express.Router();

router.post('/createUser', createUser);
router.post('/connectUser', connectUser);
router.post('/toggleTopAstrologer', toggleTopAstrologer);
router.post('/createAstrologer', createAstrologer);

module.exports = router;
