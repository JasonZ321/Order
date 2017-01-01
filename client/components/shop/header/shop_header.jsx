import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';

const styles = {
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
   	padding: '20px',
		width: '40%'
  }
};

class ShopHeader extends Component {
	onLogout() {
		event.preventDefault();
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/');
		});
	}
	onNavigateToHome() {
		event.preventDefault();
		browserHistory.push('/');
    location.reload();
	}
	handleTabChange(value, e, tab) {
		browserHistory.push(tab.props.route);
	}
	renderShopTabs() {
		const userId = this.props.shop.owner;
		const mainURL =`/shop/${userId}`;
		const orderURL = `/shop/${userId}/order`;
		const menuURL = `/shop/${userId}/menu`;

		return (
			<div>
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab label='首页' route={mainURL}></Tab>
					<Tab label='订单管理' route={orderURL}></Tab>
					<Tab label='菜单管理' route={menuURL}></Tab>
			 	</Tabs>
		</div>
		);
	}
	renderLeftButtons() {
		return (
			<div>
   			<a onClick={this.onLogout}>退出</a><br />
				<a onClick={this.onNavigateToHome}>我的首页</a>
   		</div>
		);
	}
	render() {
		return (
			<div>
				<AppBar style={styles.appBar} title="点餐" iconStyleRight={styles.tabs} iconElementRight={this.renderShopTabs()} iconElementLeft={this.renderLeftButtons()}/>
	 		</div>
	  );
	}
}

export default ShopHeader;
