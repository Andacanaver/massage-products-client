import React, { PropTypes } from 'react'

const ProfileArea = (props) => {
    return (
        <div>
            <h1>Profile for {props.username}</h1>
            <ul>
                <li>Email address: {props.email_address}</li>
            </ul>
        </div>
    )
}

ProfileArea.propTypes = {
    username: PropTypes.string.isRequired,
    email_address: PropTypes.string.isRequired
}

export default ProfileArea