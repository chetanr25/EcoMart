import React from 'react';
import PropTypes from 'prop-types';
import styles from './SustainabilityAnalysis.module.css'; // Import the CSS module

const SustainabilityAnalysis = ({ analysis }) => {
  const getColor = (percentage) => {
    if (percentage < 50) return styles.red; // Use styles from the module
    if (percentage < 75) return styles.orange; // Use styles from the module
    return styles.green; // Use styles from the module
  };

  const renderParameter = (label, value, unit, percentage) => (
    <div className={styles.parameter} key={label}>
      <h3 className="font-semibold">{label}</h3>
      <div className="flex items-center">
        <div className={styles['progress-bar']}>
          <div
            className={`${styles.progress} ${getColor(percentage)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={styles.score}>{value} {unit}</span>
      </div>
      <p className="text-sm text-gray-600">Score: {percentage}%</p>
    </div>
  );

  return (
    <div className={styles['analysis-results']}>
      <h2>Sustainability Analysis</h2>
      {Object.entries(analysis.parameters).map(([key, param]) =>
        renderParameter(
          key.charAt(0).toUpperCase() + key.slice(1),
          param.actual_value,
          param.unit,
          param.percentage_score
        )
      )}
      <div className={styles['overall-score']}>
        <h3>Overall Sustainability Score</h3>
        <div>
          {analysis.sustainabilityScore}/100
        </div>
      </div>
    </div>
  );
};

SustainabilityAnalysis.propTypes = {
  analysis: PropTypes.object.isRequired,
};

export default SustainabilityAnalysis; 