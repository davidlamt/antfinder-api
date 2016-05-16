var express = require('express');
var router = express.Router();

import listingUtils from '../utilities/listings_service';

import { userAuth, adminAuth } from '../utilities/auth';

router.post('/', (req, res) => {
    res.json(req.body);
});

module.exports = router;
