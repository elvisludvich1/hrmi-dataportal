/**
 *
 * CountryReport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';

import { Heading, Box } from 'grommet';

import CountrySummaryChart from 'components/CountrySummaryChart';
import CountryNarrative from 'components/CountryNarrative';
import messages from './messages';

const Styled = styled(Box)`
  margin: 0 auto;
  max-width: 1000px;
`;

function CountryReport({
  countryTitle,
  dimensions,
  rights,
  scale,
  benchmark,
  indicators,
  country,
  onMetricClick,
}) {
  return (
    <Styled pad="medium">
      <Heading level={2}>
        <FormattedMessage
          {...messages.title}
          values={{
            country: countryTitle,
          }}
        />
      </Heading>
      <CountrySummaryChart
        scale={scale}
        dimensions={dimensions}
        rights={rights}
        benchmark={benchmark}
      />
      <CountryNarrative
        dimensions={dimensions}
        rights={rights}
        indicators={indicators}
        country={country}
        benchmark={benchmark}
        onMetricClick={onMetricClick}
      />
    </Styled>
  );
}

CountryReport.propTypes = {
  countryTitle: PropTypes.string,
  onMetricClick: PropTypes.func,
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default CountryReport;
