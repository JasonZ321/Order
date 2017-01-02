import React, { Component } from 'react';
import { getTrackerLoader } from '../../../../imports/utils/common';
import { compose } from 'react-komposer';
import MenuApp from './menu_app';
import { Item } from '../../../../imports/collection/item';
import { Shop } from '../../../../imports/collection/shop';
function reactiveMapper(props, onData) {
	if(Meteor.subscribe('currentShop').ready()) {
		const shop = Shop.findOne({});
		if(shop) {
			const shopId = shop._id;
			if(Meteor.subscribe('itemsForShop', shopId).ready()) {
				const items = Item.find({shop: shopId}).fetch();
				if(items) {
					onData(null, {shop, items});
				}
			}
		}
	}

}

export default compose(getTrackerLoader(reactiveMapper))(MenuApp);
