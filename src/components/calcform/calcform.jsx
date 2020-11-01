import React from 'react';
import './calcform.scss'
import Textinput from '../textinput/textinput.jsx';
import Dropdown from '../dropdown/dropdown.jsx';

class CalcForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			reference: null,
			format: null,
			mm: null,
			f: null
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.sendSubmit = this.sendSubmit.bind(this);

	}
	
	async handleInputChange(event) {
		this.props.getData(event.target);
	}

	sendSubmit(event) {
		event.preventDefault();
		this.props.getSubmit();
	}

	render () {
		return (
			<form className={this.props.className} onSubmit={this.sendSubmit}>
				<div className="row">
					<div className="column first">
						<div className="inputLabelGroup">
							<label>Reference format</label>
					        <Dropdown // See component file for documentation
					        	dataFields={['Type', 'Width (mm)', 'Height (mm)']}
								optionDataFormat={'`${data[i][dataFields[0]]} (${data[i][dataFields[1]]}mm x ${data[i][dataFields[2]]}mm)`'}
					        	//optionDataFormat={'data[i][dataFields[0]] + " (" + data[i][dataFields[1]] + "mm x " + data[i][dataFields[2]] + "mm)"'}
					        	name="reference"
					        	placeholder="Reference format"
					        	//defaultValue="0"
					        	onChange={this.handleInputChange} />
					    </div>
				    	<div className="inputLabelGroup">
							<label>Format</label>
					        <Dropdown // See component file for documentation
					        	dataFields={['Type', 'Width (mm)', 'Height (mm)']}
					        	optionDataFormat={'`${data[i][dataFields[0]]} (${data[i][dataFields[1]]}mm x ${data[i][dataFields[2]]}mm)`'}
					        	//optionDataFormat={'data[i][dataFields[0]] + " (" + data[i][dataFields[1]] + "mm x " + data[i][dataFields[2]] + "mm)"'}
					        	name="format"
					        	placeholder="Format"
					        	//defaultValue="0"
					        	onChange={this.handleInputChange} />
					    </div>
				    </div>
				    <div className="column second">
				        <div className="inputLabelGroup">
							<label>Focal length</label>
					        <Textinput
					        	name="mm"
					        	type="number"
					        	placeholder="Lens mm"
					        	onChange={this.handleInputChange} />
					    </div>
				        <div className="inputLabelGroup">
							<label>Aperture</label>
					        <Textinput
					        	name="f"
					        	placeholder="Aperture"
					        	onChange={this.handleInputChange} />
					    </div>
				    </div>
				</div>
				<div className="row">
				    <input type="submit" value="Calculate reference equivalent" />
				</div>
		    </form>
		);
	}
}

export default CalcForm;
