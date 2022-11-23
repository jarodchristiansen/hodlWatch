import { useEffect, useMemo, useState } from "react";

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
    <div>
      {!shouldShowReadMore && !showMore && <>{children}</>}

      {shouldShowReadMore && (
        <>
          {shortenedText}
          <h2 onClick={() => changeRender("More")}>Read More</h2>
        </>
      )}

      {!shouldShowReadMore && showMore && (
        <>
          {children} - <h2 onClick={() => changeRender("Less")}>Show Less</h2>
        </>
      )}
    </div>
  );
};

export default ReadMoreButton;
