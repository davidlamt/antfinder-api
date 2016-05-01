var express = require('express');
var router = express.Router();

import { userAuth } from '../utilities/auth';

router.get('/', userAuth, (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        return res.sendStatus(200);
    }

    res.sendStatus(404);
});

module.exports = router;
