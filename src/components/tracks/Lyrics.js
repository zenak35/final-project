import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import YTVid from "./YTVid";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    correct_artist_name: "",
    correct_track_name: ""
  };

  checkStringLink = strInput => {
    strInput = strInput.replace(/[\W_]+/g, "-");
    if (strInput.charAt(strInput.length - 1) === "-") {
      return strInput.substring(0, strInput.length - 1);
    } else {
      return strInput;
    }
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        this.setState({
          track: res.data.message.body.track,
          correct_track_name: res.data.message.body.track.track_name
        });
        var current_track = res.data.message.body.track;
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/artist.get?artist_id=${
            current_track.artist_id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        this.setState({
          correct_artist_name: res.data.message.body.artist.artist_name
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;
    const { correct_artist_name, correct_track_name } = this.state;
    var artist_link = this.checkStringLink(correct_artist_name);
    var track_link = this.checkStringLink(correct_track_name);
    const lyricsLink =
      "https://www.musixmatch.com/lyrics/" + artist_link + "/" + track_link;
    var ytSearchName = (correct_artist_name + " " + correct_track_name)
      .replace(/[^A-Za-z0-9-' ']/gi, "")
      .replace(/\s/g, "+");

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              {console.log(ytSearchName)}
              <p className="card-text">
                {lyrics.lyrics_body.substring(
                  0,
                  lyrics.lyrics_body.indexOf("*")
                )}
              </p>
              <a
                href={lyricsLink}
                className="btn btn-link"
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                See Full Lyrics
              </a>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album Name</strong>: {track.album_name}
            </li>
            <li className="list-group-item">
              <strong>Song Genre</strong>:{" "}
              {track.primary_genres.music_genre_list.length === 0
                ? "NO GENRE AVAILABLE"
                : track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name}
            </li>
            <li className="list-group-item">
              <strong>Release Date</strong>:{" "}
              <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
            </li>
            <li className="list-group-item">
              <strong>Youtube Video</strong>:{" "}
              <YTVid queryString={ytSearchName} />
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
