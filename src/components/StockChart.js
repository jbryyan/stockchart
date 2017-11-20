import React, { Component } from 'react';
import chartSetup from '../functions/chartSetup';

class StockChart extends Component {


  componentDidMount() {
    this.updateCanvas();
  }
  
  componentWillReceiveProps(nextProps){
    //console.log(nextProps);
    this.updateCanvas(nextProps);
  }

  updateCanvas(nextProps) {
    console.log("In canvas");
    const ctx = this.refs.canvas.getContext('2d');
    chartSetup(ctx, nextProps);
  }
  
  render() {

    return (
        
            <canvas ref="canvas"/>
        
    );
  }
}

export default StockChart;
