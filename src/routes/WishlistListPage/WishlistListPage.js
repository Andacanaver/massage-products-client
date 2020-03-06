import React, { Component } from 'react'
import {Section } from '../../Utils/Utils'
import WishlistService from '../../services/wishlist-api-service'
import ProductListContext from '../../contexts/ProductListContext'
import { Link } from 'react-router-dom'
import WishlistItem from '../../components/WishlistItem/WishlistItem'
import WishlistForm from '../../components/WishlistForm/WishlistForm'
import TokenService from '../../services/token-service'

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
        return ( 
            <>
                {wishlists.map(wishlist => 
                    <WishlistItem key={wishlist.id} wishlist={wishlist}/>
                )}
                <WishlistForm />
            </>
        )
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
            <Section className='WishlistPage'>
                {content}
            </Section>
        )
    }
}