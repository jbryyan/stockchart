//Component used to search stock codes using the API service offered by Quandl.
//The api call is handled in a helper function as to not clutter the component.

//Created: 11/20/2017, last edit: Bryan 11/24/2017

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
    //apiSearch function in ./src/functions
    //Will make the GET request using the quandl.com services
    apiSearch(this.textInput.value)
      .then(result => {
        console.log(result);
      }) 
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Row>
        <form onSubmit={(e) => this.handleSearch(e)} ref={input => this.form = input}>
        <FormGroup>
          <ControlLabel style={{color: 'white'}}>Enter stock code to chart data</ControlLabel>
          <InputGroup>
            <FormControl inputRef={input => this.textInput = input} type="text" placeholder="Enter a stock code" required/>
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
