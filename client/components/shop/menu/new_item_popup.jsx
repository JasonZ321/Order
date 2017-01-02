import React, {Component} from 'react';
import Modal from 'react-modal';
import AvatarUploader from '../../common/avatar_uploader';
import { Images } from '../../../../imports/collection/image';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { createImageFiles } from '../../../../imports/api/image_api';

class NewItemPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarURL: null
		}
	}
	onImageUpload(files) {
		createImageFiles(files, (imageURL) => {
			this.setState({
				avatarURL: imageURL
			});
		});
	}
	submitNewItem(event) {
		event.preventDefault();
		const { name, price, description } = this.refs;
		const item = {
			avatarURL: this.state.avatarURL,
			name: name.getValue(),
			price: price.getValue(),
			description: description.getValue(),
			shop: this.props.shop._id
		}
		if (item.avatarURL && item.name && item.price && item.description && item.shop) {
			this.props.onSubmit(item);
		} else {
			console.log("Must fill all fields");
		}
		this.setState({
			avatarURL: null
		});
	}
	cancel(event) {
		event.preventDefault();
		this.setState({
			avatarURL: null
		});
		this.props.onCancel();
	}
	render() {
		return (
			<div>
				<Modal isOpen={this.props.isOpen} contentLabel="添加新菜品">
          <h1>添加新菜品</h1>
					<form className="form-signin">
							<AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />
							<TextField hintText="菜名" ref='name'/>
							<TextField hintText="价格" ref='price'/>
							<TextField hintText="描述" ref='description' multiLine={true} />
							<RaisedButton onClick={this.submitNewItem.bind(this)} label="创建" primary={true} />
							<RaisedButton onClick={this.cancel.bind(this)} label="取消" secondary={true} />
					</form>
        </Modal>
			</div>
		)
	}

}

export default NewItemPopup;
