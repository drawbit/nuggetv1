import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

const bufferHeight = {
  height: '40px'
};
@connect(
  state => ({
    user: state.auth.user,
    status: state.auth.status
  }),
  authActions)

export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    register: PropTypes.func,
    logout: PropTypes.func,
    signin: PropTypes.func,
    status: PropTypes.object,
    routeParams: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      showRegister: true,
      formerrors: {}
    };
  }

  componentDidMount() {
    const { routeParams: {islogin}} = this.props;
    if (islogin === 'login') {
      this.setState({showRegister: false});
    }
  }

  handleRegister = (event) => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const name = this.refs.name.value;
    const accounttype = this.refs.accounttype.value;
    const errors = {};

    if (name.length < 3 || name.indexOf('asds') !== -1 ) {
      errors.name = 'Name is too short / Invalid name';
    }
    if (!email.length || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Not a valid email';
    }
    if (password.length < 5) {
      errors.password = 'Min password length is 5';
    }
    if (['1', '2'].indexOf(accounttype) === -1) {
      errors.accounttype = 'Please select an account type';
    }
    if (Object.keys(errors).length) {
      this.setState({
        formerrors: errors
      });
      return false;
    } else {
      this.setState({
        formerrors: {}
      });
    }
    this.props.register({email, password, name, accounttype});
  }

  handleSignin = (event) => {
    event.preventDefault();
    const email = this.refs.mail.value;
    const password = this.refs.password1.value;
    this.props.signin({email, password});
  }

  render() {
    const {user, logout, status = {}} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage} className="container">
        <Helmet title="Login"/>
        {!user && this.state.showRegister &&
        <div>
          
          <form className="login-form col-sm-5" onSubmit={this.handleRegister}>
            < h1 >< strong >Tell us about yourself</strong> </h1 >
            <h4>Own your personal space.</h4>
            <div style={bufferHeight}></div>
            <div className="form-group">
              <input type="text" ref="name" placeholder="Enter your Name" className="form-control"/>
              {this.state.formerrors.name}
            </div>
            <div className="form-group">
              <input type="text" ref="email" placeholder="Enter a email" className="form-control"/>
              {this.state.formerrors.email}
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="Enter a password" className="form-control"/>
              {this.state.formerrors.password}
            </div>
            <div className="form-group">
              <select ref="accounttype" className="form-control">
                <option defaultValue>Account Type</option>
                <option value="1">Employer</option>
                <option value="2">Test Taker</option>
              </select>
              {this.state.formerrors.accounttype}
            </div>
            <button className="btn btn-primary" onClick={this.handleRegister}><i className="fa fa-sign-in"/>
              Get Started
            </button>
            <div className={styles.toggleText}> Already have an account? <span onClick={() => this.setState({showRegister: false})}>Login</span> </div>
            <div className={status.error ? styles.feedback : styles.green}>{status.message}</div>
          </form>
        </div>
        }
        {!user && !this.state.showRegister &&
        <div>
          <form className="login-form col-md-4" onSubmit={this.handleSignin}>
            < h1 > Login </h1>
            <div className="form-group">
              <input type="email" ref="mail" placeholder="Enter your email" className="form-control" autoComplete="on"/>
            </div>
            <div className="form-group">
              <input type="text" ref="password1" placeholder="Enter a password" className="form-control"/>
            </div>
            <button className="btn btn-primary" onClick={this.handleSignin}><i className="fa fa-sign-in"/>
              Sign In
            </button>
            <div className={styles.toggleText}> Don't have an account? <span onClick={() => this.setState({showRegister: true})}> Register</span> </div>
            <div className={status.error ? styles.feedback : styles.green}>{status.message}</div>
           </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
          <h1> Account Details </h1>
          <div className="card">
            <img className="card-img-top" src="https://iffhs.de/wp-content/uploads/2017/12/lionel-messi.jpg" alt="ProfilePic" style={{width: 150, height: 150}}/>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text"> Your account type is <strong>{user.account_type === 1 ? ' Emploter' : 'Test Taker'}</strong> . Thank you for registering with us</p>
              <a href="#" onClick={logout} className="btn btn-primary" >Log out</a>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}
