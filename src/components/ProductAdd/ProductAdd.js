import React, { Component } from 'react'
import ProductListContext from '../../contexts/ProductListContext'
import WishlistService from '../../services/wishlist-api-service'
import ProductService from '../../services/product-api-service'


export default class ProductAdd extends Component {
    static contextType = ProductListContext

    componentDidMount() {
        this.context.clearError()
        WishlistService.getWishlist()
            .then(this.context.setWishlists)
            .catch(this.context.setError)
        
        ProductService.getProducts()
            .then(this.context.setProductList)
    }

    renderWishlists = () => {
        const {wishlists} = this.context
        return (
            <form onSubmit={this.handleSubmit} className='Wishlist__add-product'>
                <label htmlFor='wishlist-options'>
                    <select id='wishlists'>
                    {wishlists.map(wishlist => (
                <option name={wishlist.wishlist_name} value={wishlist.id}>{wishlist.wishlist_name}</option>
            ))}
                </select>
                </label>
                <button type='submit'>Add</button>
            </form>
        )
    }
    handleSubmit = e => {
        e.preventDefault()
        const productList = this.context;
        WishlistService.postWishlistProduct({
            product_id: productList.wishlists.id
        })
            .then(res => {
                if (!res.ok) {
                    res.json()
                } else {
                    res.json().then(response => {
                        this.context.addProductToWishlist(res)
                    })
                }
            })
    }

    

    render() {
        return (
            <>
                {this.renderWishlists()}
            </>
        )
    }



}