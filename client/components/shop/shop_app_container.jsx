import React from 'react';
import { compose } from 'react-komposer';
import { browserHistory } from 'react-router';
import ShopApp from './shop_app';
import { Shop } from '../../../imports/collection/shop';
import { getTrackerLoader } from '../../../imports/utils/common';

function reactiveMapper(props, onData) {
	if(Meteor.subscribe('currentShop').ready()) {
		const shop = Shop.findOne({});
		if(shop) {
			onData(null, {shop});
		}
	}
}

export default compose(getTrackerLoader(reactiveMapper))(ShopApp);
