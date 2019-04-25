import React, {
    Component,
    createRef
} from 'react';
import PropTypes from 'prop-types';
import Firebase from '../../Firebase'

const db = Firebase.database();
const playlistTable = db.ref('/playlists')

class Form extends Component {
    constructor(props) {
        super(props);

        this.title = createRef();
        this.isCollaborative = createRef();
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSuccess() {
        this.props.onSuccess && this.props.onSuccess();
    }

    handleErrors(reason) {
        this.props.onError && this.props.onError(reason);
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            title,
            isCollaborative,
            props: { owner_id }
        } = this;
        const newPlaylist = playlistTable.push()
        newPlaylist.set({
            title: title.current.value,
            isCollaborative: isCollaborative.current.value,
            owner_id: Firebase.auth.currentUser.uid,
            comments: [],
            created_at: new Date(),
            followers: [],
            track_list: []
        })
        // Firebase.auth.userSession(
        //     action,
        //     email.current.value,
        //     password.current.value
        // ).then(this.handleSuccess).catch(this.handleErrors);

    }

    // resetForm() {
    //     if (!this.email.current || !this.password.current) { return }
    //     const { email, password } = Form.defaultProps;
    //     this.email.current.value = email;
    //     this.password.current.value = password;
    // }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>{this.props.title}</h1>
                <input
                    name="title"
                    type="text"
                    ref={this.title}
                />
                <br />
                <p> Do you want your playlist to be collaborative? </p>
                <input
                    name="Yes"
                    type="radio"
                    value={true}
                    ref={this.isCollaborative}
                />
                <input
                    name="No"
                    type="radio"
                    value={false}
                    ref={this.isCollaborative}
                    checked
                />
                <br />
                <button type="submit">Submit</button>
            </form>

        )
    }
}

// Form.propTypes = {
//     title: PropTypes.string.isRequired,
//     action: PropTypes.string.isRequired,
//     onSuccess: PropTypes.func,
//     onError: PropTypes.func
// }

// Form.defaultProps = {
//     errors: '',
//     email: '',
//     password: ''
// }

export default Form;