import { useMemo, useState } from "react";
import styled from "styled-components";

interface ReadMoreButtonProps {
  readonly children: string;
}

const ReadMoreButton = ({ children }: ReadMoreButtonProps) => {
  const [showMore, setShowMore] = useState(false);

  const shouldTruncate = useMemo(
    () => children.length > 250,
    [children]
  );

  const shortenedText = useMemo(() => {
    if (!shouldTruncate || showMore) return children;
    return children.slice(0, 250);
  }, [children, shouldTruncate, showMore]);

  if (!shouldTruncate) {
    return <ReadMoreWrapper>{children}</ReadMoreWrapper>;
  }

  return (
    <ReadMoreWrapper>
      <div className="content-container">
        {showMore ? children : shortenedText}
        <button
          type="button"
          onClick={() => setShowMore((prev) => !prev)}
          className="read-more-text standardized-button"
        >
          {showMore ? "Show Less" : "Read More"}
        </button>
      </div>
    </ReadMoreWrapper>
  );
};

const ReadMoreWrapper = styled.div`
  .read-more-text {
    max-width: 12rem;
    margin: 1rem auto;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export default ReadMoreButton;
