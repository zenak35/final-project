var mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
  name: { type: String },
  owner: {type: Object},
  totalsongs: {type: Number},
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Playlist', playlistSchema);