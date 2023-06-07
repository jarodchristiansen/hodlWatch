import { Colors } from "@/styles/variables";
import styled from "styled-components";

const FeatureGrid = () => {
  return (
    <GridContainer>
      <h3>Features</h3>
      <ul className="features-list">
        <li>
          <span className="feature-icon">
            {/* Add the corresponding icon here */}
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
              Navigate effortlessly through the app's features and access
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
          Customizable Alerts:
          <ul>
            <li>
              Set personalized alerts to stay informed about price movements and
              market conditions.
            </li>
            <li>
              Receive instant notifications about important events, such as
              price thresholds or news updates.
            </li>
            <li>
              Tailor your alerts to your specific investment strategies and
              never miss out on potential opportunities.
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

        <li>
          <span className="feature-icon">
            {/* Add the corresponding icon here */}
          </span>
          Cross-platform Accessibility:
          <ul>
            <li>
              Access Mesh anytime, anywhere, with our cross-platform support.
            </li>
            <li>
              Seamlessly switch between desktop and mobile devices while
              enjoying a consistent experience.
            </li>
            <li>
              Stay connected to your portfolio and the community, no matter
              where you are.
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
  background-color: ${Colors.gainsboro};
  padding: 24px;

  h3 {
    align-self: center;
  }

  .features-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export default FeatureGrid;
