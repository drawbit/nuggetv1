import React, {Component, PropTypes} from 'react';
import Accordion from 'react-responsive-accordion';

import * as assesmentActions from 'redux/modules/assesmentReducer';
import {load as loadAssesment} from 'redux/modules/assesmentReducer';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {Canvas} from 'components';


@asyncConnect([{
  deferred: true,
  promise: ({params, store: {dispatch}}) => {
    // if (!isLoaded(getState())) {
    return dispatch(loadAssesment(params));
    // }
  }
}])
@connect(
  state => ({
    testDetails: state.assesments.testDetails,
    loading: state.assesments.loading
  }),
  {...assesmentActions})
export default class TakeTest extends Component {
  static propTypes = {
    testDetails: PropTypes.object,
    routeParams: PropTypes.object,
    clearTestDetails: PropTypes.func
  };

  state = {
    
  }

  render() {
    const {testDetails, routeParams: { testid }} = this.props;
    const { details } = testDetails || {details: {}};
    const {cards = [{details: 'No card details provided'}]} = details;
    const styles = require('./TakeTest.scss');
    return (
      testid ? 
        (<div className="container">
          <div className={styles.testTitle}>{details.testName || 'No Name Provided'}</div>
          <div className={styles.testDesc}>{details.testDesc || 'No Desc Provided' }</div>
          <div className={styles.cardContainer}>
            <Accordion>
            {
              cards.map((card, ind) => {
                return (
                  <div key={ind} data-trigger={<div className={styles.cardheader}>Card{ind + 1}</div>}>
                    <div className={styles.cardbody}>{card.details || 'No card details provided'}</div>
                  </div>
                );
              })
            }
            </Accordion>
          </div>
        <div className={styles.canvasContainer}><Canvas/></div>
        </div>) : (<div>Nothing to show </div>)
    );
  }
}
