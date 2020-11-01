import React from 'react';
import './app.scss';
import {readCSV} from '../../utils.js';
import CalcForm from '../calcform/calcform.jsx';
import ResultBox from '../resultbox/resultbox.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reference: null,
            format: null,
            mm: null,
            f: null,
            done: false,
            result: {
                cropFactor: null,
                resultMm: null,
                resultF: null
            }
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ResultBox = React.createRef();
    }

    handleData = (data) => {
        this.setState({ [data.name]: data.value });
    }

    async handleSubmit() {
        const result = await this.compare(this.state.reference, this.state.format, this.state.mm, this.state.f);
        this.ResultBox.current.getResult(result);
        window.scrollTo(0, this.ResultWrapper)
    }                
    
    // Compare reference to format
    // let reference = aWidth, aHeight & format = bWidth, bHeight
    // Basic math is  :  crop factor = sqrt(aWidth^2 + aHeight^2) / sqrt(bWidth^2 + bHeight^2)
    async compare(reference, format, mm, f) {
//      let rawData = await fetch('/formats');
//      let data = await rawData.json();

        let parsedCSV = await readCSV(require('../../formats-modified.csv'));
        let data = parsedCSV.data;
        
        // Yes I know this is ugly as shit
        let referenceWidth = await data[reference]['Width (mm)'];
        let referenceHeight = await data[reference]['Height (mm)'];
        let formatWidth = await data[format]['Width (mm)'];
        let formatHeight = await data[format]['Height (mm)'];

        let cropFactor = Math.sqrt( Math.pow(referenceWidth, 2) + Math.pow(referenceHeight, 2) ) / Math.sqrt( Math.pow(formatWidth, 2) + Math.pow(formatHeight, 2) );

        // Rounding
        cropFactor = Math.round(cropFactor * 100) / 100;
        let resultMm = Math.round((mm * cropFactor) * 100) / 100;
        let resultF = Math.round((f * cropFactor) * 100) / 100;
        

        this.setState({
            done: true,
            result: {
                cropFactor,
                resultMm,
                resultF
            }
        });

        return this.state;
    }

    render() { 
        return (    
            <>
                <div className="main">
                    <h1 className="title">CropFactorCalculator</h1>
                    <div className="box-center">
                        <CalcForm className="calcForm" getData={this.handleData} getSubmit={this.handleSubmit} />
                        <br />
                        <p>Result:</p>
                        <ResultBox className="resultBox" ref={this.ResultBox} state={this.state.result} />
                    </div>
                </div>
            </>
        );
    }
}

export default App;
