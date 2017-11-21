import React, { Component } from 'react';

import { FormGroup, InputGroup, FormControl, ControlLabel, Button, Row } from 'react-bootstrap';
import  apiSearch from '../functions/apiQuandl.js';

class SearchBar extends Component {
  constructor(){
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleSearch(e){
    e.preventDefault();
    let localData = localStorage.getItem('Stock_Data');
    /*if(localData){
      console.log("Data in local storage");
      this.props.updateStocks(JSON.parse(localData), this.textInput.value)
    } else {*/
      console.log("Making api call");
      //apiSearch function in ./src/functions
      //Will make the GET request using the quandl.com services
      apiSearch(this.textInput.value)
        .then(result => {
          //localStorage.setItem('Stock_Data', JSON.stringify(result));
          this.props.updateStocks(result, this.textInput.value)
        })  //Updating stocks data in main app component
        .catch(error => console.log(error));
    //}
  }

  render() {

    return (
      <Row>
        <form onSubmit={(e) => this.handleSearch(e)} ref={input => this.form = input}>
        <FormGroup>
          <ControlLabel>Enter stock code to chart data</ControlLabel>
          <InputGroup>
            <FormControl inputRef={input => this.textInput = input} type="text" placeholder="Enter a city" required/>
            <InputGroup.Button>
              <Button type="submit">Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        </form>
      </Row>
    );
  }
}

export default SearchBar;
