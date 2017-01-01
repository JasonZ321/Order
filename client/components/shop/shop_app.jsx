import React, {Component} from 'react'
import { browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ShopHeader from './header/shop_header';
import ShopSidePanel from './sidepanel/shop_side_panel';


class ShopApp extends Component {
	onLogout(event) {
		event.preventDefault();
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/');
		});
	}
	render() {
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
	}
}

export default ShopApp;
