import { FontWeight, MediaQueries } from "@/styles/variables";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import styled from "styled-components";
import ExpandedChartModal from "../ExpandedChartModal";

const ChartContainer = ({ children, name = "chart" }) => {
  const chartRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScreenshot = () => {
    const chartContainer = chartRef.current;

    console.log("IN HANDLE SCREENSHOT");
    const screenshotOptions = {
      scale: 2, // Increase the scale for better image quality
      useCORS: true, // Enable cross-origin resource sharing
    };

    html2canvas(chartContainer, screenshotOptions).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, `${name}.png`);
      });
    });
  };

  const handleExpandChart = () => {
    setIsExpanded(true);
  };

  const handleCloseChart = () => {
    setIsExpanded(false);
  };

  return (
    <ChartContainerCustom>
      <div className="left-button-row">
        {/* <button onClick={handleScreenshot}>Save</button>
        <button onClick={handleExpandChart}>Expand</button> */}
        {/* <button onClick={handleScreenshot}>Save</button>
        <button onClick={handleScreenshot}>Save</button> */}
      </div>

      <div>
        {isExpanded && (
          <ExpandedChartModal isOpen={isExpanded} onClose={handleCloseChart}>
            <div ref={isExpanded ? chartRef : null}>
              <div className="left-button-row">
                <button onClick={handleScreenshot}>Save</button>
              </div>

              {children}
            </div>
          </ExpandedChartModal>
        )}

        <div ref={!isExpanded ? chartRef : null}>{children}</div>
      </div>
    </ChartContainerCustom>
  );
};

const ChartContainerCustom = styled.div`
  background-color: transparent;
  position: relative;

  .left-button-row {
    display: none;
    @media ${MediaQueries.MD} {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 6px;
      left: 8px;
    }
  }

  .label-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 12px;
    background: rgba(194, 191, 191, 0.1);

    h5 {
      padding-top: 8px;
      font-weight: ${FontWeight.bold};
    }
  }
`;

export default ChartContainer;
