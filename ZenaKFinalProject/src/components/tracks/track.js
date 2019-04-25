import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Lyrics from './Lyrics';
import "../../App.css"

export default class Track extends Component {
  state = {
    track: this.props.track,
    show: false,
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { track, show } = this.state
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    return (
      <div className="col-md-30">
        <div className="card mb-20 shadow-sm">
          <div className="card-body">
            <h5>{track.artist_name}</h5>
            <p className="card-text">
              <strong>
                <i className="fas fa-play" /> Track
            </strong>
              : {track.track_name}
              <br />
              <strong>
                <i className="fas fa-compact-disc" /> Album
            </strong>
              : {track.album_name}
            </p>
            <button
              className="btn btn-dark btn-block"
              onClick={this.showModal}
            >
              <i className="fas fa-chevron-right" /> View Song Info
                       </button>
            <div className={showHideClassName}>
              <section className="modal-main">
                {show ?
                  <Lyrics track={track} />

                  :
                  <button
                    className="btn btn-dark btn-block"
                    onClick={this.showModal}
                  >
                    <i className="fas fa-chevron-right" /> View Song Info
                       </button>
                }
                {show ?
                  <button
                    className="btn btn-dark btn-block"
                    onClick={this.hideModal}
                  >
                    <i class="fas fa-angle-double-up" /> Close
                  </button>

                  :
                  <p></p>
                }


              </section>
            </div>

          </div>
        </div>
      </div >
    )
  }
}









// const Track = ({ track, show, handleClick }) => {
//   const showHideClassName = show ? 'modal display-block' : 'modal display-none';

//   return (
//     <div className="col-md-6">
//       <div className="card mb-4 shadow-sm">
//         <div className="card-body">
//           <h5>{track.artist_name}</h5>
//           <p className="card-text">
//             <strong>
//               <i className="fas fa-play" /> Track
//             </strong>
//             : {track.track_name}
//             <br />
//             <strong>
//               <i className="fas fa-compact-disc" /> Album
//             </strong>
//             : {track.album_name}
//           </p>
//           <div className={showHideClassName}>
//             <section className="modal-main">
//               {show ?
//                 <Lyrics track={track} />
//                 :
//                 <p></p>
//               }

//               <button
//                 className="btn btn-dark btn-block"
//                 onClick={handleClick}
//               >
//                 <i className="fas fa-angle-double-up" /> Close
//             </button>
//             </section>
//           </div>

//         </div>
//       </div>
//     </div >
//   );
// };

// export default Track;
