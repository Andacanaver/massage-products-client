import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import WishlistForm from './WishlistForm'

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<WishlistForm/>
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
