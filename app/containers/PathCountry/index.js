/**
 *
 * Country
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import rootMessages from 'messages';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import H1 from 'styled/H1';
import {
  getDimensionsForCountry,
  getRightsForCountry,
  getIndicatorsForCountry,
} from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function PathCountry(props) {
  useInjectReducer({ key: 'country', reducer });
  useInjectSaga({ key: 'country', saga });
  return (
    <div>
      <H1>
        {props.match.params.country && (
          <FormattedMessage
            {...rootMessages.countries[props.match.params.country]}
          />
        )}
      </H1>
      <div>Dimensions</div>
      <div>CPR: {props.dimensions && props.dimensions.cpr.length}</div>
      <div>ESR: {props.dimensions && props.dimensions.esr.length}</div>
      <div>Rights</div>
      <div>CPR: {props.rights && props.rights.cpr.length}</div>
      <div>ESR: {props.rights && props.rights.esr.length}</div>
      <div>Indicators</div>
      <div>ESR: {props.indicators && props.indicators.length}</div>
    </div>
  );
}

PathCountry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  indicators: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  indicators: (state, { match }) =>
    getIndicatorsForCountry(state, match.params.country),
  rights: (state, { match }) =>
    getRightsForCountry(state, match.params.country),
  dimensions: (state, { match }) =>
    getDimensionsForCountry(state, match.params.country),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PathCountry);
