import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class Entry extends TrackerReact(Component) {
	componentWillMount() {
		const userId = Meteor.userId();
		if (userId) {
			const url = `/shop/${userId}`;
			browserHistory.push(url);
		} else {
			const url = '/login';
			browserHistory.push(url);
		}
	}
	render() {
		return <div>空白页</div>
	}
}

export default Entry;
