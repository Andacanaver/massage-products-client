import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Hyph } from '../../Utils/Utils'
import './ProductListItem.css'


export default class ProductListItem extends Component {
    render() {
        const { product } = this.props
        return (
			<>
				<Link to={`/product/${product.id}`} className="ProductListItem">
					<header className="ProductListItem__header">
						<h2 className="ProductListItem__heading">
							{product.product_name}
							<Hyph />
							{product.product_type}
						</h2>
					</header>
				</Link>
				<main>
					<img src={product.product_image} alt={`Product_${product.id}`} />
                    <br />
					{product.price}
					<Hyph />
					{product.product_description}
				</main>
				
			</>
		);
    }
}