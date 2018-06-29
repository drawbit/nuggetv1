import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as timeInfo } from '../../redux/modules/info';
import { isLoaded as isAuthLoaded, load as getAuth, logout } from '../../redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(timeInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(getAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/login');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className={styles.brand}/>
                <span>Nugget</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              {user && user.account_type === 1 && <LinkContainer to="/createtest">
                <NavItem eventKey={1}>Create Test</NavItem>
              </LinkContainer>}
              {user && user.account_type === 2 && <LinkContainer to="/taketest/9876562">
                <NavItem eventKey={5}>Take Test</NavItem>
              </LinkContainer>}
              {<LinkContainer to="/alltests">
                <NavItem eventKey={5}>Shared Tests</NavItem>
              </LinkContainer>}
            </Nav>
            <Nav pullRight>
              {user && user.account_type === 1 && <LinkContainer to="/createtest">
                <button eventKey={1} className="btn btn-info"> Invite <i className="fa fa-plus"/></button>
              </LinkContainer>}
              {user && user.account_type === 1 && <LinkContainer to="/createtest">
                <button eventKey={1} className="btn btn-success"> Upgrade </button>
              </LinkContainer>}
              <LinkContainer to="/register">
                <NavItem eventKey={6}>{ user ? `Logged in as ${user.name}` : 'Register/Login' }</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>

        { /* 
          <Navbar fixedBottom>
          <Nav>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/">Terms and Conditions</Link>
            </NavItem>
            <NavItem>
              <Link to="/">Privacy Policy</Link>
            </NavItem>
            <NavItem>
              <Link to="/">Logout</Link>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <Link to="">&copy; 2018 Nugget.ai Corp</Link>
            </NavItem>
          </Nav>
        </Navbar>
      */
      }

      </div>
    );
  }
}
