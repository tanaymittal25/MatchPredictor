const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    recordno: String,
    team1_name: String,
    team2_name: String,
    team1_logourl: String,
    team2_logourl: String,
    match_date: String,
    match_location: String,
    prediction: String
});

module.exports = mongoose.model('Data', dataSchema);
