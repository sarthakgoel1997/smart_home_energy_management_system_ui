import React, { Component } from "react";
import {Button} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import EnergyConsumptionChart from "../EnergyConsumptionChart/EnergyConsumptionChart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import EnergyCostsGraph from "../EnergyCostsGraph/EnergyCostsGraph";
import DeviceConsumptionGraph from "../DeviceConsumptionGraph/DeviceConsumptionGraph";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceLocationCosts: null,
      totalEnergyCost: null,
      graphDate: null,
      enrolledDevices: null,
      totalEnergyConsumption: null
    };
  }
  
  getCustomerDetails() {
    let customerDetails = null;
    const storedCustomerDetails = localStorage.getItem('customerDetails');
    if(storedCustomerDetails) {
      customerDetails = JSON.parse(storedCustomerDetails);
    }
    return customerDetails;
  }

  fetchData = async () => {
    const customerDetails = this.getCustomerDetails();
    if(!customerDetails) {
        alert("You are not logged in");
        window.location.href = "/";
    }

    const {graphDate} = this.state;
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const currentDate = graphDate.toLocaleDateString('en-US', options);

    try {
        const response = await axios.get(`http://localhost:8000/dashboard?customerId=${customerDetails.Id}&currentDate=${currentDate}`);
        this.setState({ serviceLocationCosts: response.data.ServiceLocationCosts, totalEnergyCost: response.data.TotalEnergyCost, enrolledDevices: response.data.EnrolledDevices, totalEnergyConsumption: response.data.TotalEnergyConsumption, loading: false });
        localStorage.setItem('hourlyPrices', JSON.stringify(response.data.HourlyPrices));
    } catch (error) {
        console.error(error);
        this.setState({ loading: false });
    }
  };
  
  componentDidMount() {
    const currentDate = new Date();
    this.setState({graphDate: currentDate}, () => {this.fetchData()});
  }

  handlePrevClick = () => {
    let { graphDate } = this.state;
    graphDate.setMonth(graphDate.getMonth() - 1);

    this.setState({graphDate: graphDate}, () => {this.fetchData()});
  }

  handleNextClick = () => {
    let { graphDate } = this.state;
    graphDate.setMonth(graphDate.getMonth() + 1);

    this.setState({graphDate: graphDate}, () => {this.fetchData()});
  }

  render() {
    const { serviceLocationCosts, graphDate, enrolledDevices } = this.state;
    let { totalEnergyCost, totalEnergyConsumption } = this.state;

    const customerDetails = this.getCustomerDetails();
    if(!customerDetails) {
        return;
    }

    let serviceLocations = [], energyConsumptions = [], averageConsumptions = [], energyCosts = [];
    if (serviceLocationCosts) {
        serviceLocations = serviceLocationCosts.map(item => `${item.UnitNumber}, ${item.Street}, ${item.City}, ${item.State}, ${item.Zipcode}`);
        energyConsumptions = serviceLocationCosts.map(item => item.EnergyConsumption);
        averageConsumptions = serviceLocationCosts.map(item => item.SimilarLocationsAverageEnergyConsumption);
        energyCosts = serviceLocationCosts.map(item => item.EnergyCost);
    }

    const options = { month: 'long', year: 'numeric' };
    const monthYearString = graphDate?.toLocaleDateString(undefined, options);

    if(totalEnergyCost) {
      totalEnergyCost = totalEnergyCost.toFixed(2);
    }
    if(totalEnergyConsumption) {
      totalEnergyConsumption = totalEnergyConsumption.toFixed(2);
    }

    let deviceLabels = [], deviceConsumptions = [];
    if(enrolledDevices) {
      deviceLabels = enrolledDevices.map(item => item.DeviceLabel);
      deviceConsumptions = enrolledDevices.map(item => item.EnergyConsumption);
    }

    const currentDate = new Date();
    const currentMonthYear = currentDate?.toLocaleDateString(undefined, options);

    const isNextButtonDisabled = currentMonthYear === monthYearString;

    return (
      <div className="margin-20">

        <div className="display-flex justify-content-space-between mb-20">
            <h2>Welcome {customerDetails?.FirstName} {customerDetails?.LastName}</h2>

            <div>
              <Link to={`/dashboard/locations`}>
                <Button>
                    Service Locations
                </Button>
              </Link>

              <Link to={`/dashboard/devices`}>
                <Button className="ml-20">
                    Smart Devices
                </Button>
              </Link>

              <Link to={`/dashboard/prices`}>
                <Button className="ml-20">
                    Hourly Prices
                </Button>
              </Link>
            </div>
        </div>

        <div className="display-flex justify-content-center mb-10">
          <button onClick={this.handlePrevClick}>
              <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          
          <div className="ml-10">
              {monthYearString}
          </div>

          <button className="ml-10" onClick={this.handleNextClick} disabled={isNextButtonDisabled}>
              <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>

        <h4>Total Energy Cost: ${totalEnergyCost}</h4>

        <div className="mb-50">
          <EnergyCostsGraph
            labels={serviceLocations}
            energyCosts={energyCosts}
          />
        </div>

        <h4>Total Energy Consumption: {totalEnergyConsumption} kWh</h4>

        <div className="mb-50">
          <EnergyConsumptionChart
            labels={serviceLocations}
            energyConsumptions={energyConsumptions}
            averageConsumptions={averageConsumptions}
          />
        </div>
        
        <div className="width-50 mb-10">
          <DeviceConsumptionGraph
            labels={deviceLabels}
            data={deviceConsumptions}
          />
        </div>

        <div className="display-flex justify-content-center">
          <button onClick={this.handlePrevClick}>
              <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          
          <div className="ml-10">
              {monthYearString}
          </div>

          <button className="ml-10" onClick={this.handleNextClick} disabled={isNextButtonDisabled}>
              <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>

      </div>
    );
  }
}

export default Dashboard;