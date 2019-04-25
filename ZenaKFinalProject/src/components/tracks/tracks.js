import React from 'react';
import Spinner from '../layout/spinner';
import Track from './track';
import { View } from "react-native";
import { Consumer } from '../../context';


class Tracks extends React.Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { track_list, heading } = this.props;

          if (track_list === undefined || track_list.length === 0) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                  {track_list.map(item => (
                    <Track key={item.track.track_id} track={item.track} />
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
