import React, { Component } from 'react'
import Firebase from '../../Firebase'
const db = Firebase.database;
const usersTable = db.ref('/users')
const playlistsTable = db.ref('/playlists')
const currentUserId = Firebase.auth.currentUser.uid

export default class MyPlaylists extends Component {
    render() {
        return (
            <div>
                {console.log(playlistsIsEmpty())}
            </div>
        )
    }
}

const playlistsIsEmpty = () => {
    usersTable.orderByChild("auth_id").equalTo(currentUserId).once("child_added", function (data) {
        console.log(data.val().playlists);
    })
}
