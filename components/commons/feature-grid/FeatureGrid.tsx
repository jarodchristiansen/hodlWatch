import { Colors } from "@/styles/variables";
import Image from "next/image";
import styled from "styled-components";

const FeatureGrid = () => {
  return (
    <GridContainer>
      <h3>Features</h3>
      <ul className="features-list">
        <li>
          <span className="feature-icon">
            {/* Add the corresponding icon here */}
            {/* <Image
              width={80}
              height={80}
              alt="portfolio tracking"
              src="/landing/portfolio-tracking.svg"
            /> */}
          </span>
          Portfolio Tracking:
          <ul>
            <li>
              Stay on top of your crypto investments with our intuitive
              portfolio tracking feature.
            </li>
            <li>
              Monitor real-time prices, performance, and allocation across
              multiple assets.
            </li>
            <li>
              Visualize your portfolio growth and make data-driven decisions
              with ease.
            </li>
          </ul>
        </li>
        <li>
          <span className="feature-icon">
            {/* Add the corresponding icon here */}
          </span>
          Comprehensive Metrics:
          <ul>
            <li>
              Dive deep into financial and on-chain metrics to gain valuable
              insights into crypto assets.
            </li>
            <li>
              Analyze price movements, market capitalization, trading volume,
              and more.
            </li>
            <li>
              Evaluate token fundamentals and historical data to make informed
              investment choices.
            </li>
          </ul>
        </li>
        <li>
          <span className="feature-icon">
            {/* Add the corresponding icon here */}
          </span>
          Social Community:
          <ul>
            <li>
              Connect with a vibrant community of crypto enthusiasts and
              investors.
            </li>
            <li>
              Engage in discussions, share knowledge, and stay updated on the
              latest trends.
            </li>
            <li>
              Foster valuable connections, collaborate on projects, and explore
              new opportunities.
            </li>
          </ul>
        </li>
        {/* Repeat the above structure for the remaining features */}

        <li>
          <span className="feature-icon">
            {/* Add the corresponding icon here */}
          </span>
          News and Updates:
          <ul>
            <li>
              Access a curated feed of crypto news, articles, and market updates
              in real-time
            </li>
            <li>
              Stay informed about industry developments, regulatory changes, and
              market trends.
            </li>
            <li>
              Get a holistic view of the crypto ecosystem and make informed
              decisions based on the latest information.
            </li>
          </ul>
        </li>
        {/* Repeat the above structure for the remaining features */}

        <li>
          <span className="feature-icon">
            {/* Add the corresponding icon here */}
          </span>
          User-friendly Interface:
          <ul>
            <li>
              Enjoy a sleek and intuitive interface designed for seamless user
              experience.
            </li>
            <li>
              Navigate effortlessly through the app&apos;s features and access
              information with ease.
            </li>
            <li>
              Experience the power of crypto in a user-friendly environment that
              simplifies complex concepts.
            </li>
          </ul>
        </li>
        {/* Repeat the above structure for the remaining features */}

        <li>
          <span className="feature-icon">
            {/* Add the corresponding icon here */}
          </span>
          Security and Privacy:
          <ul>
            <li>
              Rest assured knowing that your data and assets are protected with
              robust security measures.
            </li>
            <li>
              Safeguard your privacy and maintain full control over your
              personal information.
            </li>
            <li>
              Mesh prioritizes the security and confidentiality of your crypto
              journey.
            </li>
          </ul>
        </li>
        {/* Repeat the above structure for the remaining features */}
      </ul>
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.lightGray};
  /* padding: 24px; */
  padding: 24px 14px;
  align-items: center;

  h3 {
    align-self: center;
  }

  .features-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 18px;

    text-align: start;
  }

  ul {
    /* list-style: none; */
    padding-inline-start: 12px;
    padding-inline-end: 12px;
    padding-top: 12px;
    background-color: ${Colors.elegant.white};
    border: 2px solid ${Colors.lightGray};

    li {
      padding-top: 8px;
    }
  }
`;

export default FeatureGrid;
