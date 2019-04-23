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

  componentDidMount() {
    axios
      .create({
        baseURL: "https://www.googleapis.com/youtube/v3/",
        params: {
          part: "snippet",
          maxResults: 2,
          type: "video",
          key: "AIzaSyDkeJKEVueGFIxIffzQxRIkDF5Duuou08c"
        }
      })
      .get("/search", {
        params: {
          q: this.state.query
        }
      })
      .then(res => {
        console.log(res);
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
          <h4 className="ui header">{selectedVid.snippet.title}</h4>
        </div>
      </React.Fragment>
    );
  }
}

export default YTVid;
