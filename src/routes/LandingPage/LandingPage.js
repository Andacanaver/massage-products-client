import React from 'react'
import { Section } from '../../Utils/Utils'

export default function LandingPage(props) {
    return (
		<Section className="landing-page">
			<p>
				This app is for Massage Therapy products. It could eventually be
				used in an E-Commerce business though the current app is a
				minimal viable product (MVP) at the moment.
			</p>
			<p>
				You can try the app out by logging in with the username{" "}
				<strong>"demo"</strong> and the password{" "}
				<strong>"TestPassword1!"</strong>. So take a look around the
				app.
			</p>
		</Section>
	);
}