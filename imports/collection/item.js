import { Mongo } from 'meteor/mongo';
import { Shop } from './shop';

Meteor.methods({
	'item.insert':function(item){
		 if(item && item.shop) {
			 const data = {
				 createdAt: new Date(),
				 ...item
			 }
			 Item.schema.validate(data);
			 return Item.insert(data);
		 }
		 return null;
	},
	'item.update': function(itemId, item) {
		if(item && itemId) {
			return Item.update(itemId, {
				$set: {...item}
			});
		}
	},
	'item.remove': function(item) {
		if(item && item.shop) {
			const shop = Shop.findOne({_id: item.shop});
			if(shop.owner === this.userId) {
				return Item.remove(item);
			} else {
				console.error('User has no permission to remove item {}', item.name);
			}
		}
	}
});

export const Item = new Mongo.Collection('Item');

Item.schema = new SimpleSchema({
	name: {type: String},
	price: {type: String},
	avatarURL: {type: String},
	shop: {type: String},
	description: {type: String},
	createdAt: {type: Date}
});
