import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function FinanceChartModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { text } = props;
  return (
    <>
      <FaInfoCircle
        size={20}
        color={"black"}
        onClick={() => handleShow()}
        style={{ position: "absolute", right: "12px", top: "5px" }}
      />

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
