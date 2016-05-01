var express = require('express');
var router = express.Router();

import { userAuth, adminAuth } from '../utilities/auth';

router.get('/', userAuth, (req, res) => {
    let user;

    if (req.session.user) {
        if (!req.session.user.length) user = req.session.user;
        else user = req.session.user[0];
    }

    const { first_name: firstName, last_name: lastName, email, username, created_at: createdAt } = user;
    const nonPrivateUserInfo = { firstName, lastName, email, username, createdAt };

    res.json(nonPrivateUserInfo);
});

module.exports = router;
