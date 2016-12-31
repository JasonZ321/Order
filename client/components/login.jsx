import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SignupPopup from './signup_popup';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {loginShopUser, createShopUser} from '../../imports/api/user_api';
import FlatButton from 'material-ui/FlatButton';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popupOpen: false
		};
	}
	showSignUpModal() {
		this.setState({popupOpen:true});
	}
	cancelSignUp() {
		this.setState({popupOpen:false});
	}
	navigateToUserPage(userId) {
		const url = `/user/${userId}`;
		browserHistory.push(url);
	}
	onLogin(event) {
		event.preventDefault();
		const self = this;
		const {username, password} = this.refs;
		if (username.value && password.value) {
			loginShopUser(username.value, password.value, function(userId) {
				self.navigateToUserPage(userId);
			});
		} else {
			alert('Invalid input!');
		}
	}
	onCreateShopUser(username, password, shopName) {
		const self = this;
		createShopUser(username, password, shopName, function(error, shopId) {
			if(shopId) {
				const userId = Meteor.userId();
				self.navigateToUserPage(userId);
			} else {
				this.setState({popupOpen:false});
			}
		})
	}
	render() {
		return (
			<div>
				<form className="form-signin">
					<label className="sr-only" for="username">用户名:</label>
					<input className='form-control' type="text" ref='username' placeholder="用户名" id='username'/>
					<label className="sr-only" for="password">密码:</label>
					<input className='form-control' type="text" ref='password' placeholder="密码" id='password'/>
					<FlatButton backgroundColor="#2196F3" className="start-but" onClick={this.onLogin.bind(this)} label="登陆"/>
					<FlatButton backgroundColor="#2196F3" className="start-but" onClick={this.showSignUpModal.bind(this)} label="注册"/>
				</form>
				<SignupPopup isOpen={this.state.popupOpen} onCancel={this.cancelSignUp.bind(this)} onSubmit={this.onCreateShopUser.bind(this)} />
			</div>
		);

	}
}

export default Login;
