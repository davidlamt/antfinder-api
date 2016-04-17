var express = require('express');
var router = express.Router();

import { userAuth, adminAuth } from '../auth/auth';

router.get('/', adminAuth, (req, res) => {
  res.send('GET /users');
});

router.post('/', (req, res) => {
    res.send('POST /users');
});

module.exports = router;
