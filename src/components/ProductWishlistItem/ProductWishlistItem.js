import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Hyph } from "../../Utils/Utils";

export default class ProductListItem extends Component {
	render() {
		const { product } = this.props;
		return (
			<>
				<Link to={`/product/${product.product_id}`} className="ProductListItem">
					<header className="ProductListItem__header">
						<h2 className="ProductListItem__heading">
							{product.product_name}
							<Hyph />
							{product.product_type}
						</h2>
					</header>
				</Link>
				<main>
					<img
						src={product.product_image}
						alt={`Product_${product.product_id}`}
					/>
					<br />
					{product.price}
					<Hyph />
					{product.product_description}
				</main>
				<footer className="ProductListItem__footer"></footer>
			</>
		);
	}
}
