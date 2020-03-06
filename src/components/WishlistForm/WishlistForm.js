import React, { Component } from 'react'
import ProductListContext from '../../contexts/ProductListContext'
import WishlistService from '../../services/wishlist-api-service'
import { Section } from '../../Utils/Utils'


export default class WishlistForm extends Component {
    static contextType = ProductListContext
    static defaultProps = {
        history: {
            push: () => {}
        }
    }
    state = {
        error: null,
    }
    handleSubmit = (e) => {
        e.preventDefault()
        
        this.setState({ error: null })
        WishlistService.postWishlist(
			this.context.wishlist_name()
		)
			.then(response => {
				if (!response.ok) {
					response
						.json()
						.then(response =>
							this.setState({ error: response.error })
						);
				} else {
					response
						.json()
						.then(res => {
                            this.context.addWishlist(res)
                            this.context.clearWishlistName()
						})
						
				}
			})
    }  

    render() {
        const { error } = this.state
        return (
            <Section className='Wishlist__add-form'>
                <form className='WishlistForm' onSubmit={this.handleSubmit}>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <label htmlFor='WishlistForm_wishlist_name'>Wishlist Name: </label>
                    <input type='text' id='WishlistForm_wishlist_name' name='wishlist_name' 
                    onChange={e => this.context.setWishlistName(e.target.value)}
                    value={this.context.wishlist_name}/>
                    <button type='submit'>Create Wishlist</button>
                </form>
            </Section>
        )
    }
}