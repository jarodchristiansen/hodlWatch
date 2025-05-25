import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

function FinanceChartModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { text } = props;
  return (
    <>
      <FaInfoCircle
        size={30}
        color={"black"}
        onClick={() => handleShow()}
        style={{ position: "absolute", right: "6px", top: "6px" }}
      />

      {show && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
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
