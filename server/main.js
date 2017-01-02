import { Meteor } from 'meteor/meteor';
import { Shop } from '../imports/collection/shop';
import { Image } from '../imports/collection/image';
import { Item } from '../imports/collection/item';

function setUpImageServer() {
  Image.allow({
    'insert': function() {
        // add custom authentication code here
        return true;
    },
    'update': function() {
        // add custom authentication code here
        return true;
    },
    'remove': function() {
        // add custom authentication code here
        return true;
    },
    download: function(userId, fileObj) {
        return true
    }
  });
}

function publish() {
	Meteor.publish('shopByOwner', function(userId) {
		return Clubs.find({'owner': userId});
	});
	Meteor.publish('currentUser', function() {
		if (!this.userId) {
			return this.ready();
		}
		return Meteor.users.find({_id: this.userId});
	});
	Meteor.publish('currentShop', function() {
		return Shop.find({owner: this.userId});
	});
	Meteor.publish("itemsForShop", function(shopId){
		return Item.find({shop: shopId});
	});
}

Meteor.startup(() => {
	setUpImageServer();
  // code to run on server at startup
	publish();
	Accounts.onCreateUser(function(options, user) {
    user.shopId = options.shopId;
    return user;
  });
});
