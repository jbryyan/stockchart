import React, { Component } from 'react';

//import './App.css';
import StockChart   from './StockChart';
import ListOfStocks from './ListOfStocks';
import SearchBar    from './SearchBar';
import { Grid, Jumbotron } from 'react-bootstrap';

import subscribeToTimer from '../functions/api';
import Request from 'superagent';

class App extends Component {
  
  constructor(){
    super();
    document.body.style = 'background: #444444';
    this.updateStocks = this.updateStocks.bind(this);
    this.state = {
      stocks: [],
      stockCodes: []
    };
  }

  componentDidMount(){
    subscribeToTimer((err, data, stockCodes) => {
      this.updateStocks(data, stockCodes);
    });

    
  }



  /*
  updateStocks(data, stockCode){
    //Copy states to update.
    let stocks = [...this.state.stocks];
    let stockCodes = [...this.state.stockCodes];
    //Push returned api value and the stock code searched
    stocks.push({ [stockCode]: data.dataset_data })
    stockCodes.push(stockCode);
    //Update state
    this.setState({ stocks: stocks, stockCodes: stockCodes});
  }
  */
  updateStocks(data){
    console.log("in updateStocks");
    console.log(data);
    let stocks = data[0];
    let stockCodes = data[1];
    this.setState({ stocks , stockCodes });
  }

  render() {

    return (
      <div>
        <Grid>
          <Jumbotron style={{textAlign: 'center', backgroundColor: '#2A2A2B'}}>
            <h3 style={{color: 'white'}}>Stock Market Graph</h3>
            <StockChart stockData={this.state.stocks} />
            <ListOfStocks stockData={this.state.stockCodes}/>
            <SearchBar updateStocks={this.updateStocks}/>
          </Jumbotron>
          <div>Timestamp: {this.state.timestamp} </div>
        </Grid>
      </div>
    );
  }
}

export default App;
