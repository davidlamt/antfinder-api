var express = require('express');
var router = express.Router();

import encryptUtils from '../utilities/encrypt';
import userUtils from '../utilities/users_service.js';

router.post('/', (req, res) => {
    const { username, password } = req.body;

    userUtils.getUserByUsername(username).then(user => {
        encryptUtils.comparePassword(password, user[0].password).then(() => {
            req.session.user = user;

            res.sendStatus(200);
        }, () => {
            res.sendStatus(401);
        });
    }, err => {
        res.sendStatus(404);
    });
});

module.exports = router;
