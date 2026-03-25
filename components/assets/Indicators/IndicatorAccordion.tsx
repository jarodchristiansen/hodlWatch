import { useContext, useMemo } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { buildIndicatorChartSlots } from "./buildIndicatorChartSlots";
import type { IndicatorAccordionProps } from "./indicatorTypes";

function IndicatorScrollArrows() {
  const { scrollPrev, scrollNext } = useContext(VisibilityContext);

  return (
    <div className={"container"}>
      <button
        type="button"
        className={"pointer-link me-4"}
        aria-label="Scroll indicators left"
        onClick={() => scrollPrev()}
      >
        <FaArrowLeft size={24} color={"black"} aria-hidden />
      </button>

      <button
        type="button"
        className={"pointer-link ms-4"}
        aria-label="Scroll indicators right"
        onClick={() => scrollNext()}
      >
        <FaArrowRight size={24} color={"black"} aria-hidden />
      </button>
    </div>
  );
}

/**
 * Renders BTC/ETH on-chain indicator charts in a horizontal scroller.
 */
const IndicatorAccordion = ({
  timeQuery: _timeQuery = 90,
  id: _id,
  blockchainData,
}: IndicatorAccordionProps) => {
  const chartSlots = useMemo(() => {
    if (!blockchainData?.length) return [];
    return buildIndicatorChartSlots(blockchainData);
  }, [blockchainData]);

  return (
    <div className={"text-center w-100 accordion-container"}>
      <div className="indicator-accordion">
        <div className="accordion-header">Indicator Panel</div>
        <div className="accordion-body">
          <ScrollMenu
            Footer={IndicatorScrollArrows}
            transitionDuration={2500}
            transitionBehavior={"smooth"}
          >
            {chartSlots.map((slot) => (
              <div className={"px-2 py-3"} key={slot.id}>
                {slot.node}
              </div>
            ))}
          </ScrollMenu>
        </div>
      </div>
    </div>
  );
};

export default IndicatorAccordion;
export type { BlockChainData, IndicatorAccordionProps } from "./indicatorTypes";
