import React, {Component} from 'react'
import { browserHistory } from 'react-router';

class UserApp extends Component {
	onLogout(event) {
		event.preventDefault();
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/');
		});
	}
	render() {
		return <div><a onClick={this.onLogout}>退出</a><br />Logged in</div>
	}
}

export default UserApp;
