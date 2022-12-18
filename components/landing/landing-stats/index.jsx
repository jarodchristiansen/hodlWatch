import styled from "styled-components";
import { MediaQueries } from "@/styles/MediaQueries";

const LandingStatsBanner = () => {
  return (
    <LandingBannerContainer>
      <div className="banner-column">
        <div className="stats-row">
          <StatsBlock>
            <h4>1,680</h4>
            <p>Assets</p>
          </StatsBlock>

          <StatsBlock>
            <h4>12</h4>
            <p>Users</p>
          </StatsBlock>

          <StatsBlock>
            <h4>20+</h4>
            <p>Indicators</p>
          </StatsBlock>

          <StatsBlock>
            <h4>19</h4>
            <p>Wallets Connected</p>
          </StatsBlock>
        </div>
      </div>
    </LandingBannerContainer>
  );
};

const LandingBannerContainer = styled.div`
  width: 100%;
  height: 17rem;
  background-color: #202020;
  border-radius: 5px;

  .header-text {
    color: white;
  }

  .banner-column {
    display: flex;
    flex-direction: column;
  }

  @media ${MediaQueries.MD} {
    width: 80%;
    background-position: 0px -10rem;
  }

  .stats-row {
    display: flex;
    padding-top: 3rem;
    gap: 2rem;
    overflow-x: auto;

    @media ${MediaQueries.SM} {
      padding-left: 4rem;
      padding-right: 4rem;

      ::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
    }

    @media ${MediaQueries.MD} {
      justify-content: center;
    }
  }
`;

const StatsBlock = styled.div`
  border: 1.25px solid white;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: fit-content;
  padding: 1rem 2rem;
  justify-content: end;
  /* box-shadow: 2px 4px 8px lightgray; */
  color: white;
  background-color: #877ec7;
  margin: 0.5rem 0.5rem;
`;

export default LandingStatsBanner;
