import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
   	padding: '20px',
		width: '40%'
  }
};

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
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
	renderShopTabs() {
		const userId = this.props.shop.owner;
		const mainURL =`/shop/${userId}`;
		const orderURL = `/shop/${userId}/order`;
		const menuURL = `/shop/${userId}/menu`;

		return (
			<div>
				<Menu listStyle={flexContainer}>
          <MenuItem
            containerElement={<Link to={mainURL} />}
            primaryText="首页"
          />
          <MenuItem
            containerElement={<Link to={orderURL} />}
            primaryText="订单管理"
          />
          <MenuItem
            containerElement={<Link to={menuURL} />}
            primaryText="菜单管理"
          />
			 	</Menu>
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
