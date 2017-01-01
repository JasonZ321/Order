import { Mongo } from 'meteor/mongo';
Meteor.methods({
	"shop.insert": function(shop) {
		const data = {...shop, createdAt: new Date()};
		Shop.schema.validate(data);
		return Shop.insert(data);
	},
	"shop.addOwner":function(shopId){
		if(shopId) {
			const userId = this.userId;
			Shop.update(shopId, {
				$set: { owner: userId },
			});
		}
	},
	'shop.update': function(shopId, shop) {
		if (shopId && shop) {
			Shop.update(shopId, {
	      $set: { ...shop },
	    });
		}
	},
	'shop.avatar': function(shopId, avatarURL) {
		if(shopId && avatarURL) {
			Shop.update(shopId, {
				$set: { avatarURL },
			});
		}
	}
});
export const Shop = new Mongo.Collection('Shop');
Shop.schema = new SimpleSchema({
	name: {type:String},
	address: {type:String, optional: true},
	owner: {type:String, optional: true},
	avatarURL: {type: String, optional: true},
	createdAt: {type: Date}
});
