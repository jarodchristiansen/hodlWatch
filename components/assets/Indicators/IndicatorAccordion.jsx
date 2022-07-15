import { Accordion } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const IndicatorAccordion = () => {
  useEffect(() => {
    console.log("useEffect firing!");
  }, []);

  const renderArrows = () => {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return (
      <div className={"container"}>
        <FaArrowLeft
          size={24}
          color={"black"}
          className={"pointer-link me-4"}
          disabled={isFirstItemVisible}
          onClick={() => scrollPrev()}
        />

        <FaArrowRight
          size={24}
          color={"black"}
          className={"pointer-link ms-4"}
          disabled={isLastItemVisible}
          onClick={() => scrollNext()}
        />
      </div>
    );
  };

  return (
    <div className={"container text-center"}>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Indicator Panel</Accordion.Header>
        <Accordion.Body>
          <ScrollMenu
            Footer={renderArrows}
            transitionDuration={2500}
            transitionBehavior={"smooth"}
          >
            {/*{chartsToDisplay?.map((string) => (*/}
            {/*    <div className={"px-2 py-3"}>{string}</div>*/}
            {/*))}*/}
          </ScrollMenu>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default IndicatorAccordion;
