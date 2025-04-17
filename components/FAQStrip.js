import React, { useState } from "react";
import styles from "@/styles/landing.module.css";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FAQStrip = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className={styles.FAQStrip} onClick={() => setShowAnswer(!showAnswer)}>
      <div className={styles.FAQQues}>{question}</div>
      <div className={styles.toggleFAQ}>
        <FontAwesomeIcon
          size={"xs"}
          icon={showAnswer ? faAngleUp : faAngleDown}
        />
      </div>
      {showAnswer && <div className={styles.FAQAnswer}>{answer}</div>}
    </div>
  );
};

export default FAQStrip;
