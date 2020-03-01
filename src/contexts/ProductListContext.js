import React, { Component } from 'react'

const ProductListContext = React.createContext({
    productList: [],
    user: {},
    wishlists: [],
    wishlistProducts: [],
    userId: null,
    error: null,
    setError: () => {},
    clearError: () => {},
    setProductList: () => {},
    clearProductList: () => {},
    clearProduct: () => {},
    setWishlists: () => {},
    clearWishlist: () => {},
    setWishlistProducts: () => {},
    clearWishlistProducts: () => {},
    addWishlist: () => {},
    addProductToWishlist: () => {}
})
export default ProductListContext

export class ProductListProvider extends Component {
    state = {
        productList: [],
        user: {},
        error: null,
        wishlists: [],
        userId: null,
        wishlistProducts: []
    };

    setProductList = productList => {
        //todo why does this one need the curly brackets?
        this.setState({ productList })
    }
    clearProductList = productList => {
        this.setState({ productList })
    }
    setWishlists = wishlists => {
        this.setState({ wishlists })
    }
    addWishlist = wishlist => {
        this.setState({ wishlists: [...this.state.wishlists, wishlist] })
    }
    addProductToWishlist = product => {
        this.setState({ productList: [...this.state.productList, product] })
    }
    setWishlistProducts = wishlistProducts => {
        this.setState({ wishlistProducts })
    }
    clearWishlistProducts = wishlistProducts => {
        this.setState({ wishlistProducts })
    }
    clearWishlist = wishlists => {
        this.setState({ wishlists })
    }
    setUser = user => {
        this.setState({ user : user})
    }
    setProduct = product => {
        this.setState(product)
    }
    clearProduct = product => {
        this.setState(product)
    }
    setError = error => {
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    render() {
        const value = {
            productList: this.state.productList,
            user: this.state.user,
            userId: this.state.userId,
            wishlists: this.state.wishlists,
            wishlistProducts: this.state.wishlistProducts,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setProductList: this.setProductList,
            clearProduct: this.clearProduct,
            setProduct: this.setProduct,
            clearProductList: this.clearProductList,
            setUser: this.setUser,
            setWishlists: this.setWishlists,
            clearWishlist: this.clearWishlist,
            setWishlistProducts: this.setWishlistProducts,
            clearWishlistProducts: this.clearWishlistProducts,
            addWishlist: this.addWishlist,
            addProductToWishlist: this.addProductToWishlist

        }

        return(
            <ProductListContext.Provider value={value}>
                {this.props.children}
            </ProductListContext.Provider>
        )
    }
}
