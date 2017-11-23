var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395',
'#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

const updateDatasets = (nextProps) => {
  console.log("In update datasets function"); 
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
  console.log(totalDatasets);
  //Return chart setup
  return (totalDatasets);
};

const chartSetup = (nextProps) => {
  console.log("In chartsetup.js");
  let labels = [];
  let stockName = '';// startDate = '', endDate = '';
  let testDatasets = null;
  let datasets = null;
  console.log(nextProps);
  if(nextProps.stockData.length){
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
    { labels: labels, datasets: datasets }
  );
}

export default chartSetup;