var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) return res.sendStatus(200);

    res.sendStatus(404);
});

module.exports = router;
