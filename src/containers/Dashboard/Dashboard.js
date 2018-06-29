import React, { Component } from 'react';
import { Thumbnail, Col, Row, Grid } from 'react-bootstrap';
import { Modal, Button, Image } from 'react-bootstrap';
import CardSettings from '../../components/CardSettings/CardSettings.js'; 
const styles = require('./Dashboard.scss');

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false
    };
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleHide() {
    this.setState({
      show: false
    });
  }
  render() {
    return (
      <div className={styles.dashboard + 'container'}> 
        <Grid>
          <Row>
            <Col xs={6} md={4}>
              <button className="btn btn-info" onClick={this.handleShow}>Create New</button>
            </Col>
            <br/><br/><br/>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <Thumbnail src="./images/cover.png" alt="">
                <h3>Getting started</h3>
                <Row>
                  <Col xs={6}>
                    <p><small>May 15, 2018</small></p>
                  </Col>
                  <Col xs={6} className="pull-right">
                    <CardSettings />
                  </Col>
                </Row>
              </Thumbnail>
            </Col>
            <Col xs={12} md={4}>
              <Thumbnail src="./images/cover.png" alt="">
                <h3>Product Marketing Intern</h3>
                <Row>
                  <Col xs={6}>
                    <p><small>May 22, 2018</small></p>
                  </Col>
                  <Col xs={6} className="pull-right">
                    <CardSettings />
                  </Col>
                </Row>
              </Thumbnail>
            </Col>
          </Row>
        </Grid>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <h4 className="text-center">How do you want to create?</h4>
            <Row>
              <Col xs={6} xsOffset={3}>
                <br/><br/>
                <Image src="./images/corporate.png" className="modal-1-image" alt="explainer image" responsive />
                <br/><br/>
              </Col>
            </Row>
            <Row>
              <Col xs={6} className="text-center">
                <Button className="btn btn-primary" onClick={this.handleShow} href="/createTest">Pre-Built Assessment</Button>
              </Col>
              <Col xs={6} className="text-center">
                <Button className="btn btn-primary" href="/create">Create Your Own</Button>
              </Col>
            </Row>
            <Row>
              <Col xs={6} className="text-center">
                <p><strong><br/>For a quick fix.</strong> Assessments with a proven track record to deliver on results.</p>
              </Col>
              <Col xs={6} className="text-center">
                <p><strong><br/>For experienced recruiters.</strong> Add your content, control the look and feel and customize fields.</p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    ); 
  }
}

export default Dashboard;
