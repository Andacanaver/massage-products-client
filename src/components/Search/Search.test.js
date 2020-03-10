import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Search from './Search'

it("renders without crashing", () => {
    const div = document.createElement("div");
    const type = 'Oil'
    const types = ['Oil', 'Cream', 'Device', 'Spray']
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
	ReactDOM.render(<BrowserRouter><Search type={type} types={types} saveSearchResults={product}/></BrowserRouter>, div);
	ReactDOM.unmountComponentAtNode(div);
});
