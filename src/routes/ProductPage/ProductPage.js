import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductListContext from '../../contexts/ProductListContext'
import { Hyph, Section } from '../../Utils/Utils'
import { findProduct } from '../../product-helpers'
import CircleButton from '../../components/CircleButton/CircleButton'
import { Link } from 'react-router-dom'
import './ProductPage.css'
import TokenService from '../../services/token-service'
import WishlistService from '../../services/wishlist-api-service'
import ProductApiService from '../../services/product-api-service'
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

export default class ProductPage extends Component {
    static defaultProps = {
        match: { params: {} },
        history: {
            goBack: () => {}
        }
    }

    static contextType = ProductListContext

    state = {
        stateError: null
    }
    

    componentWillUnmount() {
        this.context.clearProduct()
        this.context.clearWishlistId();
    }

    componentDidMount() {
        
        if(TokenService.hasAuthToken()){
            WishlistService.getWishlist()
				.then(this.context.setWishlists)
				.catch(this.context.setError)
        } 
    }
    handleDelete = e => {
        e.preventDefault()
        const { productId } = this.props.match.params
        ProductApiService.deleteProduct(productId)
            .then(ProductApiService.getProducts().then(this.context.setProductList))
            .then(this.props.history.push('/products'))
    }
    handleSubmit = e => {
        e.preventDefault()
        const { productId } = this.props.match.params
        WishlistService.postWishlistProduct({
            product_id: productId,
            wishlist_id: this.context.wishlistId
        })
            .then(res => {
                if (!res.ok) {
                    
                    res.json().then(response => {
                        this.setState({ stateError: response.error})
                    })
                } else {
                    res.json().then(response => {
                        this.context.addProductToWishlist(res)
                        this.setState({ stateError: 'Product added'})
                    })
                }
            })
    }
    renderDelete = () => {
        const { stateError } = this.state
        return (
			<form onSubmit={this.handleDelete} className="delete_product">
				<div role="alert">
					{stateError && <p className="red">{stateError}</p>}
				</div>
                <button type='submit'>Delete</button>
			</form>
		);
    }
    renderWishlists = () => {
        const { stateError } = this.state;
        const {wishlists} = this.context        
        return (
			<form
				onSubmit={this.handleSubmit}
				className="Wishlist__add-product">
				<div role="alert">
					{stateError && <p className="red">{stateError}</p>}
				</div>
				<label htmlFor="wishlist-options">
                    Add to Wishlist: 
					<select onChange={e => this.context.setWishlistId(e.target.value)} id="wishlists">
						<option name="none" value="">
							None
						</option>
                        {wishlists.map(wishlist => (
							<option
                                key={wishlist.id}
								name={wishlist.wishlist_name}
								value={wishlist.id}
                                >
								{wishlist.wishlist_name}
							</option>
						))}
					</select>
				</label>
				<button type="submit">Add</button>
			</form>
		);
    }
    renderWishlistProduct() {
        //todo see if this is needed
        const {
			productList = []
        } = this.context
        const { productId } = this.props.match.params
        const product = findProduct(productList, productId) || { content: ''}
        return (
			<>
				<div className="ProductPage__title">
					<Link to="/wishlists" id='wishlist-link'>Wishlists</Link>
					<CircleButton
						tag={Link}
						to="/products"
						type="button"
						className="ProductPage__back-button">
						<FontAwesomeIcon icon="chevron-left" />
					</CircleButton>
					<h2>{product.product_name}</h2>
				</div>
				<p>
					<img
						src={product.product_image}
						alt={`Product ${product.product_name}`}
					/>
				</p>
				<p>
					{product.price}
					<Hyph />
					{product.product_description}
				</p>
				<div>{this.renderWishlists()}</div>
                <div>{this.renderDelete()}</div>
			</>
		);
    }
    

    renderProduct() {
        const {
			productList = []
        } = this.context
        const { productId } = this.props.match.params
        const product = findProduct(productList, productId) || { content: ''}        
        return (<>
            <div className='ProductPage__title'>
            <CircleButton tag={Link} to='/products' type='button' className='ProductPage__back-button'>
                <FontAwesomeIcon icon='chevron-left'/>
            </CircleButton>
            <h2>{product.product_name}</h2>
            </div>
            <p><img src={product.product_image} alt={`Product ${product.product_name}`}/></p>
            <p>{product.price}<Hyph />{product.product_description}</p>
            <Link to='/login'>Add to Wishlist</Link>
            <div>{this.renderDelete()}</div>
        </>)
    }

    render() {
        
        const {
            error
		} = this.context;
        let content
        if (error) {
            content = (error.error === `Product doesn't exist`)
                ? <p className='red'>Product not found</p>
                : <p className='red'>There was an error</p>
        } else {
            content = (TokenService.hasAuthToken()
                ? this.renderWishlistProduct()
                : this.renderProduct()
            )
        }
        return (
			<ErrorBoundary>
				<Section className="ProductPage">
                    {content}
                </Section>
			</ErrorBoundary>
		);
    }
}

