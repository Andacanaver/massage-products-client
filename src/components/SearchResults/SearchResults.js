import React, { Component } from "react";
import { Section } from '../../Utils/Utils'
import ProductListItem from '../ProductListItem/ProductListItem'

export default class SearchResults extends Component {
    
    renderProducts() {
        const {results} = this.props
        return results.map(product =>
            <ProductListItem
                key={product.id}
                product={product}
            />    
        )
    }
    render() {
    return (
        <Section className='searchResults'>
            {this.renderProducts()}
        </Section>
    )
}
}