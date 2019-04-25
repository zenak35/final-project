import React, { Component } from 'react'
import Firebase from '../../Firebase'

export default class Playlist extends Component {
    state = {
        track_list: [],
        owner: {},
        created_at: '',
        followers: [],
        isCollaborative: false,
        comments: []
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}


