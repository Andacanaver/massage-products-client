import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Hyph } from "../../Utils/Utils";
import TokenService from "../../services/token-service";
import "./Header.css";
import UserService from '../../services/user-api-service'

export default class Header extends Component {
	
	handleLogoutClick = () => {
		TokenService.clearAuthToken();
		this.props.logout();
	};

	handleProfileClick = () => {
		const userId = this.props.userId
		UserService.getUser(userId)
	} 

	renderLogoutLink() {
		return (
			<div className="Header__logged-in">
				<Link onClick={this.handleLogoutClick} to="/">
					Logout
				</Link>
				<Hyph />
				<Link to={`/profile`}>Profile</Link>
				<Hyph />
				<Link to="/products">Products</Link>
			</div>
		);
	}

	renderLoginLink() {
		return (
			<div className="Header__not-logged-in">
				<Link to="/register">Register</Link>
				<Hyph />
				<Link to="/login">Log in</Link>
				<Hyph />
				<Link to="/products">Products</Link>
			</div>
		);
	}

	render() {
		return (
			<nav className="Header">
				<h1>
					<Link to="/">
						<FontAwesomeIcon className="green" icon="frog" />{" "}
						Massage Therapy Products
					</Link>
				</h1>
				{TokenService.hasAuthToken()
					? this.renderLogoutLink()
					: this.renderLoginLink()}
			</nav>
		);
	}
}
