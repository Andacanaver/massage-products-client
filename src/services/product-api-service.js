import config from '../config'

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
	insertProduct(product) {
		return fetch(`${config.API_ENDPOINT}/products`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				product_name: product.product_name,
				product_type: product.product_type,
				price: product.price,
				product_description: product.product_description,
				product_image: product.product_image
			})
		})
		.then(res => {
			if (!res.ok) {
				return e => Promise.reject(e);
			}
			return res.json();
		})
	},
	deleteProduct(productId) {
		return fetch(`${config.API_ENDPOINT}/products/${productId}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json"
			}
		})
			.then(res => res.text())
			.then(text => text.length ? JSON.parse(text) : {})
			.catch(err => {
				throw err;
			})

			
			
	}
}

export default ProductApiService