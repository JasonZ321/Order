export function createShop(shop, callback) {
	Meteor.call('shop.insert', shop, function(error, result) {
		if (error) {
			console.log("error", error);
		}
		if (result) {
			console.log("Shop %s was created.", result );
		}
		if (callback) {
			callback(error, result);
		}
	});
}

export function uploadShopAvatar(shopId, avatarURL, callback) {
	Meteor.call('shop.avatar', shopId, avatarURL, function(error, result) {
		if(error) {
			console.error(error);
		}
		if(callback) {
			callback(error, result);
		}
	})
}
