import { useState } from "react";
import type { KeyboardEvent } from "react";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";

type FinanceChartModalProps = Readonly<{ text?: any }>;

function FinanceChartModal(props: FinanceChartModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { text } = props;

  const triggerShow = (e?: KeyboardEvent) => {
    if (e && e.key !== "Enter" && e.key !== " ") return;
    if (e?.key === " ") e.preventDefault();
    handleShow();
  };

  const triggerClose = (e?: KeyboardEvent) => {
    if (e && e.key !== "Enter" && e.key !== " ") return;
    if (e?.key === " ") e.preventDefault();
    handleClose();
  };

  return (
    <>
      <IconTrigger
        type="button"
        aria-label="Open chart info"
        onClick={() => handleShow()}
        onKeyDown={(e) => triggerShow(e)}
      >
        <FaInfoCircle size={30} color={"black"} aria-hidden />
      </IconTrigger>

      {show && (
        <div className="modal">
          <div className="modal-content">
            <CloseButton
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleClose}
              onKeyDown={(e) => triggerClose(e)}
            >
              &times;
            </CloseButton>
            <h2>{text?.modalHeader || "Modal Heading"}</h2>
            <div>
              {text?.modalBodyText() || "This is the modal description"}
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const IconTrigger = styled.button`
  position: absolute;
  right: 6px;
  top: 6px;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  line-height: 0;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
`;

export default FinanceChartModal;
