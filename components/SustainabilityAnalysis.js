import React from "react";
import PropTypes from "prop-types";
import styles from "./SustainabilityAnalysis.module.css"; // Import the CSS module
import SustainabilityLoading from "./SustainabilityLoading";

const SustainabilityAnalysis = ({ analysis }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Increased time to show loading state
  }, []);

  if (isLoading) {
    return <SustainabilityLoading />;
  }

  const getColor = (percentage) => {
    if (percentage < 50) return styles.red; // Use styles from the module
    if (percentage < 75) return styles.orange; // Use styles from the module
    return styles.green; // Use styles from the module
  };

  const getEmoji = (percentage) => {
    if (percentage < 50) return "😟";
    if (percentage < 75) return "🙂";
    return "🌟";
  };

  const getParameterIcon = (key) => {
    const icons = {
      carbonFootprint: "🌍",
      ecoCertifications: "📜",
      energyEfficiency: "⚡",
      recyclability: "♻️",
      lifespan: "⏳",
      repairability: "🔧",
      packagingWaste: "📦",
    };
    return icons[key] || "📊";
  };

  const renderParameter = (label, value, unit, percentage) => (
    <div className={styles.parameter} key={label}>
      <h3 className={styles.parameterTitle}>
        {getParameterIcon(label.toLowerCase())} {label}
      </h3>
      <div className={styles.parameterContent}>
        <div className={styles["progress-bar"]}>
          {isLoading ? (
            <div className={styles.progressLoading}>
              <div className={styles.skeleton}>
                <div className={styles.skeletonShimmer}></div>
              </div>
            </div>
          ) : (
            <div
              className={`${styles.progress} ${getColor(percentage)}`}
              style={{
                width: `${percentage}%`,
                transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              data-value={`${percentage}%`}
            />
          )}
        </div>
        <div className={styles.scoreWrapper}>
          <span
            className={`${styles.score} ${isLoading ? styles.skeleton : ""}`}
          >
            {isLoading ? (
              <span className={styles.placeholderText}>&nbsp;</span>
            ) : (
              `${value} ${unit}`
            )}
          </span>
          <span className={styles.emoji}>
            {!isLoading && getEmoji(percentage)}
          </span>
        </div>
      </div>
      <p className={styles.scoreText}>
        Score:{" "}
        {isLoading ? (
          <span className={styles.skeleton}>
            <span className={styles.placeholderText}>&nbsp;&nbsp;&nbsp;</span>
          </span>
        ) : (
          `${percentage}%`
        )}
      </p>
    </div>
  );

  return (
    <div className={styles["analysis-results"]}>
      <div className={styles.card}>
        <h2 className={styles.title}>🌿 Sustainability Analysis</h2>
        <div className={styles["overall-score"]}>
          <h3>Overall Sustainability Score</h3>
          <div className={styles.scoreDisplay}>
            <span className={styles.scoreNumber}>
              {analysis.sustainabilityScore}
            </span>
            <span className={styles.scoreTotal}>/100</span>
            <span className={styles.scoreEmoji}>
              {getEmoji(analysis.sustainabilityScore)}
            </span>
          </div>
        </div>
        <div className={styles.parameters}>
          {Object.entries(analysis.parameters).map(([key, param]) =>
            renderParameter(
              key.charAt(0).toUpperCase() + key.slice(1),
              param.actual_value,
              param.unit,
              param.percentage_score
            )
          )}
        </div>
      </div>
    </div>
  );
};

SustainabilityAnalysis.propTypes = {
  analysis: PropTypes.object.isRequired,
};

export default SustainabilityAnalysis;
