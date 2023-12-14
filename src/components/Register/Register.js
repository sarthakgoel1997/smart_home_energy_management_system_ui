import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import "./Register.css";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        first_name: '',
        last_name: '',
        phone_number: '',

        email: '',
        password: '',

        unit_number: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        square_footage: '',
        bedrooms_count: '',

        isRegistered: false,
        error: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleRegister = async () => {
    const { first_name, last_name, phone_number, email, password, unit_number, street, city, state, zipcode, country, square_footage, bedrooms_count } = this.state;

    if(first_name === "" || last_name === "" || phone_number === "" || email === "" || unit_number === "" || unit_number === 0 || street === "" || city === "" || state === "" || zipcode === "" || country === "" || square_footage === "" || square_footage === 0 || bedrooms_count === "" || bedrooms_count === 0 || password === "") {
        this.setState({ isRegistered: false, error: "Please check fields with 0/empty values" });
        return;
    }

    const payload = {
        firstName: first_name,
        lastName: last_name,
        phoneNumber: phone_number,
        email: email,
        password: password,
        unitNumber: parseInt(unit_number),
        street: parseInt(street),
        city: city,
        state: state,
        zipcode: parseInt(zipcode),
        country: country,
        squareFootage: parseFloat(square_footage),
        bedroomsCount: parseInt(bedrooms_count)
    }

    try {
        const response = await axios.post(`http://localhost:8000/register`, payload);

        if (response.status === 200) {
            // Setting expiration time to 24 hours
            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

            localStorage.setItem('customerDetails', JSON.stringify(response.data.CustomerDetails));
            localStorage.setItem('expirationTime', expirationTime);

            this.setState({ isRegistered: true, error: ''});
        }
    } catch (error) {
        if (error?.response?.data?.message) {
            this.setState({ isRegistered: false, error: error.response.data.message });
        } else {
            alert('Something went wrong');
        }
    }
  };

  render() {
    const { first_name, last_name, phone_number, email, password, unit_number, street, city, state, zipcode, country, square_footage, bedrooms_count, isRegistered, error } = this.state;

    if (isRegistered) {
        // Redirect to the dashboard upon successful register
        return <Navigate to="/dashboard" />;
    }

    return (
      <div className='registerBody'>
        <h2 className='mb-20'>Register</h2>

        <form>
            <div className='flex-row-register'>
                <div className='mr-20'>
                    <div className='mb-20'>First Name</div>
                    <div className='mb-20'>Last Name</div>
                    <div className='mb-20'>Phone Number</div>
                    <div className='mb-20'>Email</div>
                    <div>Password</div>
                </div>

                <div className='mr-40'>
                    <div className='mb-13'>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={first_name}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className='mb-13'>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={last_name}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className='mb-13'>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={phone_number}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className='mb-13'>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </div>


                <div className='mr-20'>
                    <div className='mb-20'>Unit Number</div>
                    <div className='mb-20'>Street</div>
                    <div className='mb-20'>City</div>
                    <div className='mb-20'>State</div>
                    <div className='mb-20'>Zipcode</div>
                    <div className='mb-20'>Country</div>
                    <div className='mb-20'>Square Footage</div>
                    <div>Bedrooms Count</div>
                </div>

                <div>
                    <div className='mb-14'>
                        <input
                            type="number"
                            id="unit_number"
                            name="unit_number"
                            value={unit_number}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className='mb-14'>
                        <input
                            type="number"
                            id="street"
                            name="street"
                            value={street}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className='mb-14'>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className='mb-14'>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={state}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className='mb-14'>
                        <input
                            type="number"
                            id="zipcode"
                            name="zipcode"
                            value={zipcode}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className='mb-14'>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={country}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className='mb-14'>
                        <input
                            type="number"
                            id="square_footage"
                            name="square_footage"
                            value={square_footage}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            id="bedrooms_count"
                            name="bedrooms_count"
                            value={bedrooms_count}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </div>
            </div>

          <button type="button" onClick={this.handleRegister} className='mb-10 mt-20'>
            Register
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    );
  }
}

export default RegisterPage;