import { MediaQueries } from "@/styles/variables";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import ChartsIcon from "../../../public/assets/chartsIcon.svg";
import Button from "../buttons/Button";

const HeroBanner = ({}) => {
  const router = useRouter();

  const routeToAuth = (string) => {
    router.push(`/auth?path=${string}`);
  };

  const routeToEducation = () => {
    router.push("/education");
  };

  return (
    <HeroBannerContainer>
      <div className="top-row">
        <div className="logo-container">
          {/* <Image
            src={PotentialLogo}
            alt="potential logo"
            height={100}
            width={100}
          /> */}
        </div>

        <div className="button-container">
          <Button secondary whiteOutline>
            Learn More
          </Button>
          <Button primary onClick={() => routeToAuth("signUp")}>
            Sign Up
          </Button>
        </div>
      </div>

      <div className="main-contain">
        <div className="left-side">
          <h1>Mesh</h1>
          <div>
            <p>Your All-in-One Web3 Companion</p>
            <p>
              {/* Dive into the dynamic world of decentralized finance with Mesh.
              Effortlessly track your portfolio, engage with a thriving
              community, DYOR with 50+ metrics available for 10,000+ assets, and
              stay ahead in the fast-paced crypto landscape. Whether you're here
              to ask `What is Bitcoin?`, or you've been HODLing since 2010, Mesh
              has something for you. */}
              Track portfolios, engage with the crypto community, and stay ahead
              with real-time metrics for 10,000+ assets. Join the revolution
              today!
            </p>
          </div>
        </div>

        <div className="right-side">
          <Image src={ChartsIcon} alt="charts icon" height={500} width={700} />
        </div>
      </div>
    </HeroBannerContainer>
  );
};

const HeroBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  gap: 48px;
  width: 100%;
  padding: 24px;

  .top-row {
    display: flex;
    padding: 0 0 12px 0;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;

    .logo-container {
      /* justify-self: start; */
    }

    .button-container {
      display: flex;
      gap: 32px;
    }

    @media ${MediaQueries.MD} {
      flex-direction: row;
      max-width: 95%;
    }
  }

  .main-contain {
    display: flex;
    flex-direction: column-reverse;
    text-align: center;
    padding: 48px 12px;

    .left-side {
      display: flex;
      flex-direction: column;
      gap: 24px;

      h1 {
        font-size: 48px;
        font-weight: 700;
      }

      p {
        font-size: 18px;

        &:first-of-type {
          font-weight: 600;
          font-style: italic;
        }
      }

      @media ${MediaQueries.MD} {
        max-width: 50%;
        text-align: start;
      }
    }

    .right-side {
      padding-top: 82px;
      padding-bottom: 24px;

      img {
        width: 100%;
        object-fit: contain;

        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
      }

      align-self: center;
    }

    @media ${MediaQueries.MD} {
      flex-direction: row;
      justify-content: space-evenly;
      padding: 48px;
      align-items: center;
    }
  }
`;

export default HeroBanner;
