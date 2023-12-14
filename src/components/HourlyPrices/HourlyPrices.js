import React, { Component } from "react";
import "./HourlyPrices.css";
import HourlyPriceGraph from "../HourlyPriceGraph/HourlyPriceGraph";

class HourlyPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
        zipcode: 0,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { zipcode } = this.state;

    let hourlyPrices = null;
    const storedHourlyPrices = localStorage.getItem('hourlyPrices');
    if(storedHourlyPrices) {
        hourlyPrices = JSON.parse(storedHourlyPrices);
    }

    hourlyPrices = hourlyPrices.filter(item => item.Zipcode === parseInt(zipcode))

    let hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    let prices = [];
    if(hourlyPrices) {
      prices = hourlyPrices.map(item => item.Value);
    }

    return (
      <div className="margin-20">
        <h1>Hourly Prices</h1>

        <div className="text-align-center">
          <input
              type="number"
              id="zipcode"
              name="zipcode"
              value={zipcode !== 0 ? zipcode : ''}
              onChange={this.handleInputChange}
              placeholder="Search By Zipcode"
              className="zipcode-input"
          />

          <HourlyPriceGraph
            labels={hours}
            prices={prices}
          />
        </div>
      </div>
    );
  }
}

export default HourlyPrices;