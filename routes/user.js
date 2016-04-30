var express = require('express');
var router = express.Router();

import { userAuth, adminAuth } from '../utilities/auth';

router.get('/', userAuth, (req, res) => {
    const { first_name: firstName, last_name: lastName, email, username, created_at: createdAt } = req.session.user[0];
    const nonPrivateUserInfo = { firstName, lastName, email, username, createdAt };

    res.json(nonPrivateUserInfo);
});

module.exports = router;
