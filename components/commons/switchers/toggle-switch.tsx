import styled from "styled-components";
import { Colors } from "../../../styles/Colors";

const ToggleSwitch = ({ label, toggleState, setToggleState }) => {
  const changeToggleState = (e) => {
    setToggleState(!toggleState);
  };

  return (
    <ToggleContainer>
      <label className="label">
        <div className="toggle">
          <input
            className="toggle-state"
            type="checkbox"
            name={label}
            id={label}
            onChange={changeToggleState}
            checked={toggleState}
          />
          <div className="indicator"></div>
        </div>
        <div className="label-text">{label}</div>
      </label>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  text-align: center;

  .label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: #394a56;
    font-weight: bold;
  }

  .label-text {
    margin-left: 16px;
  }

  .toggle {
    isolation: isolate;
    position: relative;
    height: 30px;
    width: 60px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: -8px -4px 8px 0px #ffffff, 8px 4px 12px 0px #d1d9e6,
      4px 4px 4px 0px #d1d9e6 inset, -4px -4px 4px 0px #ffffff inset;
  }

  .toggle-state {
    display: none;
  }

  .indicator {
    height: 100%;
    width: 200%;
    background: #ecf0f3;
    border-radius: 15px;
    transform: translate3d(-75%, 0, 0);
    transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
    box-shadow: -8px -4px 8px 0px #ffffff, 8px 4px 12px 0px #d1d9e6;
  }

  .toggle-state:checked ~ .indicator {
    transform: translate3d(25%, 0, 0);
  }
`;

export default ToggleSwitch;
