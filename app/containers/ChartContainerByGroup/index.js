/**
 *
 * ChartContainerByGroup
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';

import { BENCHMARKS } from 'containers/App/constants';
import {
  getStandardSearch,
  getESRScoresForCountry,
  getESRIndicatorScoresForCountry,
  getIndicatorInfo,
  getESRYear,
  getRawSearch,
  getBenchmarkSearch,
} from 'containers/App/selectors';
import { loadDataIfNeeded, setRaw } from 'containers/App/actions';

import ChartCountryMetricByGroup from 'components/ChartCountryMetricByGroup';

import getMetricDetails from 'utils/metric-details';

const getColour = metric => {
  if (metric.metricType === 'dimensions') {
    return metric.key;
  }
  if (metric.metricType === 'rights') {
    return metric.dimension;
  }
  return 'esr';
};

const DEPENDENCIES = [
  'countries',
  'esrIndicators',
  'esrScores',
  'esrIndicatorScores',
];

export function ChartContainerByGroup({
  metricCode,
  scores,
  onLoadData,
  standard,
  theme,
  raw,
  onRawChange,
  metricInfo,
  currentYear,
  benchmark,
}) {
  useEffect(() => {
    onLoadData();
  }, []);

  const metric = getMetricDetails(metricCode);
  // prettier-ignore
  return (
    <ChartCountryMetricByGroup
      color="esr"
      colorHint={theme.global.colors[`${getColour(metric)}Dark`]}
      scores={scores}
      metric={metric}
      metricInfo={metricInfo}
      standard={standard}
      percentage
      maxValue={100}
      hasRawOption={false}
      raw={raw}
      onRawChange={onRawChange}
      currentYear={currentYear}
      currentBenchmark={BENCHMARKS.find(s => s.key === benchmark)}
    />
  );
}

ChartContainerByGroup.propTypes = {
  currentYear: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  standard: PropTypes.string,
  onLoadData: PropTypes.func,
  metricCode: PropTypes.string.isRequired,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  metricInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  theme: PropTypes.object,
  raw: PropTypes.bool,
  onRawChange: PropTypes.func,
  benchmark: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentYear: state => getESRYear(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  scores: (state, { countryCode, metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'dimensions' || metric.metricType === 'rights') {
      return getESRScoresForCountry(state, {
        countryCode,
        metric,
      });
    }
    if (metric.metricType === 'indicators') {
      return getESRIndicatorScoresForCountry(state, {
        countryCode,
        metric,
      });
    }
    return false;
  },
  metricInfo: (state, { metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'indicators') {
      return getIndicatorInfo(state, metric.code);
    }
    return false;
  },
  raw: state => getRawSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onRawChange: value => {
      dispatch(setRaw(value));
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(ChartContainerByGroup));
