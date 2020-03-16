import React, { Component } from 'react'
import ProductApiService from '../../services/product-api-service'
import ProductListContext from '../../contexts/ProductListContext'
import { Section } from '../../Utils/Utils'

export default class ProductAddForm extends Component {
    static contextType = ProductListContext
    state = {
        error: null
    }

    handlSubmit = (e) => {
        e.preventDefault()
        this.setState({error: null})
        const {product_name, product_type, product_description, product_image, price} = e.target
        const newProduct = {
            product_name: product_name.value,
            product_description: product_description.value,
            product_image: product_image.value,
            price: price.value,
            product_type: product_type.value
        }
        ProductApiService.insertProduct(newProduct)
            .then(this.context.addProduct)
            .then(() => {
                product_name.value = ''
                product_description.value = "";
                product_image.value = "";
                price.value = "";
                product_type.value = "";
            })
            .catch(this.context.setError)
    }
    renderTypes() {
        const types = this.props.types
        return (
            <>
            <label htmlFor='product_type'>Product type: </label>
            <select id='product_type'>
                <option value="">Select one...</option>
                {types.map((type, index) => (
                    <option value={type.product_type} key={index}>
                        {type.product_type}
                    </option>
                ))}
            </select>
            </>
        )
    }

    render() {
        const { error } = this.state
        return (
			<Section className="ProductAddForm">
                <h1>Add a Product</h1>
				<form className="ProductAddForm" onSubmit={this.handlSubmit}>
					<div role="alert">
						{error && <p className="red">{error}</p>}
					</div>
					<label htmlFor="product_name">Product name: </label>
					<input
						id="product_name"
						name="product_name"
						type="text"
						required
					/>
					
					{this.renderTypes()}
					<label htmlFor="price">Price: </label>
					<input
						id="price"
						name="price"
						type="text"
						defaultValue="N/A"
					/>
					<label htmlFor="product_description">
						Product Description:
					</label>
					<input
						type="text"
						name="product_description"
						id="product_description"
					/>
					<label htmlFor="product_image">Product Image: (input a link to the image)</label>
					<input
						id="product_image"
						name="product_image"
						type="text"
					/>
					<button type="submit">Submit</button>
				</form>
			</Section>
		);
    }
}