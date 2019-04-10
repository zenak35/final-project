var express = require('express')
var router = express.Router();
//var isAuthenticated = require('../middlewares/isAuthenticated')
var Playlist = require('../models/playlist.js')

router.get('/createplaylist', function (req, res) {
  res.render('createplaylist')
})

router.post('/createplaylist', function (req, res, next) {
  var name = req.body.playlistname;
  var p = new Playlist({  name:name, owner: req.session.user, totalsongs: 0 })
  p.save(function (err, result) { 
    if (err) {
      next(err)
    }
    if (!err) {
      res.redirect('/')
    }
  })
})



// router.get('/logout', isAuthenticated, function (req, res) {
//   req.session.user = '';
//   res.redirect('/')
// })
module.exports = router;