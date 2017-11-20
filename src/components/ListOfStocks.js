import React, { Component } from 'react';

import { Col, Row } from 'react-bootstrap';

class ListOfStocks extends Component {
  
  render() {

    return (
		<div>
			<Row>
				<Col md={3}>MM1</Col>
				<Col md={3}>MM2</Col>
				<Col md={3}>MM3</Col>
				<Col md={3}>MM4</Col>
			</Row>
			<Row>
				<Col md={3}>MM1</Col>
				<Col md={3}>MM2</Col>
				<Col md={3}>MM3</Col>
			  <Col md={3}>MM4</Col>
			</Row>
    </div>
    );
  }
}

export default ListOfStocks;
