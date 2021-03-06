import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductListContext from '../../contexts/ProductListContext'
import { Section } from '../../Utils/Utils'
import CircleButton from '../../components/CircleButton/CircleButton'
import { findWishlist } from '../../product-helpers'
import { Link } from 'react-router-dom'
import WishlistService from '../../services/wishlist-api-service'
import ProductWishlistItem from '../../components/ProductWishlistItem/ProductWishlistItem'
import './WishlistPage.css'
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
export default class WishlistPage extends Component {
    static contextType = ProductListContext
    static defaultProps = {
        match: { params: {} }
    }

    componentDidMount() {
        const wishlistId = this.props.match.params
        WishlistService.getWishlistProducts(wishlistId.wishlistId)
            .then(this.context.setWishlistProducts)
    }
    
    renderProduct(products) {
        return products.map(product => (
			<ProductWishlistItem
				key={product.product_id}
                product={product}
			/>
		));        
    }

    renderWishlistProduct(wishlistProducts) {
        const { wishlists = [] } = this.context
        const { wishlistId } = this.props.match.params
        
        const wishlist = findWishlist(wishlists, wishlistId) || { content: '' }
        return (
            <>
                <div className='WishlistPage__title'>
                    <CircleButton tag={Link} to='/wishlists' type='button' className='WishlistPage__back-button'>
                        <FontAwesomeIcon icon='chevron-left'/>
                    </CircleButton>
                    <h2>{wishlist.wishlist_name}</h2>
                    <div className='WishlistPage__items'>
                        {this.renderProduct(wishlistProducts)}
                    </div>
                </div>
            </>
        )
    }
    render() {
        const { error, wishlistProducts = [] } = this.context
        let content
        if(error) {
            content = (error.error === `Product not found`)
                ? <p className='red'>Product not found</p>
                : <p className='red'>There was an error</p>
        } else {
            content =
				wishlistProducts.length > 0
					? this.renderWishlistProduct(wishlistProducts)
					: <p>No Products</p>
        }
        return (
			<ErrorBoundary>
				<Section className="WishlistPage">
                    {content}
                </Section>
			</ErrorBoundary>
		);
    }
}