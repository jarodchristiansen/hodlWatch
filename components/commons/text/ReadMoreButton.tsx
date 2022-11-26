import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../styles/Colors";

const ReadMoreButton = ({ children }) => {
  const [currentText, setCurrentText] = useState();
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (children.length > 250) {
      setShouldShowReadMore(true);
    }
  }, [children]);

  const shortenedText = useMemo(() => {
    if (!children) return "N/A";
    if (!shouldShowReadMore || showMore) return children;

    // .replace(/ /g, "")
    if (!showMore) {
      return children.slice(0, 250);
    }
  }, [shouldShowReadMore, children]);

  const changeRender = (step: string) => {
    // step === "Less" && setShowMore(false);

    if (step === "Less") {
      setShowMore(false);
      setShouldShowReadMore(true);
    }
    // step === "More" && setShowMore(true);
    if (step === "More") {
      setShowMore(true);
      setShouldShowReadMore(false);
    }
  };

  return (
    <ReadMoreWrapper>
      {!shouldShowReadMore && !showMore && <>{children}</>}

      {shouldShowReadMore && (
        <div className="content-container">
          {shortenedText}
          <h5 onClick={() => changeRender("More")} className="read-more-text">
            Read More
          </h5>
        </div>
      )}

      {!shouldShowReadMore && showMore && (
        <div className="content-container">
          {children}
          <h5 onClick={() => changeRender("Less")} className="read-more-text">
            Show Less
          </h5>
        </div>
      )}
    </ReadMoreWrapper>
  );
};

const ReadMoreWrapper = styled.div`
  .read-more-text {
    color: ${Colors.PrimaryButtonBackground};
  }

  .content-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export default ReadMoreButton;
