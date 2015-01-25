var express = require('express'),
    router = express.Router(),

    fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {

    fs.readFile('public/frontend/desktop.bundles/index/index.html', function(err, data) {
        res.send(data.toString('utf-8'));
    });

});

module.exports = router;
