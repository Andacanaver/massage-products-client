export const findProduct = (productList = [], productId) =>
	productList.find(product => product.id === parseInt(productId));

export const findWishlist = (wishlists = [], wishlistId) => 
	wishlists.find(wishlist => wishlist.id === wishlistId)