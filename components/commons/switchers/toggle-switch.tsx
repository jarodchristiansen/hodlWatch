import styled from "styled-components";
import { Colors } from "../../../styles/Colors";

const ToggleSwitch = ({ label, toggleState, setToggleState }) => {
  const changeToggleState = (e) => {
    console.log(e.target.value);
    setToggleState(!toggleState);
  };

  return (
    <ToggleContainer>
      {/* {label}{" "} */}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={label}
          id={label}
          onClick={changeToggleState}
          checked={toggleState}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  text-align: center;

  .toggle-switch {
    position: relative;
    width: 110px;
    display: inline-block;
    text-align: left;
    top: 8px;
  }
  .checkbox {
    display: none;
  }
  .label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 0 solid #bbb;
    border-radius: 20px;
    border: 1px solid black;
  }
  .inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }
  .inner:before,
  .inner:after {
    float: left;
    width: 50%;
    height: 36px;
    padding: 0;
    line-height: 36px;
    color: #fff;
    font-weight: bold;
    box-sizing: border-box;
  }
  .inner:before {
    content: "Sign In";
    padding-left: 10px;
    background-color: ${Colors.PrimaryButtonBackground};
    color: #fff;
  }
  .inner:after {
    content: "Sign Up";
    padding-right: 10px;
    background-color: #03b872;
    color: #fff;
    text-align: right;
  }
  .switch {
    display: block;
    width: 24px;
    margin: 7px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 72px;
    border: 0 solid #bbb;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }
  .checkbox:checked + .label .inner {
    margin-left: 0;
  }
  .checkbox:checked + .label .switch {
    right: 0px;
  }
`;

export default ToggleSwitch;
