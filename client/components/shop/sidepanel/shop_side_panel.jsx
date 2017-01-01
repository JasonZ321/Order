import React, { Component } from 'react';
import AvatarUploader from '../../common/avatar_uploader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { createImageFiles } from '../../../../imports/api/image_api';
import { uploadShopAvatar } from '../../../../imports/api/shop_api';

class ShopSidePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarURL: this.props.shop.avatarURL
		}
	}
	onImageUploadFinished(url) {
		const shopId = this.props.shop._id;
		uploadShopAvatar(shopId, url, () => {
			this.setState({
				avatarURL: url
			});
		});
	}
	onImageUpload(files) {
		createImageFiles(files, (imageURL) => {
			this.onImageUploadFinished(imageURL);
		});
	}
	render() {
		return (
			<div className='col-md-6'>
				<div>
		   		<span style={{'marginRight': 20}}>{this.props.shop.name}</span>
		   	</div>
				<AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />
			</div>
		)
	}
}

export default ShopSidePanel;
