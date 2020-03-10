import React, { Component } from 'react'
import {Section } from '../../Utils/Utils'
import WishlistService from '../../services/wishlist-api-service'
import ProductListContext from '../../contexts/ProductListContext'
import { Link } from 'react-router-dom'
import WishlistItem from '../../components/WishlistItem/WishlistItem'
import WishlistForm from '../../components/WishlistForm/WishlistForm'
import TokenService from '../../services/token-service'
import '../../components/WishlistForm/WishlistForm.css'
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

export default class WishlistPage extends Component {
    static contextType = ProductListContext
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    componentDidMount() {   
        this.context.clearError();     
        WishlistService.getWishlist()
            .then(this.context.setWishlists)
            .catch(this.context.setError)
    }

    renderWishlist() {
        const wishlists = this.context.wishlists
        if (wishlists.length > 0) {
            return (
				<>
					{wishlists.map(wishlist => (
						<WishlistItem key={wishlist.id} wishlist={wishlist} />
					))}
					<WishlistForm />
				</>
			);
        } else {
            return (
                <div>
                    <p>You don't have any wishlists at the moment</p>
                    <br/>
                    <WishlistForm />
                </div>
            )
        }
    }

    renderLogin() {
        return(
            <div>
                <br/>
                <Link to='/login'>Please Login</Link>
            </div>
        )
    }
    

    render() {
        const { error } = this.context
        let content
        if (error) {
            content = (error.error === 'There was an error please try again')
                ? <p className='red'>There was an error, try again</p>
                : <p className='red'>There was an error</p>
        } else {
            content = (TokenService.hasAuthToken()
                ? this.renderWishlist()
                : this.renderLogin()
            )
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