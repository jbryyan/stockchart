//List of stocks will display the stock codes enter by the user underneat the chart.
//The user will be able to click on a link, 
//sending the user to a page with more information of the stock clicked.

//Created: 11/20/2017, last edit: Bryan 11/24/2017

import React, { Component } from 'react';
import { Col, Row,  Glyphicon } from 'react-bootstrap';

class ListOfStocks extends Component {
  //Handle delete will delete the stock from the server, 
  //which will update every user with the new chart information to re-render.
  handleDelete(index){
    let apiUrl = 'https://stockchart.glitch.me/deleteChart';
    Request.post(apiUrl)
    .send( { index: index })
    .then((res, err) => {
      if(err) throw (err);
      console.log(res);
    });
  }

  render() {
    return (
      <Row>
      {
        this.props.stockData.map((e, index) => 
          <Col style={{backgroundColor: 'white', margin: '10px', height: '30px', 
            display:'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '25px'}} 
            md={2} sm={2} xs={2} key={index}>
            <a href={`http://www.nasdaq.com/symbol/${e}`}>{e}</a>
            <Glyphicon glyph="remove" style={{marginLeft: 'auto'}} onClick={() => this.handleDelete(index)}/>
          </Col>
        )
      }
      </Row>
    );
  }
}

export default ListOfStocks;
