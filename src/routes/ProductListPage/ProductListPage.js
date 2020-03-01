import React, { Component } from 'react'
import ProductListContext from '../../contexts/ProductListContext'
import ProductApiService from '../../services/product-api-service'
import { Section } from '../../Utils/Utils'
import ProductListItem from '../../components/ProductListItem/ProductListItem'
import Search from '../../components/Search/Search'

export default class ProductListPage extends Component {
    static contextType = ProductListContext
    state = {
        searchResults: [],
        types: [],
        type: ''
    }
    setType = type => {
        this.setState({
            type: type
        })
        
    }
    setSearchResults = results => {
    this.setState({
        searchResults: results
        })
    }
    componentDidMount() {
        this.context.clearError();
        ProductApiService.getType()
			.then(data => this.setState({ types: data }))
			.catch(this.context.setError);
		ProductApiService.getProducts()
			.then(this.context.setProductList)
			.catch(this.context.setError);
    }

    filterProducts = () => {
        const { productList = [] } = this.context.productList
        return (
            productList.filter(product => product.product_type === this.state.type)
        )
    }

    renderProductsSearch() {
        
        const searchResults = this.state.searchResults
        if(searchResults.length === 0) {
            return (
                <div>There were no results</div>
            )
        } else {
            return searchResults.map(product => (
				<ProductListItem key={product.id} product={product} />
			));
        }
    }
    
    renderProducts() {
        const productList = this.state.searchResults.length > 0
            ? this.state.searchResults
            : this.context.productList || [];
        return productList.map(product =>
            <ProductListItem
                key={product.id}
                product={product}
            />    
        )
    }

    

    render() {
        const { error } = this.context
        return(
            <Section list className='ProductListPage'>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : <div><Search type={this.state.type} setType={this.setType} types={this.state.types} saveSearchResults={this.setSearchResults}/> {this.renderProducts()}</div>
                }
            </Section>
        )
    }
}