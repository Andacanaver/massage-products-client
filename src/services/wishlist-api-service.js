import config from '../config'
import TokenService from './token-service'

const WishlistService = {
    postWishlist(wishlist) {
        return fetch(`${config.API_ENDPOINT}/wishlist`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(wishlist)
		})
    },
    getWishlist(){
        return fetch(`${config.API_ENDPOINT}/wishlist`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res => {
            if(!res.ok) {
                return e => Promise.reject(e)
            }
            return res.json()
        })
    },
    getWishlistProducts(wishlistId) {
        return fetch(`${config.API_ENDPOINT}/wishlist/${wishlistId}`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(response => {
			if (!response.ok) {
				return e => Promise.reject(e);
			}
			return response.json();
		});
    },
    postWishlistProduct(wishlistProduct) {
        return fetch(`${config.API_ENDPOINT}/wishlist/${wishlistProduct.wishlist_id}`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(wishlistProduct)
        })
    }
}

export default WishlistService