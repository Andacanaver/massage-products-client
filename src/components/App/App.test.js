import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faFrog } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronLeft, faFrog);
it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});