
import Chart from 'chart.js';

const updateDatasets = (nextProps) => {
  console.log("In update datasets function"); 
  let totalDatasets = [];
  //Loop through nextprops array
  nextProps.stockData.forEach(e => {
    //Grab the stock name
    let label = Object.keys(e)[0];
    let dataset = [];
    //Loop through the array that contains the date with the respective value on that date. [date, value]
    e[label].data.forEach((stockValue) => {
      //Push value into local dataset array
      dataset.push(stockValue[1]);
    });
    
    //Return totalDatasets by pushing into a local array. 
    totalDatasets.push({
      label: label,
      data: dataset,
      fill: false
    });
  });
  console.log(totalDatasets);
  //Return chart setup
  return (totalDatasets);
};

const chartSetup = (ctx, nextProps) => {

  let labels = [];
  let stockName = '';// startDate = '', endDate = '';
  let testDatasets = null;
  let datasets = null;
 
  if(nextProps){
    console.log("In chart setup");
    console.log(nextProps.stockData);
    //Update variables needed to update chart according to props.
    stockName = Object.keys(nextProps.stockData[0])[0];
    //startDate = nextProps.stockData[0][stockName].start_date;
    //endDate = nextProps.stockData[0][stockName].end_date;
    testDatasets = nextProps.stockData[0][stockName].data;

    //Update chart according to props passed.
    labels = testDatasets.map((e)=> e[0]);
    //datasets = updateDatasets(testDatasets, stockName);
    datasets = updateDatasets(nextProps);
  }
  //Returns chart
  return ( 
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      }, 
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 10,
              min: 0,
              max: 200
            }
          }]
        },
        responsive: true,
        elements: { 
          point: { 
            radius: 0,
            hitRadius: 10, 
            hoverRadius: 5,
          } 
        },
        tooltips: {
          mode: 'index',
          intersect: false
        }
      },
      plugins: [{
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
      }],
    })
  );
}

export default chartSetup;