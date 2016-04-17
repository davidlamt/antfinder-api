var express = require('express');
var router = express.Router();

import userUtils from '../utilities/users_service.js';

import { userAuth, adminAuth } from '../auth/auth';

router.post('/', (req, res) => {
    res.send(req.body);
});

router.get('/', adminAuth, (req, res) => {
  userUtils.getUsers().then((users) => {
      res.json(users);
  }, () => {
      res.send(404);
  });
});

router.get('/:id', adminAuth, (req, res) => {
    const userID = req.params.id;

    userUtils.getUser(userID).then((user) => {
        res.json(user);
    }, () => {
        res.send(404);
    });
});

module.exports = router;
