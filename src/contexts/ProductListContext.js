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
	addProductToWishlist: () => {},
	searchTerm: "",
	searchResults: null,
	types: [],
	type: "",
	wishlistId: "",
	wishlist_name: "",
    setSearchResults: () => {},
    clearSearchResults: () => {},
	setTypes: () => {},
	setType: () => {},
	clearWishlistName: () => {},
	setWishlistName: () => {},
    setWishlistId: () => {},
    clearWishlistId: () => {},
    setSearchTerm: () => {},
    clearSearchTerm: () => {},
    product: {}
});
export default ProductListContext

export class ProductListProvider extends Component {
    state = {
        productList: [],
        user: {},
        error: null,
        wishlists: [],
        userId: null,
        wishlistProducts: [],
        searchTerm: '',
        searchResults: null,
        types: [],
        type: '',
        wishlistId: '',
        wishlist_name: '',
        product: {}
    };
    setWishlistId = wishlist => {
        this.setState({
            wishlistId: wishlist
        })
    }
    clearWishlistId = () => {
        this.setState({
            wishlistId: ''
        })
    }
    setWishlistName = wishlistName => {
        this.setState({
            wishlist_name: wishlistName
        })
    }
    
    clearWishlistName = () => {
        this.setState({
            wishlist_name: ''
        })
    }
    setType = type => {
		this.setState({
			type: type
		});
	};
    setTypes = types => {
        this.setState({
            types: types
        })
    }
	setSearchResults = results => {
		this.setState({
			searchResults: results
		});
    };
    clearSearchResults = () => {
        this.setState({
            searchResults: null
        })
    }
    setProductList = productList => {
        //todo why does this one need the curly brackets?
        this.setState({ productList })
    }
    clearProductList = productList => {
        this.setState({ productList })
    }
    setSearchTerm = term => {
        this.setState({
            searchTerm: term
        })
    }
    clearSearchTerm = () => {
        this.setState({
            searchTerm: ''
        })
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
        this.setState({ wishlistProducts });    
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
        this.setState({
            product: product
        })
    }
    clearProduct = product => {
        this.setState({
            product
        })
    }
    setError = error => {
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    render() {
        const value = {
            clearSearchResults: this.clearSearchResults,
            clearSearchTerm: this.clearSearchTerm,
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
			addProductToWishlist: this.addProductToWishlist,
			searchTerm: this.state.searchTerm,
            setSearchTerm: this.setSearchTerm,
            searchResults: this.state.searchResults,
            types: this.state.types,
            type: this.state.type,
            setSearchResults: this.setSearchResults,
            setType: this.setType,
            setTypes: this.setTypes,
            wishlistId: this.state.wishlistId,
            setWishlistId: this.setWishlistId,
            wishlist_name: this.state.wishlist_name,
            setWishlistName: this.setWishlistName,
            clearWishlistName: this.clearWishlistName,
            product: this.state.product,
            clearWishlistId: this.clearWishlistId
		};

        return(
            <ProductListContext.Provider value={value}>
                {this.props.children}
            </ProductListContext.Provider>
        )
    }
}
