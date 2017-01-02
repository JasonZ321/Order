import React, {Component} from 'react'
import { browserHistory, Link } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ShopHeader from './header/shop_header';
import ShopSidePanel from './sidepanel/shop_side_panel';


class ShopApp extends Component {
	getChildContext() {
		return {authorized: this.props.authorized};
	}
	onLogout(event) {
		event.preventDefault();
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/');
		});
	}
	render() {
		if(this.props.authorized) {
			return (
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<div>
						<ShopHeader shop={this.props.shop} onLogout={this.onLogout}/>
							<div className='full col-sm-9'>
								<ShopSidePanel shop={this.props.shop} />
									{this.props.children}
							</div>
					</div>
				</MuiThemeProvider>
			)
		} else {
			const loginUrl = '/login';
			return <Link to={loginUrl}><h3>请登录</h3></Link>
		}

	}
}

ShopApp.childContextTypes = {
  authorized: React.PropTypes.bool
};

export default ShopApp;
