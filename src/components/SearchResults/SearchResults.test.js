import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import SearchResults from './SearchResults'

it("renders without crashing", () => {
    const div = document.createElement("div");
    const product = [
		{
			id: 1,
			product_name: "Product one",
			product_type: "Oil",
			product_image: "",
			price: "2.95",
			product_description: "Product one description"
		},
		{
			id: 2,
			product_name: "Product one",
			product_type: "Cream",
			product_image: "",
			price: "2.95",
			product_description: "Product one description"
		},
		{
			id: 3,
			product_name: "Product one",
			product_type: "Spray",
			product_image: "",
			price: "2.95",
			product_description: "Product one description"
		}
	];
	ReactDOM.render(
		<BrowserRouter>
			<SearchResults results={product}/>
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
