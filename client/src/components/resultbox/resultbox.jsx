import React from 'react';

class ResultBox extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            reference: null,
            referenceType: null,
            format: null,
            formatType: null,
            mm: null,
            f: null,
            done: false,
            result: {
                cropFactor: null,
                resultMm: null,
                resultF: null
            }
        };
	}

	async getResult(result) {
		this.setState(result);

		let rawData = await fetch('/formats');
        let data = await rawData.json();

        let referenceType = await data[this.state.reference]['Type'];
        let formatType = await data[this.state.format]['Type'];

        this.setState({referenceType, formatType});
	}

	render() {
		return (
			<div>
				<p>Your {this.state.mm}mm f/{this.state.f} lens on a {this.state.referenceType} sensor will be equivalent to a {this.state.result.resultMm}mm f/{this.state.result.resultF} lens on a {this.state.formatType} sensor, with a crop factor of {this.state.result.cropFactor}.</p>
				<p>Reference: {this.state.referenceType}</p>
				<p>Format: {this.state.formatType}</p>
				<p>Crop factor: {this.state.result.cropFactor}</p>
				<p>Reference equivalent focal length: {this.state.result.resultMm}</p>
				<p>Reference equivalent aperture: {this.state.result.resultF}</p>
			</div>
		);
	}
}

export default ResultBox;
