import { Meteor } from 'meteor/meteor';
import {createShop} from './shop_api';
import {Shop} from '../collection/shop';
export function createShopUser(username, password, shopName, callback) {
	createShop({name: shopName}, function(error, shopId) {
		if(error) {
			console.error(error);
			if(callback) callback(error);
		}
		if(shopId) {
			Accounts.createUser({username, password, shopId}, function(error){
				if (error) {
					console.log(error);
					Shop.remove({_id: shopId});
					if (callback) {
						callback(error);
					}
				} else {
					Meteor.call("shop.addOwner", shopId, function(error, result){
						if(error){
							console.log("error", error);
						}
						if (callback) {
							callback(error, shopId);
						}
					});
				}
			});
		}
	});
}
export function loginShopUser(username, password, callback) {
	Meteor.loginWithPassword(username, password, function (error) {
		if (error) {
			alert('wrong password or username!');
		} else {
			Meteor.subscribe('currentShop', function() {
				const shop = Shop.findOne({'owner': Meteor.userId()});
				if (!shop) {
					console.log("user %s doesn't have a shop", Meteor.userId());
					return;
				}
				if (callback) {
					callback(shop);
				}
			});
		}
	})
}
