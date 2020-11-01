import React from 'react';
import Papa from 'papaparse';
import {readCSV} from '../../utils.js';

class Dropdown extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dataIsLoaded: false,
			elementsAreCreated: false,
			//dataSource: props.dataSource,
			dataFields: props.dataFields,
			optionDataFormat: props.optionDataFormat,
			data: null,
			elements: []
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onChange(event);
	}
	
    async componentDidMount () {
//		let data = await fetch(this.state.dataSource);
//		let json = await data.json();
        
        let parsedCSV = await readCSV(require('../../formats-modified.csv'));
        this.updateData(parsedCSV.data);
	}

    updateData = (inData) => {
		this.setState({ dataIsLoaded: true, data: inData });
		this.createElementsAndPushToArray(this.state.data, this.state.dataFields, this.state.optionDataFormat, this.state.elements);
    }

	async createElementsAndPushToArray(data, dataFields, format, array) {

		if (this.state.dataIsLoaded) {
			for (var i = 0; i < data.length; i++) {
				this.setState({
					array: array.push(<option key={i} value={i}>{eval(format)}</option>) 
				});
			}
			this.setState({ elementsAreCreated: true });
		}
	}

	renderOptions(elements) {
		for (var i = 0; i < elements.length; i++) {
			return elements[i];
		}
	}

	render() {
		return (
			<select required
				defaultValue=""
				name={this.props.name}
				className="dropdown" 
				onChange={this.handleChange} >

				<option value="" disabled hidden>{this.props.placeholder}</option>
				{ this.state.elementsAreCreated ? this.state.elements : null }

			</select>
		);
	}
}

export default Dropdown;
