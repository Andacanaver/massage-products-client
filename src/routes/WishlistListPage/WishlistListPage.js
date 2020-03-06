import React, { Component } from 'react'
import {Section } from '../../Utils/Utils'
import WishlistService from '../../services/wishlist-api-service'
import ProductListContext from '../../contexts/ProductListContext'
import { Link } from 'react-router-dom'
import WishlistItem from '../../components/WishlistItem/WishlistItem'
import WishlistForm from '../../components/WishlistForm/WishlistForm'

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
    

    render() {
        const { error } = this.context
        return (
            <Section className='WishlistPage'>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : <div>{this.renderWishlist()}</div>
                }
            </Section>
        )
    }
}