const router = require('express').Router();
const async = require('async');

const Data = require('../model/data');
let recordLen;

router.route('/')
 .get((req, res, next) => {
    Data.find({}, function(err, data) {
    res.render('main/home', {data: data});
    });
})
.post((req, res, next) => {
    res.redirect('/data/' + req.body.index);
});

router.route('/data/:id')
.get((req, res, next) => {
    Data.findOne({ recordno: req.params.id })
    .exec(function(err, data) {
        res.render('main/data', {data: data});
    });
});

router.route('/add_data')
 .get((req, res, next) => {
        res.render('main/add_data');
        Data.find({}, function(err, data) {
            recordLen = data.length;
            console.log(recordLen + " " + "GET");
        });
})
.post((req, res, next) => {
    async.waterfall([
        function(callback) {
            var data = new Data();
            console.log(recordLen + " " + "POST");
            data.recordno = recordLen;
            data.team1_name = req.body.team1;
            data.team2_name = req.body.team2;
            data.team1_logourl = req.body.team1url;
            data.team2_logourl = req.body.team2url;
            data.match_date = req.body.matchdate;
            data.match_location = req.body.matchloc;
            data.prediction = req.body.prediction;
            data.save(function(err) {
                callback(err, data);
            });
            Data.find({}, function(err, data) {
                console.log(data.length + " " + "Last");
            });
            res.redirect('/');
        }
    ]);
});

module.exports = router;
