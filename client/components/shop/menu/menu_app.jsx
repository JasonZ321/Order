import React, { Component } from 'react';
import NewItemPopup from './new_item_popup';
import ItemCell from './item_cell';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { createItem, updateItem, removeItem } from '../../../../imports/api/item_api';

class MenuApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popupOpen: false
		};
		this.openPopup = this.openPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}
	openPopup() {
		this.setState({
			popupOpen: true
		});
	}
	closePopup() {
		this.setState({
			popupOpen: false
		});
	}
	cancelItemCreate() {
		this.closePopup();
	}
	onCreateItem(item) {
		createItem(item, () => {
			this.closePopup();
		});
	}
	renderItemList() {
		const shop = this.props.shop;
		return this.props.items.map(item => <ItemCell key={item._id} item={item} shop={shop}/>);
	}
	renderCreateItemButton() {
			return (
				<div style={{'text-align': 'right', 'marginBottom': 20}} >
					<FloatingActionButton onClick={this.openPopup} ><ContentAdd /></FloatingActionButton>
					<NewItemPopup isOpen={this.state.popupOpen} shop={this.props.shop} onCancel={this.cancelItemCreate.bind(this)} onSubmit={this.onCreateItem.bind(this)}/>
		    </div>
			);
	}
	render() {
		if(this.context.authorized) {
			return (
				<div className='col-md-6'>
					{this.renderCreateItemButton()}
					<ul>
						{this.renderItemList()}
					</ul>
				</div>
			);
		} else {
			return <div>请登录</div>
		}

	}
}

MenuApp.contextTypes = {
	authorized: React.PropTypes.bool
};

export default MenuApp;
