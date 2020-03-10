import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import WishlistItem from './WishlistItem'

it("renders without crashing", () => {
    const div = document.createElement("div");
    const wishlist = {
        id: 1,
        wishlist_name: 'Wishlist One',
        user_id: 1
    }
	ReactDOM.render(
		<BrowserRouter>
			<WishlistItem wishlist={wishlist}/>
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
