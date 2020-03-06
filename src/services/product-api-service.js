import config from '../config'
import TokenService from '../services/token-service'

const ProductApiService = {
    getProducts() {
        return fetch(`${config.API_ENDPOINT}/products`, {
			headers: {}
		}).then(res => {
			if (!res.ok) {
				return e => Promise.reject(e);
			}
			return res.json();
		});
	},
	getType() {
		return fetch(`${config.API_ENDPOINT}/types`, {
			header: {}
		})
		.then(res => {
			if(!res.ok) {
				return e => Promise.reject(e)
			}
			return res.json()
		});
	},	
    getProduct(productId) {
        return fetch(`${config.API_ENDPOINT}/products/${productId}`, {
			headers: {
				
			}
		}).then(res => {
			if (!res.ok) {
				return e => Promise.reject(e);
			}
			return res.json();
		});
    },

}

export default ProductApiService