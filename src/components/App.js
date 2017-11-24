//The main component that handles the state of the app. 
//Anytime a user enters a stock code, the app will handle the user input
//and graph an appropriate chart of said stock code. This will update accross all
//users that are currently browsing the app.
//Makes use of socket.io for realtime updates.

//Created: 11/20/2017, last edit: Bryan 11/24/2017

import React, { Component } from 'react';
import StockChart   from './StockChart';
import ListOfStocks from './ListOfStocks';
import SearchBar    from './SearchBar';
import { Grid, Jumbotron } from 'react-bootstrap';
import subscribeToServer from '../functions/api';


class App extends Component {
  
  constructor(){
    super();
    this.updateStocks = this.updateStocks.bind(this);
    this.state = {
      stocks: [],
      stockCodes: []
    };
  }

  //Upon mounting, connect to socket on server. 
  //This allows realtime updates to occur.
  componentDidMount(){
    subscribeToServer((err, data, stockCodes) => {
      this.updateStocks(data, stockCodes);
    }); 
  }

  //Update stocks will set the data appropriately after making a get request to quandl.
  updateStocks(data){
    let stocks = data[0];
    let stockCodes = data[1];
    this.setState({ stocks , stockCodes });
  }

  render() {
    return (
      <div>
        <Grid>
          <Jumbotron style={{textAlign: 'center', backgroundColor: '#2A2A2B', marginTop: '2vh'}}>
            <h3 style={{color: 'white'}}>Stock Market Graph</h3>
            <StockChart stockData={this.state.stocks} />
            <ListOfStocks stockData={this.state.stockCodes}/>
            <SearchBar updateStocks={this.updateStocks}/>
          </Jumbotron>
        </Grid>
      </div>
    );
  }
}

export default App;
