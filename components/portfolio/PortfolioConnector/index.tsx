import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { GET_USER_HOLDINGS } from "../../../helpers/queries/user/index";
import {
  GetLocalKeys,
  StoreLocalKeys,
} from "../../../helpers/localStorage/index";
import { currencyFormat } from "../../../helpers/formatters/currency";
import { MediaQueries } from "../../../styles/MediaQueries";
import UserHoldingsPieChart from "../../../components/assets/Finance/Charts/UserHoldingsPieChart";

const PortfolioConnector = () => {
  const [publicKeyValue, setPublicKeyValue] = useState("");
  const [privateKeyValue, setPrivateKeyValue] = useState("");
  const [exchangeValue, setExchangeValue] = useState("");
  const [sum, setSum] = useState(0);
  const [portfolioView, setPortfolioView] = useState("Main");

  const [
    fetchUserHoldings,
    {
      data: holdingData,
      loading: holdingLoading,
      error: holdingError,
      refetch: refetchHoldings,
      fetchMore: fetchMoreHoldings,
    },
  ] = useLazyQuery(GET_USER_HOLDINGS, {
    variables: {
      input: {
        private_key: privateKeyValue,
        public_key: publicKeyValue,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const exchangeList = useMemo(() => {
    let list = [
      { name: "Coinbase", value: "coinbase" },
      { name: "Binance", value: "binance" },
    ];

    return list.map((exchange) => {
      return <option value={exchange.value}>{exchange.name}</option>;
    });
  }, []);

  const submitForm = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    let userStore = {
      public_key: publicKeyValue,
      private_key: privateKeyValue,
    };
    // const exchangeInstance = getExchangeInstance(exchangeId, apiCredentials);
    fetchUserHoldings();

    StoreLocalKeys("Portfolio Connector", JSON.stringify(userStore));
  };

  const checkForUserKeys = () => {
    let results = GetLocalKeys("Portfolio Connector");

    if (results) {
      let parsedResult = JSON.parse(results);

      fetchUserHoldings({
        variables: {
          input: {
            private_key: parsedResult.private_key,
            public_key: parsedResult.public_key,
          },
        },
      });

      setPrivateKeyValue(parsedResult.private_key);
      setPublicKeyValue(parsedResult.public_key);
    }
  };

  useEffect(() => {
    checkForUserKeys();
  }, []);

  const HoldingsItems = useMemo(() => {
    if (!holdingData?.getUserExchangeData?.balances?.length) return [];

    const sum = holdingData.getUserExchangeData.balances.reduce(
      (accumulator, object) => {
        return accumulator + object.usd;
      },
      0
    );

    setSum(sum);

    return holdingData.getUserExchangeData.balances.map((item) => {
      return (
        <div className="holding-item-row">
          <span className="item-symbol">{item.symbol}</span>

          <div className="holdings-column">
            <span>Holdings: {item.balance}</span>
            <span>Current Price: {currencyFormat(item.usd)}</span>
          </div>

          <div className="item-total">
            {currencyFormat(item.balance * item.usd)}
          </div>
        </div>
      );
    });
  }, [holdingData?.getUserExchangeData]);

  return (
    <div>
      {holdingLoading && <div>Loading</div>}
      {!holdingData && !holdingLoading && (
        <FormContainer onSubmit={submitForm}>
          <h4>Connect Your Portfolio</h4>

          <div>
            <label htmlFor="exchanges">Exchanges</label>
            <select
              name="exchanges"
              onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                setExchangeValue(evt.target.value)
              }
              value={exchangeValue}
            >
              {exchangeList}
            </select>
          </div>

          <div>
            <label htmlFor="public_key">Public Api Key</label>
            <input
              name="public_key"
              type="text"
              value={publicKeyValue}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                setPublicKeyValue(evt.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="private_key">Private api key (secret)</label>
            <input
              name="private_key"
              type="password"
              value={privateKeyValue}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                setPrivateKeyValue(evt.target.value)
              }
            />
          </div>

          <div className="button-container">
            <button type="submit">Save</button>
          </div>
        </FormContainer>
      )}

      {!!HoldingsItems?.length && portfolioView === "Main" && (
        <div>
          <button onClick={() => setPortfolioView("Analytics")}>
            Analytics
          </button>

          <HoldingItemsContainer>
            <div>
              <h2>Current Holdings</h2>
              {sum && <h4>Total Holdings: {currencyFormat(sum)}</h4>}
            </div>
            {HoldingsItems}
          </HoldingItemsContainer>
        </div>
      )}

      {!!HoldingsItems?.length && portfolioView === "Analytics" && (
        <div>
          <button onClick={() => setPortfolioView("Main")}>Main</button>

          <HoldingItemsContainer>
            <div>
              <h2>Portolio Analytics</h2>
              {sum && <h4>Total Holdings: {currencyFormat(sum)}</h4>}
            </div>
            {/* {HoldingsItems} */}
            <div>
              <UserHoldingsPieChart data={holdingData?.getUserExchangeData?.balances} />
            </div>
          </HoldingItemsContainer>
        </div>
      )}
    </div>
  );
};

const HoldingItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid gray;
  border-radius: 12px;
  box-shadow: 2px 4px 8px gray;
  width: 100%;
  max-height: 90vh;
  overflow-y: scroll;

  @media ${MediaQueries.MD} {
    min-width: 37.5rem;
  }

  .holding-item-row {
    display: flex;
    border-top: 1px solid gray;
    justify-content: space-between;
    padding: 1rem;
    text-align: center;

    .item-symbol {
      font-weight: bold;
    }

    .holdings-column {
      display: flex;
      flex-direction: column;
    }

    .item-total {
      font-weight: bold;
    }
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid lightgray;
  border-radius: 9px;
  padding: 1rem 2rem;
  box-shadow: 2px 4px 8px lightgray;
  text-align: center;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
  }

  input {
    min-width: 20rem;
  }

  .button-container {
    padding-top: 1rem;
  }
`;

export default PortfolioConnector;
