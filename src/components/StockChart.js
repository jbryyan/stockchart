//This component will graph the stock codes that the user inputs.
//Refer to https://github.com/jerairrest/react-chartjs-2 for further documentation.

//Created: 11/20/2017, last edit: Bryan 11/24/2017

import React, { Component } from 'react';
import { chartSetup, chartOptions, chartPlugins } from '../functions/chartSetup';
import {Line} from 'react-chartjs-2';
import { Row } from 'react-bootstrap';
class StockChart extends Component {

  constructor(){
    super();
    this.state = {
      data: null
    };
  }
  
  //Mounts empty dataset to display an empty graph.
  componentWillMount() {
    const dataSet = {
      labels: [],
      datasets: [{data: []}]
    };

    this.setState({
      data: dataSet
    });
  }
  
  componentWillReceiveProps(nextProps){
    //New stock data received from App.js. Update canvas appropriately.
    if(nextProps){
      this.updateCanvas(nextProps);
    }
  }

  updateCanvas(nextProps) {
    //Chart setup will arrange the data appropriately to graph on the chartjs line component
    let data = chartSetup(nextProps);
    this.setState({ data: data});
  }
  
  render() {
    //Chart setup options grabbed from chartSetup.js
    let plugins = chartPlugins();
    let options= chartOptions();
    return (
      <Row>
        <Line data={this.state.data} plugins={plugins} options={options} />
      </Row>
    );
  }
}

export default StockChart;
