import React, { Component, PropTypes } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

class YTVid extends Component {
  state = {
    query: this.props.queryString,
    videos: [],
    selectedVid: null
  };

  apiKey = process.env.YTVIDKEY

  componentDidMount() {
    axios
      .create({
        baseURL: "https://www.googleapis.com/youtube/v3/",
        params: {
          part: "snippet",
          maxResults: 2,
          type: "video",
          key: "AIzaSyBKrocsjVKTCTAmoda9jMg4JR2RCq-J8-c"
        }
      })
      .get("/search", {
        params: {
          q: this.state.query
        }
      })
      .then(res => {
        this.setState({
          selectedVid: res.data.items[0]
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { videos, selectedVid } = this.state;
    if (!selectedVid) {
      return <Spinner />;
    }
    const videoSrc = `https://www.youtube.com/embed/${selectedVid.id.videoId}`;
    return (
      <React.Fragment>
        <div className="ui embed">
          <iframe src={videoSrc} allowFullScreen title="Video player" />
        </div>
        <div className="ui segment">
          <h5 className="ui header">{selectedVid.snippet.title}</h5>
        </div>
      </React.Fragment>
    );
  }
}

export default YTVid;
