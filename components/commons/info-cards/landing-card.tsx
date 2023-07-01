import { Colors, MediaQueries } from "@/styles/variables";
import { useRouter } from "next/router";
import styled from "styled-components";

interface LandingCardProps {
  headerText: string;
  header2Text: string;
  bodyText: string;
  renderSignIn: boolean;
  renderLearnMore: boolean;
}

const LandingCard = ({
  headerText,
  header2Text,
  bodyText,
  renderSignIn = false,
  renderLearnMore = false,
}: LandingCardProps) => {
  const router = useRouter();

  const routeToAuth = (string) => {
    router.push(`/auth?path=${string}`);
  };

  const routeToEducation = () => {
    router.push("/education");
  };

  return (
    <InfoCardContainer renderSignIn={renderSignIn}>
      {/* {!!renderSignIn && (
        <>
          <CommunityIconContainer right>
            <Image
              src={"/assets/community.svg"}
              width={80}
              height={80}
              layout="responsive"
              alt="community icon"
            />
          </CommunityIconContainer>

          <CommunityIconContainer>
            <Image
              src={"/assets/community.svg"}
              width={80}
              height={80}
              layout="responsive"
              alt="community icon"
            />
          </CommunityIconContainer>
        </>
      )} */}

      <div className="info-card-header">
        <h2 className="heading-text">{headerText}</h2>
        <h2 className="subheading-text">{header2Text}</h2>
      </div>

      <div className="info-card-body">
        <span className="body-text">{bodyText}</span>
      </div>

      {!!renderSignIn && (
        <div className="button-container">
          <button
            className="secondary-button"
            onClick={() => routeToAuth("SignUp")}
          >
            Sign Up
          </button>
          <button
            className="standardized-button"
            onClick={() => routeToAuth("SignIn")}
          >
            Sign In
          </button>
        </div>
      )}

      {/* {!!renderLearnMore && (
        <div className="button-container">
          <CTAButton
            className="standardized-button"
            onClick={() => routeToEducation()}
          >
            Our Story
          </CTAButton>
          <CTAButton
            className="secondary-button"
            onClick={() => routeToEducation()}
          >
            Web3
          </CTAButton>
        </div>
      )} */}
    </InfoCardContainer>
  );
};

interface CommunityIconProps {
  right?: boolean;
}

const CommunityIconContainer = styled.div<CommunityIconProps>`
  display: none;

  @media ${MediaQueries.MD} {
    display: flex;
    position: absolute;
    border: 2px solid black;
    border-radius: 50%;
    top: 2rem;
    right: ${(props) => (props.right ? "3rem" : "unset")};
    left: ${(props) => (props.right ? "unset" : "3rem")};
    background-color: #e7d3ff;

    img {
      max-height: 7rem;
    }
  }
`;

interface InfoCardContainerProps {
  renderSignIn: boolean;
}

const InfoCardContainer = styled.div<InfoCardContainerProps>`
  animation: "fade-in";
  padding: 2rem 0;
  padding: 0 2rem;
  min-width: 18rem;
  position: relative;

  .info-card-header {
    text-align: center;
    color: ${Colors.elegant.white};

    .heading-text {
      font-size: 48px;
      padding-bottom: 1rem;
    }
  }

  .info-card-body {
    text-align: center;
    padding: 1rem 0;

    span {
      font-size: 20px;
      color: ${(props) =>
        props.renderSignIn ? Colors.elegant.white : Colors.elegant.white};
      font-style: italic;
      font-style: ${(props) => props.renderSignIn && "normal"};
    }
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 0;
  }

  @media ${MediaQueries.LG} {
    padding: 2rem 2rem;
  }
`;

const CTAButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${Colors.elegant.accentPurple};
  color: #fff;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default LandingCard;
