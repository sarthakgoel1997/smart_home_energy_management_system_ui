import React, { Component } from "react";
import {Button} from "reactstrap";
import axios from "axios";
import "./ServiceLocations.css";
import Table from '../Table/Table';

class ServiceLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
        serviceLocations: [],
        
        new_unit_number: '',
        new_street: '',
        new_city: '',
        new_state: '',
        new_zipcode: '',
        new_country: '',
        new_square_footage: '',
        new_bedrooms_count: '',
        new_date_taken_over: '',
        new_occupants_count: '',
        save_error: '',
        save_success: '',

        edit_service_location_id: 0,
        edit_unit_number: '',
        edit_street: '',
        edit_city: '',
        edit_state: '',
        edit_zipcode: '',
        edit_country: '',
        edit_square_footage: '',
        edit_bedrooms_count: '',
        edit_date_taken_over: '',
        edit_occupants_count: '',
        edit_error: '',
        edit_success: '',

        delete_error: '',
        delete_success: ''
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

    try {
        const response = await axios.get(`http://localhost:8000/dashboard/getServiceLocations?customerId=${customerDetails.Id}`);
        this.setState({ serviceLocations: response.data.ServiceLocations, loading: false });
    } catch (error) {
        console.error(error);
        this.setState({ loading: false });
    }
  };
  
  componentDidMount() {
    this.fetchData();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveButtonClicked = async () => {
    this.setState({save_success: '', save_error: ''});

    const customerDetails = this.getCustomerDetails();
    if(!customerDetails) {
        alert("You are not logged in");
        window.location.href = "/";
    }
    const { new_unit_number, new_street, new_city, new_state, new_zipcode, new_country, new_square_footage, new_bedrooms_count, new_date_taken_over, new_occupants_count } = this.state;

    if(new_unit_number === "" || new_unit_number === 0 || new_street === "" || new_city === "" || new_state === "" || new_zipcode === "" || new_country === "" || new_square_footage === "" || new_square_footage === 0 || new_bedrooms_count === "" || new_bedrooms_count === 0 || new_date_taken_over === "" || new_occupants_count === "" || new_occupants_count === 0) {
        this.setState({ save_error: "Please check fields with 0/empty values" });
        return;
    }

    const payload = {
      CustomerId: customerDetails.Id,
      UnitNumber: parseInt(new_unit_number),
      Street: parseInt(new_street),
      City: new_city,
      State: new_state,
      Zipcode: parseInt(new_zipcode),
      Country: new_country,
      SquareFootage: parseFloat(new_square_footage),
      BedroomsCount: parseInt(new_bedrooms_count),
      DateTakenOver: new_date_taken_over,
      OccupantsCount: parseInt(new_occupants_count),
    }

    try {
        const response = await axios.post(`http://localhost:8000/dashboard/addServiceLocation`, payload);

        if (response.status === 200) {
          // Refresh data
          this.fetchData();
          this.setState({new_unit_number: '', new_street: '', new_city: '', new_state: '', new_zipcode: '', new_country: '', new_square_footage: '', new_bedrooms_count: '', new_date_taken_over: '', new_occupants_count: '', save_success: 'Service location added successfully!', save_error: ''})
        }
    } catch (error) {
        if (error?.response?.data) {
            this.setState({ save_error: error.response.data });
        } else {
            alert('Something went wrong');
        }
    }
  };

  deleteButtonClicked = async (serviceLocationId) => {
    const customerDetails = this.getCustomerDetails();
    if(!customerDetails) {
        alert("You are not logged in");
        window.location.href = "/";
    }

    try {
        const response = await axios.delete(`http://localhost:8000/dashboard/deleteServiceLocation?customerId=${customerDetails.Id}&serviceLocationId=${serviceLocationId}`);

        if (response.status === 200) {
          // Refresh data
          this.fetchData();
          this.setState({delete_success: 'Service location deleted successfully!', delete_error: ''})
        }
    } catch (error) {
        if (error?.response?.data?.message) {
            this.setState({ delete_success: '', delete_error: error.response.data.message });
        } else {
            alert('Something went wrong');
        }
    }
  };

  editButtonClicked = async (serviceLocation) => {
    const {edit_service_location_id} = this.state;

    if(edit_service_location_id === 0) {
      this.setState({edit_service_location_id: serviceLocation.Id, edit_unit_number: serviceLocation.UnitNumber, edit_street: serviceLocation.Street, edit_city: serviceLocation.City, edit_state: serviceLocation.State, edit_zipcode: serviceLocation.Zipcode, edit_country: serviceLocation.Country, edit_square_footage: serviceLocation.SquareFootage, edit_bedrooms_count: serviceLocation.BedroomsCount, edit_date_taken_over: serviceLocation.DateTakenOver, edit_occupants_count: serviceLocation.OccupantsCount});
    } else {
      this.setState({edit_service_location_id: 0, edit_unit_number: '', edit_street: '', edit_city: '', edit_state: '', edit_zipcode: '', edit_country: '', edit_square_footage: '', edit_bedrooms_count: '', edit_date_taken_over: '', edit_occupants_count: ''});
    }
  };

  updateButtonClicked = async () => {
    this.setState({edit_success: '', edit_error: ''});

    const customerDetails = this.getCustomerDetails();
    if(!customerDetails) {
        alert("You are not logged in");
        window.location.href = "/";
    }
    const { edit_unit_number, edit_street, edit_city, edit_state, edit_zipcode, edit_country, edit_square_footage, edit_bedrooms_count, edit_date_taken_over, edit_occupants_count, edit_service_location_id } = this.state;

    if(edit_unit_number === "" || edit_unit_number === 0 || edit_street === "" || edit_city === "" || edit_state === "" || edit_zipcode === "" || edit_country === "" || edit_square_footage === "" || edit_square_footage === 0 || edit_bedrooms_count === "" || edit_bedrooms_count === 0 || edit_date_taken_over === "" || edit_occupants_count === "" || edit_occupants_count === 0) {
        this.setState({ edit_error: "Please check fields with 0/empty values" });
        return;
    }

    const payload = {
      Id: edit_service_location_id,
      CustomerId: customerDetails.Id,
      UnitNumber: parseInt(edit_unit_number),
      Street: parseInt(edit_street),
      City: edit_city,
      State: edit_state,
      Zipcode: parseInt(edit_zipcode),
      Country: edit_country,
      SquareFootage: parseFloat(edit_square_footage),
      BedroomsCount: parseInt(edit_bedrooms_count),
      DateTakenOver: edit_date_taken_over,
      OccupantsCount: parseInt(edit_occupants_count),
    }

    try {
        const response = await axios.post(`http://localhost:8000/dashboard/updateServiceLocation`, payload);

        if (response.status === 200) {
          // Refresh data
          this.fetchData();
          this.setState({edit_service_location_id: 0, edit_unit_number: '', edit_street: '', edit_city: '', edit_state: '', edit_zipcode: '', edit_country: '', edit_square_footage: '', edit_bedrooms_count: '', edit_date_taken_over: '', edit_occupants_count: '', edit_success: 'Service location updated successfully!', edit_error: ''})
        }
    } catch (error) {
        if (error?.response?.data) {
            this.setState({ edit_error: error.response.data });
        } else {
            alert('Something went wrong');
        }
    }
  };

  render() {
    const { serviceLocations, new_unit_number, new_street, new_city, new_state, new_zipcode, new_country, new_square_footage, new_bedrooms_count, new_date_taken_over, new_occupants_count, save_error, save_success, delete_error, delete_success, edit_unit_number, edit_street, edit_city, edit_state, edit_zipcode, edit_country, edit_square_footage, edit_bedrooms_count, edit_date_taken_over, edit_occupants_count, edit_error, edit_success, edit_service_location_id } = this.state;

    const keys = ['UnitNumber', 'Street', 'City', 'State', 'Zipcode', 'Country', 'SquareFootage', 'DateTakenOver', 'BedroomsCount', 'OccupantsCount'];
    const headers = ['Unit Number', 'Street', 'City', 'State', 'Zipcode', 'Country', 'Square Footage', 'Date Taken Over', 'Bedrooms Count', 'Occupants Count'];

    return (
      <div className="margin-20">
        <h1>Service Locations</h1>

        <h3 className="mt-50">Active Service Locations</h3>
        <Table
            data = {serviceLocations?.filter(item => item.Active === 1)}
            keys = {keys}
            headers = {headers}
            edit_item_id = {edit_service_location_id}
            deleteButtonClicked = {this.deleteButtonClicked}
            editButtonClicked = {this.editButtonClicked}
        />
        
        {delete_error && <p style={{ color: 'red' }}>{delete_error}</p>}
        {delete_success && <p style={{ color: 'green' }}>{delete_success}</p>}

        <div className='flex-row'>
          <div>
            <h3 className="mt-50">Add Service Location</h3>
            <div className='mb-20'>Unit Number</div>
            <div className='mb-20'>Street</div>
            <div className='mb-20'>City</div>
            <div className='mb-20'>State</div>
            <div className='mb-20'>Zipcode</div>
            <div className='mb-20'>Country</div>
            <div className='mb-20'>Square Footage</div>
            <div className='mb-20'>Bedrooms Count</div>
            <div className='mb-20'>Date Taken Over</div>
            <div>Occupants Count</div>

            <Button className="button-margin" onClick={this.saveButtonClicked}>
              Save Location
            </Button>
            {save_error && <p style={{ color: 'red' }}>{save_error}</p>}
            {save_success && <p style={{ color: 'green' }}>{save_success}</p>}
          </div>

          <div className="mt-90">
            <div className='mb-14'>
              <input
                type="number"
                id="new_unit_number"
                name="new_unit_number"
                value={new_unit_number}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="new_street"
                name="new_street"
                value={new_street}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='mb-14'>
              <input
                type="text"
                id="new_city"
                name="new_city"
                value={new_city}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='mb-14'>
              <input
                type="text"
                id="new_state"
                name="new_state"
                value={new_state}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="new_zipcode"
                name="new_zipcode"
                value={new_zipcode}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='mb-14'>
              <input
                type="text"
                id="new_country"
                name="new_country"
                value={new_country}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="new_square_footage"
                name="new_square_footage"
                value={new_square_footage}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="new_bedrooms_count"
                name="new_bedrooms_count"
                value={new_bedrooms_count}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='mb-14'>
              <input
                type="text"
                id="new_date_taken_over"
                name="new_date_taken_over"
                value={new_date_taken_over}
                onChange={this.handleInputChange}
              />
            </div>

            <div>
              <input
                type="number"
                id="new_occupants_count"
                name="new_occupants_count"
                value={new_occupants_count}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="ml-100">
            <h3 className="mt-50">Edit Service Location</h3>
            <div className='mb-20'>Unit Number</div>
            <div className='mb-20'>Street</div>
            <div className='mb-20'>City</div>
            <div className='mb-20'>State</div>
            <div className='mb-20'>Zipcode</div>
            <div className='mb-20'>Country</div>
            <div className='mb-20'>Square Footage</div>
            <div className='mb-20'>Bedrooms Count</div>
            <div className='mb-20'>Date Taken Over</div>
            <div>Occupants Count</div>

            <Button className="button-margin" onClick={this.updateButtonClicked} disabled={edit_service_location_id === 0}>
              Update Location
            </Button>
            {edit_error && <p style={{ color: 'red' }}>{edit_error}</p>}
            {edit_success && <p style={{ color: 'green' }}>{edit_success}</p>}
          </div>

          <div className="mt-90">
            <div className='mb-14'>
              <input
                type="number"
                id="edit_unit_number"
                name="edit_unit_number"
                value={edit_unit_number}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="edit_street"
                name="edit_street"
                value={edit_street}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>

            <div className='mb-14'>
              <input
                type="text"
                id="edit_city"
                name="edit_city"
                value={edit_city}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>

            <div className='mb-14'>
              <input
                type="text"
                id="edit_state"
                name="edit_state"
                value={edit_state}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="edit_zipcode"
                name="edit_zipcode"
                value={edit_zipcode}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>

            <div className='mb-14'>
              <input
                type="text"
                id="edit_country"
                name="edit_country"
                value={edit_country}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="edit_square_footage"
                name="edit_square_footage"
                value={edit_square_footage}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="edit_bedrooms_count"
                name="edit_bedrooms_count"
                value={edit_bedrooms_count}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>

            <div className='mb-14'>
              <input
                type="text"
                id="edit_date_taken_over"
                name="edit_date_taken_over"
                value={edit_date_taken_over}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>

            <div>
              <input
                type="number"
                id="edit_occupants_count"
                name="edit_occupants_count"
                value={edit_occupants_count}
                onChange={this.handleInputChange}
                disabled={edit_service_location_id === 0}
              />
            </div>
          </div>
        </div>

        <h3 className="mt-50">Inactive Service Locations</h3>
        <Table
            data = {serviceLocations?.filter(item => item.Active === 0)}
            keys = {keys}
            headers = {headers}
            edit_item_id = {edit_service_location_id}
            deleteButtonClicked = {this.deleteButtonClicked}
            editButtonClicked = {this.editButtonClicked}
        />

      </div>
    );
  }
}

export default ServiceLocations;