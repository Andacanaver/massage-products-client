export const findProduct = (productList = [], productId) =>
	productList.find(product => product.id == productId);

export const findUser = (users = [], userId) => 
	users.find(user => user.id == userId);

export const findWishlist = (wishlists = [], wishlistId) => 
	wishlists.find(wishlist => wishlist.id == wishlistId)