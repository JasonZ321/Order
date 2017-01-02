import React, { Component } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { updateItem, removeItem } from '../../../../imports/api/item_api';
import EditItemPopup from './edit_item_popup';

class ItemCell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popupOpen: false,
			avatarURL: this.props.item.avatarURL
		}
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
	cancelItemUpdate() {
		this.closePopup();
	}
	onUpdateItem(item) {
		updateItem(this.props.item._id, item, () => {
			this.closePopup();
		});
	}
	render() {
		const item = this.props.item;
		return (
		  <Card style={{'marginBottom': 20}}>
		    <CardMedia>
		      <img src={item.avatarURL} />
		    </CardMedia>
		    <CardTitle title={item.name} subtitle={item.price} />
		    <CardText>
		      {item.description}
		    </CardText>
		    <CardActions>
		      <FlatButton label="修改" onClick={this.openPopup.bind(this)} />
					<EditItemPopup isOpen={this.state.popupOpen} onCancel={this.cancelItemUpdate.bind(this)} onSubmit={this.onUpdateItem.bind(this)} item={item}/>
		    </CardActions>
		  </Card>
		);
	}
}


export default ItemCell;
