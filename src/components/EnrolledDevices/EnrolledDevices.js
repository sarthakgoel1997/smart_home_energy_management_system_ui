import React, { Component } from "react";
import {Button} from "reactstrap";
import axios from "axios";
import "./EnrolledDevices.css";
import Table from '../Table/Table';
import SearchableDropdown from '../SearchableDropdown/SearchableDropdown';

class EnrolledDevices extends Component {
  constructor(props) {
    super(props);
    this.state = {
        serviceLocations: [],
        enrolledDevices: [],
        devices: [],
        
        new_service_location_id: '',
        new_device_type: '',
        new_device_id: '',
        new_alias_name: '',
        new_room_number: '',
        save_error: '',
        save_success: '',

        edit_enrolled_device_id: 0,
        edit_service_location_id: '',
        edit_device_type: '',
        edit_device_id: '',
        edit_alias_name: '',
        edit_room_number: '',
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
        const response = await axios.get(`http://localhost:8000/dashboard/getEnrolledDevices?customerId=${customerDetails.Id}`);
        this.setState({ enrolledDevices: response.data.EnrolledDevices, serviceLocations: response.data.ServiceLocations, devices: response.data.Devices, loading: false });
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
    const { new_service_location_id, new_device_id, new_alias_name, new_room_number } = this.state;

    if(new_service_location_id === "" || new_service_location_id === 0 || new_device_id === "" || new_device_id === 0 || new_alias_name === "" || new_room_number === "" || new_room_number === 0) {
        this.setState({ save_error: "Please check fields with 0/empty values" });
        return;
    }

    const payload = {
      CustomerId: customerDetails.Id,
      ServiceLocationId: parseInt(new_service_location_id),
      DeviceId: parseInt(new_device_id),
      AliasName: new_alias_name,
      RoomNumber: parseInt(new_room_number),
    }

    try {
        const response = await axios.post(`http://localhost:8000/dashboard/addEnrolledDevice`, payload);

        if (response.status === 200) {
          // Refresh data
          this.fetchData();
          this.setState({new_service_location_id: '', new_device_type: '', new_device_id: '', new_alias_name: '', new_room_number: '', save_success: 'Smart Device added successfully!', save_error: ''})
        }
    } catch (error) {
        if (error?.response?.data) {
            this.setState({ save_error: error.response.data });
        } else {
            alert('Something went wrong');
        }
    }
  };

  deleteButtonClicked = async (enrolledDeviceId) => {
    const customerDetails = this.getCustomerDetails();
    if(!customerDetails) {
        alert("You are not logged in");
        window.location.href = "/";
    }

    try {
        const response = await axios.delete(`http://localhost:8000/dashboard/deleteEnrolledDevice?customerId=${customerDetails.Id}&enrolledDeviceId=${enrolledDeviceId}`);

        if (response.status === 200) {
          // Refresh data
          this.fetchData();
          this.setState({delete_success: 'Enrolled device deleted successfully!', delete_error: ''})
        }
    } catch (error) {
        if (error?.response?.data) {
            this.setState({ delete_success: '', delete_error: error.response.data });
        } else {
            alert('Something went wrong');
        }
    }
  };

  editButtonClicked = async (enrolledDevice) => {
    const {edit_enrolled_device_id} = this.state;

    if(edit_enrolled_device_id === 0) {
      this.setState({edit_enrolled_device_id: enrolledDevice.Id, edit_service_location_id: enrolledDevice.ServiceLocationId, edit_device_type: enrolledDevice.DeviceType, edit_device_id: enrolledDevice.DeviceId, edit_alias_name: enrolledDevice.AliasName, edit_room_number: enrolledDevice.RoomNumber});
    } else {
      this.setState({edit_enrolled_device_id: 0, edit_service_location_id: '', edit_device_type: '', edit_device_id: '', edit_alias_name: '', edit_room_number: ''});
    }
  };

  updateButtonClicked = async () => {
    this.setState({edit_success: '', edit_error: ''});

    const customerDetails = this.getCustomerDetails();
    if(!customerDetails) {
        alert("You are not logged in");
        window.location.href = "/";
    }
    const { edit_enrolled_device_id, edit_service_location_id, edit_device_id, edit_alias_name, edit_room_number } = this.state;

    if(edit_service_location_id === "" || edit_service_location_id === 0 || edit_device_id === "" || edit_device_id === 0 || edit_alias_name === "" || edit_room_number === "" || edit_room_number === 0) {
        this.setState({ edit_error: "Please check fields with 0/empty values" });
        return;
    }

    const payload = {
        CustomerId: customerDetails.Id,
        Id: edit_enrolled_device_id,
        ServiceLocationId: parseInt(edit_service_location_id),
        DeviceId: parseInt(edit_device_id),
        AliasName: edit_alias_name,
        RoomNumber: parseInt(edit_room_number),
    }

    try {
        const response = await axios.post(`http://localhost:8000/dashboard/updateEnrolledDevice`, payload);

        if (response.status === 200) {
          // Refresh data
          this.fetchData();
          this.setState({edit_enrolled_device_id: 0, edit_service_location_id: '', edit_device_type: '', edit_device_id: '', edit_alias_name: '', edit_room_number: '', edit_success: 'Enrolled device updated successfully!', edit_error: ''})
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
    const { serviceLocations, enrolledDevices, devices, new_service_location_id, new_device_type, new_device_id, new_alias_name, new_room_number, save_error, save_success, delete_error, delete_success, edit_service_location_id, edit_device_type, edit_device_id, edit_alias_name, edit_room_number, edit_error, edit_success, edit_enrolled_device_id } = this.state;

    const keys = ['Device', 'ServiceLocation', 'AliasName', 'RoomNumber'];
    const headers = ['Device', 'Service Location', 'Alias Name', 'Room Number'];


    const uniqueTypes = new Set(devices.map(item => item.Type));
    const deviceTypes = [...uniqueTypes].map(type => ({ Type: type }));

    return (
      <div className="margin-20">
        <h1>Smart Devices</h1>

        <h3 className="mt-50">Active Smart Devices</h3>
        <Table
            data = {enrolledDevices?.filter(item => item.Active === 1)}
            keys = {keys}
            headers = {headers}
            edit_item_id = {edit_enrolled_device_id}
            deleteButtonClicked = {this.deleteButtonClicked}
            editButtonClicked = {this.editButtonClicked}
        />
        
        {delete_error && <p style={{ color: 'red' }}>{delete_error}</p>}
        {delete_success && <p style={{ color: 'green' }}>{delete_success}</p>}
        


        <div className='flex-row'>
          <div>
            <h3 className="mt-50">Add Smart Device</h3>
            <div className='mb-20'>Service Location</div>
            <div className='mb-30'>Device Type</div>
            <div className='mb-20'>Device Model Number</div>
            <div className='mb-20'>Alias Name</div>
            <div>Room Number</div>

            <Button className="button-margin" onClick={this.saveButtonClicked}>
              Save Device
            </Button>
            {save_error && <p style={{ color: 'red' }}>{save_error}</p>}
            {save_success && <p style={{ color: 'green' }}>{save_success}</p>}
          </div>

          <div className="mt-90">
            <SearchableDropdown
              options={serviceLocations?.filter(item => item.Active === 1)}
              label="LocationLabel"
              id="Id"
              selectedVal={new_service_location_id}
              handleChange={(val) => {this.setState({ new_service_location_id: val })}}
            />
            
            <div className="mt-10">
              <SearchableDropdown
                  options={deviceTypes}
                  label="Type"
                  id="Type"
                  selectedVal={new_device_type}
                  handleChange={(val) => {this.setState({ new_device_type: val })}}
              />
            </div>

            <div className="mt-10">
              <SearchableDropdown
                options={devices?.filter(item => item.Type === new_device_type)}
                label="DeviceName"
                id="Id"
                selectedVal={new_device_id}
                handleChange={(val) => {this.setState({ new_device_id: val })}}
              />
            </div>

            <div className='mb-14 mt-10'>
              <input
                type="text"
                id="new_alias_name"
                name="new_alias_name"
                value={new_alias_name}
                onChange={this.handleInputChange}
                className="width-100"
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="new_room_number"
                name="new_room_number"
                value={new_room_number}
                onChange={this.handleInputChange}
                className="width-100"
              />
            </div>
          </div>

          

          <div className="ml-100">
            <h3 className="mt-50">Edit Smart Device</h3>
            <div className='mb-20'>Service Location</div>
            <div className='mb-30'>Device Type</div>
            <div className='mb-20'>Device Model Number</div>
            <div className='mb-20'>Alias Name</div>
            <div>Room Number</div>

            <Button className="button-margin" onClick={this.updateButtonClicked} disabled={edit_enrolled_device_id === 0}>
              Update Device
            </Button>
            {edit_error && <p style={{ color: 'red' }}>{edit_error}</p>}
            {edit_success && <p style={{ color: 'green' }}>{edit_success}</p>}
          </div>

          <div className="mt-90">
            <SearchableDropdown
                options={serviceLocations?.filter(item => item.Active === 1)}
                label="LocationLabel"
                id="Id"
                selectedVal={edit_service_location_id}
                handleChange={(val) => {this.setState({ edit_service_location_id: val });}}
                disabled={true}
            />
            
            <div className="mt-10">
              <SearchableDropdown
                options={deviceTypes}
                label="Type"
                id="Type"
                selectedVal={edit_device_type}
                handleChange={(val) => {this.setState({ edit_device_type: val })}}
              />
            </div>

            <div className="mt-10">
              <SearchableDropdown
                options={devices?.filter(item => item.Type === edit_device_type)}
                label="DeviceName"
                id="Id"
                selectedVal={edit_device_id}
                handleChange={(val) => {this.setState({ edit_device_id: val })}}
              />
            </div>

            <div className='mb-14 mt-10'>
              <input
                type="text"
                id="edit_alias_name"
                name="edit_alias_name"
                value={edit_alias_name}
                onChange={this.handleInputChange}
                className="width-100"
                disabled={edit_enrolled_device_id === 0}
              />
            </div>

            <div className='mb-14'>
              <input
                type="number"
                id="edit_room_number"
                name="edit_room_number"
                value={edit_room_number}
                onChange={this.handleInputChange}
                className="width-100"
                disabled={edit_enrolled_device_id === 0}
              />
            </div>
          </div>
        </div>

        <h3 className="mt-50">Inactive Smart Devices</h3>
        <Table
            data = {enrolledDevices?.filter(item => item.Active === 0)}
            keys = {keys}
            headers = {headers}
            edit_item_id = {edit_enrolled_device_id}
            deleteButtonClicked = {this.deleteButtonClicked}
            editButtonClicked = {this.editButtonClicked}
        />

      </div>
    );
  }
}

export default EnrolledDevices;