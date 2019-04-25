import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Track from '../tracks/Track';
import "../../App.css"

class Tracks extends Component {
  state = {
    show_info: false
  }
  showModal = () => {
    this.setState({ show_info: true });
  };

  hideModal = () => {
    this.setState({ show_info: false });
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { track_list, heading } = value;

          if (track_list === undefined || track_list.length === 0) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                  {track_list.map(item => (
                    <div>
                      <Track key={item.track.track_id} track={item.track} />

                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
