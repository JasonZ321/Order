import { Item } from '../collection/item';

export function createItem(item, callback) {
	Meteor.call("item.insert", item, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			callback(result);
		}
	});
}

export function updateItem(itemId, item, callback) {
	Meteor.call("item.update", itemId, item, function(error, result){
		if(error){
			console.log("error", error);
		}
		callback();
	});
}

export function removeItem(item, callback) {
	Meteor.call("item.remove", item, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			 callback(result);
		}
	});
}
