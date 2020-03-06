import React, { Component } from "react";
import ProductListContext from "../../contexts/ProductListContext";
import ProductApiService from "../../services/product-api-service";
import { Section } from "../../Utils/Utils";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import Search from "../../components/Search/Search";

export default class ProductListPage extends Component {
    static contextType = ProductListContext;
    
	componentDidMount() {
		this.context.clearError();
		ProductApiService.getType()
			.then(data => this.context.setTypes(data))
			.catch(this.context.setError);
		ProductApiService.getProducts()
			.then(this.context.setProductList)
			.catch(this.context.setError);
	}

	renderProducts() {
		let productList;
		const searchResults = this.context.searchResults;
		if (searchResults === null) {
			productList = this.context.productList;
			return productList.map(product => (
				<ProductListItem key={product.id} product={product} />
			));
		} else {
			if (searchResults.length > 0) {
				productList = searchResults;
				return productList.map(product => (
					<ProductListItem key={product.id} product={product} />
				));
			} else {
				return (
					<div role="alert">
						<p className="red">No Products found</p>
					</div>
				);
			}
		}
	}

	

	render() {
		const { error } = this.context;
		return (
			<Section list className="ProductListPage">
				{error ? (
					<p className="red">There was an error, try again</p>
				) : (
					<div>
						<Search
							type={this.context.type}
							setType={this.context.setType}
							types={this.context.types}
							saveSearchResults={this.context.setSearchResults}
						/>{" "}
						{this.renderProducts()}
					</div>
				)}
			</Section>
		);
	}
}
