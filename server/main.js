import { Meteor } from 'meteor/meteor';
import { Shop } from '../imports/collection/shop';
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
}

Meteor.startup(() => {
  // code to run on server at startup
	publish();
	Accounts.onCreateUser(function(options, user) {
    user.shopId = options.shopId;
    return user;
  });
});
