import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
const styles = require('./Home.scss');

export default class Home extends Component {
  render() {
    return (
      <div className={styles.home} className="container">
        <form className="login-form col-sm-5">
          < h1 >< strong >Set up your team</strong> </h1 >
          <h4>Use Nugget to assess candidates for free.</h4>
          <div className={styles.bufferHeight}></div>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Company"/>
          </div>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Industry"/>
          </div>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="What's your role?"/>
          </div>
          <div className="form-group">
            <select className="form-control" ref="companySize">
              <option selected>How big is your company?</option>
              <option value="1">1-50</option>
              <option value="2">51-100</option>
              <option value="3">101-500</option>
              <option value="4">500+</option>
            </select>
          </div>
          <LinkContainer to="/register">
              <button className="btn btn-primary">Continue</button>
          </LinkContainer>
          <div className={styles.toggleText}> Already have an account ? <LinkContainer to="/register/login"><span>Login</span></LinkContainer></div>
        </form>
      </div>
    );
  }
}
