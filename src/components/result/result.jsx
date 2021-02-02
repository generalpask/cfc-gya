import React from 'react';
import {readCSV} from '../../utils.js';
import './result.scss';

class Result extends React.Component {
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

        let parsedCSV = await readCSV(require('../../formats-modified-minimal.csv'));
        let data = parsedCSV.data;

        let referenceType = await data[this.state.reference]['Type'];
        let formatType = await data[this.state.format]['Type'];

        this.setState({referenceType, formatType});
	}

	render() {
		return (
			<div className={this.props.className}>
                <div className="column-center">
                    <div className="row row-first">
                        <p>Your <b>"{this.state.mm}mm f/{this.state.f}"</b> lens on a <b>"{this.state.referenceType}"</b> sensor will be equivalent to a ...</p>
                    </div>
                    <div className="box">
                        <p>{this.state.result.resultMm}mm f/{this.state.result.resultF}</p>
                    </div>
                    <div className="row row-second">
                        <p>... lens on a <b>"{this.state.formatType}"</b> sensor, with a crop factor of <b>{this.state.result.cropFactor}</b>.</p>
                    </div>
                    <br />
                    <h3 className="subheading">How does this work?</h3>
                    <p>To calculate the equivalent, we simply need to use the pythagoran theorem to find the diagonals of both our formats, then dividing the reference format with the format to get the crop factor. That factor can then be used to multiply the focal length and aperture for our result.</p>
                    <br />
                    <p>Let reference = aWidth, aHeight & format = bWidth, bHeight</p>
                    <br />
                </div>
			</div>
		);
	}
}

export default Result;
