import React, { Component } from 'react';
import axios from 'axios';
import "./Login.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      error: '',
    };
  }

  componentDidMount() {
    // Remove all user auth keys from local storage
    localStorage.removeItem('customerDetails');
    localStorage.removeItem('expirationTime');
    this.setState({ isLoggedIn: false });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = async () => {
    const { email, password } = this.state;

    if(email === "" || password === "") {
        this.setState({ isLoggedIn: false, error: "Email or password cannot be empty" });
        return;
    }

    const payload = {
        email: email,
        password: password
    }

    try {
      const response = await axios.post(`http://localhost:8000/login`, payload);

      if (response.status === 200) {
        // Setting expiration time to 24 hours
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

        localStorage.setItem('customerDetails', JSON.stringify(response.data.CustomerDetails));
        localStorage.setItem('expirationTime', expirationTime);

        this.setState({ isLoggedIn: true, error: ''});
      }
    } catch (error) {
        if (error?.response?.data?.message) {
          this.setState({ isLoggedIn: false, error: error.response.data.message });
        } else {
          alert('Something went wrong');
        }
    }
  };

  render() {
    const { email, password, isLoggedIn, error } = this.state;

    if (isLoggedIn) {
        // Redirect to the dashboard upon successful login
        window.location.href = '/dashboard';
    }

    return (
      <div className='loginBody'>
        <h2 className='mb-20'>Login</h2>
        <form>
        <div className='flex-row-login'>
          <div className='mr-20'>
            <div className='mb-20'>Email</div>
            <div>Password</div>
          </div>
            <div className='mr-40'>
              <div className='mb-10'>
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
          </div>

          <button type="button" onClick={this.handleLogin} className='mt-20 mb-20'>
            Login
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    );
  }
}

export default LoginPage;