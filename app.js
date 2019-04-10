var express = require('express');
var Playlist = require('./models/playlist')
var User = require('./models/user')
var path = require('path');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var accountRoutes = require('./routes/account.js')
var playlistRoutes = require('./routes/play.js')
var SpotifyWebApi = require('spotify-web-api-node');
// var spotifyApi = new SpotifyWebApi({
//   clientId: '5df11c3fc900425d91bae6a374af1687',
//   clientSecret: '75462bb134ee4c13b4a7f8a5d08ac2a9'
//   //not quite sure what this does
//   //redirectUri: 'http://localhost:3000/callback'
// });
// var isAuthenticated = require('./middlewares/isAuthenticated.js');
// var Question = require('./models/question.js');
// var accountRouter = require('./routes/account.js');
// var apiRouter = require('./routes/api.js');
var app = express();
// set the express view engine to take care of ejs within html files
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/final-project')

app.use(bodyParser.urlencoded({
  extended: false
}))

var spotifyApi = new SpotifyWebApi({
  clientId: '5df11c3fc900425d91bae6a374af1687',
  clientSecret: '75462bb134ee4c13b4a7f8a5d08ac2a9'
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log(
      'Something went wrong when retrieving an access token',
      err.message
    );
  }
);

app.use(cookieSession({
  name: 'local-session',
  keys: ['spooky'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}))

// spotifyApi.refreshAccessToken().then(
//   function(data) {
//     console.log('The access token has been refreshed!');

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   },
//   function(err) {
//     console.log('Could not refresh access token', err);
//   }
// );

app.get('/', function(req, res, next) {
  // TODO: render out an index.html page with questions (queried from db)
  //       also pass to ejs template a user object so we can conditionally
  //       render the submit box
  var playlistDb = Playlist.find({}, function(err, results) {
    if (!err) {
      res.render('index', { playlists: results, user: req.session.user })
    } else {
      //res.send(err.message)
      next(err)
    }
  });

  // Do search using the access token
spotifyApi.searchTracks('artist:John').then(
  function(data) {
    console.log('I got ' + data.body.tracks.total + ' results!');

    // Go through the first page of results
    var firstPage = data.body.tracks.items;
    console.log(
      'The tracks in the first page are.. (popularity in parentheses)'
    );

    firstPage.forEach(function(track, index) {
      console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
    });
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
)
  
});

// spotifyApi
//   .authorizationCodeGrant(authorizationCode)
//   .then(function(data) {
//     console.log('Retrieved access token', data.body['access_token']);

//     // Set the access token
//     spotifyApi.setAccessToken(data.body['access_token']);

//     // Use the access token to retrieve information about the user connected to it
//     return spotifyApi.searchTracks('Love');
//   })
//   .then(function(data) {
//     // Print some information about the results
//     console.log('I got ' + data.body.tracks.total + ' results!');

//     // Go through the first page of results
//     var firstPage = data.body.tracks.items;
//     console.log(
//       'The tracks in the first page are.. (popularity in parentheses)'
//     );

//     /*
//      * 0: All of Me (97)
//      * 1: My Love (91)
//      * 2: I Love This Life (78)
//      * ...
//      */
//     firstPage.forEach(function(track, index) {
//       console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
//     });
//   })
//   .catch(function(err) {
//     console.log('Something went wrong:', err.message);
//   });

// // Do search using the access token
// spotifyApi.searchTracks('artist:Love').then(
//   function(data) {
//     console.log(data.body);
//   },
//   function(err) {
//     console.log('Something went wrong!', err);
//   }
// );

// app.engine('html', require('ejs').__express);
// app.set('view engine', 'html');

// // Retrieve an access token.
// spotifyApi.clientCredentialsGrant().then(
//   function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   },
//   function(err) {
//     console.log('Something went wrong when retrieving an access token', err);
//   }
// );

// spotifyApi.searchTracks('artist:Love').then(
//   function(data) {
//     console.log(data.body);
//   },
//   function(err) {
//     console.log('Something went wrong!', err);
//   }
// );

// spotifyApi.searchTracks(('artist:Love'), function(data, err){
// 	if (!err) {
//       console.log(data)
//     } else {
//       //res.send('something went wrong: ' + err.message)
//       console.log('something went wrong' + err.message)
//     }

// });


app.use('/account', accountRoutes)
app.use('/play', playlistRoutes)

app.listen(process.env.PORT || 8800, function() {
	console.log('App listening on port ' + (process.env.PORT || 8800))
})





