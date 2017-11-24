//This helper function deals with setting up the data attained from my server on the cloud.
//Specific setups must be done to graph the data according to the chartjs documentation.
//Refer to http://www.chartjs.org/docs/latest/ for specifics.

//Created: 11/20/2017, last edit: Bryan 11/24/2017


var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395',
'#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

const updateDatasets = (nextProps) => {
  let totalDatasets = [];
  //Loop through nextprops array
  nextProps.stockData.forEach((e, index) => {
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
      fill: false,
      borderColor: default_colors[index],
      backgroundColor: default_colors[index],
      pointRadius: 0
    });
  });

  //Return chart setup
  return (totalDatasets);
};

export const chartPlugins = () => {
  return ( 
    [{
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
    }]
  );
}

export const chartOptions = () => {
  return(
    {
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
    }
  );
}
export const chartSetup = (nextProps) => {
  let labels = [];
  let stockName = '';
  let testDatasets = null;
  let datasets = null;
  if(nextProps.stockData.length){
    //Update variables needed to update chart according to props.
    stockName = Object.keys(nextProps.stockData[0])[0];
    testDatasets = nextProps.stockData[0][stockName].data;

    //Update chart according to props passed.
    labels = testDatasets.map((e)=> e[0]);
    datasets = updateDatasets(nextProps);
  }
  //Returns chart
  return ( 
    { labels: labels, datasets: datasets }
  );
}

