import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as widgetActions from 'redux/modules/alltests';
import {isLoaded, load as loadWidgets} from 'redux/modules/alltests';
import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';
import { LinkContainer } from 'react-router-bootstrap';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadWidgets());
    }
  }
}])
@connect(
  state => ({
    testlist: state.alltests.data,
    loading: state.alltests.loading
  }),
  {...widgetActions, initializeWithKey })
export default class Alltests extends Component {
  static propTypes = {
    testlist: PropTypes.array,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
  };

  state = {
    
  }

  render() {
    const {loading, testlist = []} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Alltests.scss');
    return (
      <div className={styles.alltests + ' container'}>
        {
          testlist.map((eachtest, ind) => {
            const {details = {}} = eachtest;
            return (
              <LinkContainer to={`/taketest/${eachtest._id}`}>
                <div key={ind} className={styles.eachtest}>
                    <div className={styles.testname}>{details.testName || 'No Test Name Provided'}</div>
                    <div className={styles.testdesc}>{details.testDesc || 'No Test Desc Provided'}</div>
                </div>
              </LinkContainer>
            );
          })
        }
      </div>
    );
  }
}

