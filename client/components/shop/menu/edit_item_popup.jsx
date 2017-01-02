import React, {Component} from 'react';
import Modal from 'react-modal';
import AvatarUploader from '../../common/avatar_uploader';
import { Images } from '../../../../imports/collection/image';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { createImageFiles } from '../../../../imports/api/image_api';

class EditItemPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarURL: this.props.item.avatarURL
		}
	}
	onImageUpload(files) {
		createImageFiles(files, (imageURL) => {
			this.setState({
				avatarURL: imageURL
			});
		});
	}
	updateItem(event) {
		event.preventDefault();
		const { name, price, description } = this.refs;
		const oldItem = this.props.item;
		const item = {
			avatarURL: this.state.avatarURL,
			name: name.getValue(),
			price: price.getValue(),
			description: description.getValue(),
			shop: oldItem.shop
		}
		if (item.avatarURL && item.name && item.price && item.description && item.shop) {
			this.props.onSubmit(item);
		} else {
			console.log("Must fill all fields");
		}
	}
	cancel(event) {
		event.preventDefault();
		this.setState({
			avatarURL: null
		});
		this.props.onCancel();
	}
	render() {
		const item = this.props.item;
		return (
			<div>
				<Modal isOpen={this.props.isOpen} contentLabel="更新菜品">
          <h1>更新菜品</h1>
					<form className="form-signin">
							<AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />
							<TextField floatingLabelText="菜名" defaultValue={item.name} ref='name'/>
							<TextField floatingLabelText="价格" defaultValue={item.price} ref='price'/>
							<TextField floatingLabelText="描述" defaultValue={item.description} ref='description' multiLine={true} />
							<RaisedButton onClick={this.updateItem.bind(this)} label="更新" primary={true} />
							<RaisedButton onClick={this.cancel.bind(this)} label="取消" secondary={true} />
					</form>
        </Modal>
			</div>
		)
	}

}

export default EditItemPopup;
