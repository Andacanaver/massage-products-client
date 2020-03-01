import React, { Component } from 'react'
import ProductListContext from '../../contexts/ProductListContext'
import { Link } from 'react-router-dom'


export default class Wishlist extends Component {
    static contextType = ProductListContext
    
    render() {
        const { wishlist } = this.props
        return(
            <>
                <Link to={`/wishlist/${wishlist.id}`} className='WishlistItem'>
                    <header className='WishlistItem__header'>
                        <h2 className='WishlistItem__heading'>
                            {wishlist.wishlist_name}    
                        </h2>    
                    </header>    
                </Link>
            </>
        )
    }
}