import React, { Component } from 'react';
import {createShopUser} from '../../imports/api/user_api';
import Modal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';

class SignupPopup extends Component{
	cancel(event) {
		event.preventDefault();
		this.props.onCancel();
	}
	submitNewUser(event) {
		event.preventDefault();
		const { shopName, username, password } = this.refs;
		if ( shopName.value && username.value && password.value ) {
			this.props.onSubmit(username.value, password.value, shopName.value);
		} else {
			console.log("Must fill all fields");
		}
	}
	render() {
			return (
				<div>
					<Modal isOpen={this.props.isOpen} contentLabel="创建新活动">
						<form className="form-signin">
								<label className="sr-only" for="username">用户名:</label>
								<input className='form-control' type="text" ref='username' placeholder="用户名" id='username'/>
								<label className="sr-only" for="shopName">店名:</label>
								<input className='form-control' type="text" ref='shopName' placeholder="店名" id='shopName'/>
								<label className="sr-only" for="password">密码:</label>
								<input className='form-control' type="text" ref='password' placeholder="密码" id='password'/>
								<RaisedButton onClick={this.submitNewUser.bind(this)} label="创建" primary={true} />
								<RaisedButton onClick={this.cancel.bind(this)} label="取消" secondary={true} />
						</form>
	        </Modal>
				</div>
			)
		}
}

export default SignupPopup;
