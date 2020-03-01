import React, { Component } from "react";
import TokenService from "../../services/token-service";
import { Button, Input } from "../../Utils/Utils";
import AuthApiService from "../../services/auth-api-service";
import './LoginForm.css'

export default class LoginForm extends Component {
	static defaultProps = {
		onLoginSuccess: () => {}
	};

	state = { error: null };

	handleSubmitJwtAuth = ev => {
		ev.preventDefault();
		this.setState({ error: null })
		const { username, password } = ev.target

		AuthApiService.postLogin({
			username: username.value,
			password: password.value
		}).then(res => {
			if (!res.ok) {
				res.json().then(responseJson => 
				this.setState({ error: responseJson.error }));
			} else {
				username.value = "";
				password.value = "";
				res.json().then(responseJson => {
					TokenService.saveAuthToken(responseJson.authToken);
					this.props.onLoginSuccess(responseJson.userId);
				})
			}
		})
	};

	render() {
		const { error } = this.state;
		return (
			<form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
				<div role="alert">
					{error && <p className="red">{error}</p>}
				</div>
				<div className="username">
					<label htmlFor="LoginForm__username">User name</label>
					<Input
						required
						name="username"
						id="LoginForm__username"></Input>
				</div>
				<div className="password">
					<label htmlFor="LoginForm__password">Password</label>
					<Input
						required
						name="password"
						type="password"
						id="LoginForm__password"></Input>
				</div>
				<Button type="submit">Login</Button>
			</form>
		);
	}
}
