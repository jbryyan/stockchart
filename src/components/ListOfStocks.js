import React, { Component } from 'react';

import { Col, Row, Button } from 'react-bootstrap';

class ListOfStocks extends Component {
  
  render() {

    return (
  
      <Row>
      {
        this.props.stockData.map((e, index) => 
          <Col style={{backgroundColor: 'white', margin: '10px', height: '30px'}} md={2} sm={2} xs={2} key={index}>
            <a href={`http://www.nasdaq.com/symbol/${e}`}>{e}</a><Button/>
          </Col>
        )
      }
      </Row>
  
    );
  }
}

export default ListOfStocks;
