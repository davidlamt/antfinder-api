var express = require('express');
var router = express.Router();

import userUtils from '../utilities/users_service.js';

import { userAuth, adminAuth } from '../auth/auth';

router.post('/', (req, res) => {
    const { first_name, last_name, email, username, password } = req.body;
    const newUser = { first_name, last_name, email, username, password };

    userUtils.createUser(newUser).then((createdUser) => {
        res.json(createdUser);
    }, () => {
        res.send(400); // Bad request
    });
});

router.get('/', adminAuth, (req, res) => {
  userUtils.getUsers().then((users) => {
      res.json(users);
  }, () => {
      res.send(404); // Not found
  });
});

router.get('/:id', adminAuth, (req, res) => {
    const userID = req.params.id;

    userUtils.getUser(userID).then((user) => {
        res.json(user);
    }, () => {
        res.send(404); // Not found
    });
});

module.exports = router;
