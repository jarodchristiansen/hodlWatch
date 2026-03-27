import { MediaQueries } from "@/styles/variables";
import styled from "styled-components";

const SideMenu = ({ navLinks }) => {
  const style = "menu active";

  const runPropFunction = (stateChanger) => {
    if (!!stateChanger && typeof stateChanger === "function") {
      stateChanger();
    }
  };

  return (
    <Wrapper>
      <div className={style}>
        <ul>
          {navLinks.map(({ name, stateChanger }) => (
            <li key={name}>
              <button
                type="button"
                className="side-nav-item"
                onClick={() => runPropFunction(stateChanger)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media ${MediaQueries.MD} {
    display: unset;
  }

  .menu {
    // TODO: Fix Styling to be more dynamic
    background: #34495e;
    min-height: 120%;
    width: 20%;
    max-width: 18rem;
    min-width: 14rem;
    margin-top: -0.5rem;
    padding-top: 1rem;

    ul {
      padding: 0;
      margin: 0;

      li {
        font-size: 16px;
        border-bottom: 1px solid #fff;
        transition: all 0.25s ease;
        animation: fadeInRight 0.25s ease forwards;

        .side-nav-item {
          color: #fff;
          text-decoration: none;
          display: block;
          width: 100%;
          padding: 20px;
          border: none;
          background: none;
          font: inherit;
          text-align: left;
          cursor: pointer;
        }

        &:hover {
          opacity: 0.8;
          transition: all 0.25s ease;
          background: #000;
        }
      }
    }
  }

  .active {
    opacity: 1;
    visibility: visible;
  }

  @-webkit-keyframes fadeInRight {
    0% {
      opacity: 0;
      left: 20%;
    }
    100% {
      opacity: 1;
      left: 0;
    }
  }
`;

export default SideMenu;
