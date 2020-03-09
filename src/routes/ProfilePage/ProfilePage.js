import React, { Component } from 'react'
import { Section } from '../../Utils/Utils'
//import ProfileArea from '../../components/ProfileArea'
import UserService from '../../services/user-api-service'
import ProductListContext from '../../contexts/ProductListContext'
import { Link } from 'react-router-dom'

export default class ProfilePage extends Component {
    static contextType = ProductListContext
    static defaultProps = {
        history: {
            push: () => {}
        },
        
    }
    

    componentDidMount() {
        const userId = this.context.userId
        UserService.getUser(userId)
            .then(this.context.setUser)
    }

    renderProfile() {
        const user = this.context.user
        return (
			<div className="Profile">
				<h3>Full Name: {user.full_name}</h3>
				<p>Email Address: {user.email_address}</p>
                <p>Username: {user.username}</p>
                {/*eventually add an edit profile function*/}
                <Link to={'/wishlists'}>Wishlists</Link>
			</div>
		);
    }

    render() {
        
        return (
            <Section className='ProfilePage'>
                {this.renderProfile()}

            </Section>
        )
    }
}

