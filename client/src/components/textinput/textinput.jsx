import React from 'react';

class TextInput extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onChange(event);
	}
	
    render() {
        return (
            <input required
            	name={this.props.name}
            	className="textInput"
            	type={this.props.type ? this.props.type : "text"}
            	placeholder={this.props.placeholder}
            	onChange={this.handleChange} />
        );
    }

}

export default TextInput;