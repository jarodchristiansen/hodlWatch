import React, { useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function FinanceChartModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { text } = props;
  return (
    <>
      <span>
        <FaInfoCircle
          size={28}
          color={"black"}
          onClick={() => handleShow()}
          className={"pointer-link"}
        />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{text?.modalHeader || "Modal Heading"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {text?.modalBodyText() || "This is the modal description"}
          {/*<img src{text?.modalBodyImage || ''} />*/}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FinanceChartModal;
