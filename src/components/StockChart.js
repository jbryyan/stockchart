import React, { Component } from 'react';
import chartSetup from '../functions/chartSetup';
import {Line} from 'react-chartjs-2';
import { Row } from 'react-bootstrap';
class StockChart extends Component {


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
    //console.log(nextProps);
    this.updateCanvas(nextProps);
  }

  updateCanvas(nextProps) {
    console.log("In canvas");
    //const ctx = this.refs.canvas.getContext('2d');
    let data = chartSetup(nextProps);
    this.setState({ data: data});
  }
  
  render() {
    let plugins = [{
      afterDatasetsDraw: function(chart) {
        if (chart.tooltip._active && chart.tooltip._active.length) {
           var activePoint = chart.tooltip._active[0],
               ctx = chart.ctx,
               y_axis = chart.scales['y-axis-0'],
               x = activePoint.tooltipPosition().x,
               topY = y_axis.top,
               bottomY = y_axis.bottom;
           // draw line
           ctx.save();
           ctx.beginPath();
           ctx.moveTo(x, topY);
           ctx.lineTo(x, bottomY);
           ctx.lineWidth = 2;
           ctx.strokeStyle = '#07C';
           ctx.stroke();
           ctx.restore();
        }
     }
    }];
    let options={
      legend: {
        labels: {
            fontColor: 'white'
        }
      },
      tooltips: {
          mode: 'index',
          intersect: false,
          itemSort: (a, b, data) => b.yLabel - a.yLabel
      },
      scales: {
        xAxes: [{
          type: 'time',
          position: 'bottom',
          gridLines: {
            display: false,
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: 'white'
          },
        }],
        yAxes: [{
          gridLines: {
           
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: 'white'
          },
        }],
      }
    };


    return (
      <Row>
        <Line data={this.state.data} plugins={plugins} options={options} />
      </Row>
    );
  }
}

export default StockChart;
