import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ProductListItem from './ProductListItem'

it("renders without crashing", () => {
    const div = document.createElement("div");
    const product = {
        id: 1,
        product_name: 'Product one',
        product_type: 'Oil',
        product_image: '',
        price: '2.95',
        product_description: 'Product one description'
    }
	ReactDOM.render(<BrowserRouter><ProductListItem product={product}/></BrowserRouter>, div);
	ReactDOM.unmountComponentAtNode(div);
});
