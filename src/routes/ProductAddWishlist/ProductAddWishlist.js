import React, { Component } from 'react'
import ProductAdd from '../../components/ProductAdd/ProductAdd'
import { Section } from '../../Utils/Utils'

export default class ProductAddWishlist extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    handleProductAdd = product => {
        const { history } = this.props
        history.push('/product/:productId')
    }
    render() {
        return (
            <Section className='Wishlist__add-product'>
                <h2>Add product to wishlist?</h2>
                <ProductAdd onProductAdd={this.handleProductAdd}/>
            </Section>
        )
    }
}