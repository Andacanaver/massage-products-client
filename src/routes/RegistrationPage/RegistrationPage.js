import React, { Component } from "react";
import { Section } from "../../Utils/Utils";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
export default class RegistrationPage extends Component {
	static defaultProps = {
		history: {
			push: () => {}
		}
	};

	handleRegistrationSuccess = user => {
		const { history } = this.props;
		history.push("/login");
	};

	render() {
		return (
			<ErrorBoundary>
				<Section className="RegistrationPage">
					<h2>Register</h2>
					<RegistrationForm
						onRegistrationSuccess={this.handleRegistrationSuccess}
					/>
				</Section>
			</ErrorBoundary>
		);
	}
}
