import { useState } from "react";
import type { KeyboardEvent } from "react";
import { FaInfoCircle } from "react-icons/fa";

function FinanceChartModal(props) {
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
      <FaInfoCircle
        size={30}
        color={"black"}
        role="button"
        tabIndex={0}
        aria-label="Open chart info"
        onClick={() => handleShow()}
        onKeyDown={(e) => triggerShow(e)}
        style={{ position: "absolute", right: "6px", top: "6px", cursor: "pointer" }}
      />

      {show && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              role="button"
              tabIndex={0}
              aria-label="Close"
              onClick={handleClose}
              onKeyDown={(e) => triggerClose(e)}
            >
              &times;
            </span>
            <h2>{text?.modalHeader || "Modal Heading"}</h2>
            <div>
              {text?.modalBodyText() || "This is the modal description"}
              {/*<img src{text?.modalBodyImage || ''} />*/}
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

export default FinanceChartModal;
