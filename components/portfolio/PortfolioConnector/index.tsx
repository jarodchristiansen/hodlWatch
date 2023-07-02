import UserHoldingsPieChart from "@/components/assets/Finance/Charts/UserHoldingsPieChart";
import { currencyFormat } from "@/helpers/formatters/currency";
import { GetLocalKeys, StoreLocalKeys } from "@/helpers/localStorage/index";
import { GET_USER_HOLDINGS } from "@/helpers/queries/user/index";
import { Colors, MediaQueries } from "@/styles/variables";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

/**
 *
 * @returns PortfolioConnector: Portal that allows user to connect via their exchange keys and explore their portfolio compared to other users
 */
const PortfolioConnector = () => {
  const [publicKeyValue, setPublicKeyValue] = useState("");
  const [privateKeyValue, setPrivateKeyValue] = useState("");
  const [exchangeValue, setExchangeValue] = useState("");
  const [sum, setSum] = useState(0);
  const [portfolioView, setPortfolioView] = useState("Main");
  const [holdingSort, setHoldingSort] = useState("");

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
      return (
        <option value={exchange.value} key={exchange.name}>
          {exchange.name}
        </option>
      );
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

      if (!holdingData) {
        fetchUserHoldings({
          variables: {
            input: {
              private_key: parsedResult.private_key,
              public_key: parsedResult.public_key,
            },
          },
        });
      }

      setPrivateKeyValue(parsedResult.private_key);
      setPublicKeyValue(parsedResult.public_key);
    }
  };

  useEffect(() => {
    checkForUserKeys();
  }, []);

  useEffect(() => {
    if (!holdingData?.getUserExchangeData?.balances?.length) return;

    let tempSum = 0;

    for (let asset of holdingData.getUserExchangeData.balances) {
      tempSum += asset.usd;
    }

    setSum(tempSum);
  }, [holdingData?.getUserExchangeData]);

  const HoldingsItems = useMemo(() => {
    if (!holdingData?.getUserExchangeData?.balances?.length) return [];

    let initialData = [...holdingData.getUserExchangeData.balances];

    let data;

    switch (holdingSort) {
      case "Value":
        data = initialData.sort(
          (a, b) => a.balance * a.usd - b.balance * b.usd
        );
        break;
      case "Price":
        data = initialData.sort((a, b) =>
          a.usd > b.usd ? 1 : b.usd > a.usd ? -1 : 0
        );
        break;
      default:
        data = initialData;
        break;
    }

    return data.map((item) => {
      let ratio;

      if (sum) {
        ratio = Math.floor(((item.balance * item.usd) / sum) * 100);
      }

      return (
        <div className="holding-item-row" key={item.balance}>
          <span className="item-symbol">{item.symbol}</span>

          <div className="holdings-column">
            <span>Holdings: {item.balance.toFixed(2)}</span>
            <span>Current Price: {currencyFormat(item.usd)}</span>
          </div>

          <div className="item-total">
            <span>Value: {currencyFormat(item.balance * item.usd)}</span>

            <span>Ratio: {ratio}%</span>
          </div>
        </div>
      );
    });
  }, [holdingData?.getUserExchangeData, holdingSort, sum]);

  const analyticsData = useMemo(() => {
    if (!holdingData?.getUserExchangeData?.balances?.length || !sum) return [];

    return holdingData.getUserExchangeData.balances.map((item) => {
      return {
        ...item,
        relative_value: ((item.balance * item.usd) / sum) * 100,
      };
    });
  }, [holdingData?.getUserExchangeData, sum]);

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
            <button type="submit" className="standardized-button">
              Save
            </button>
          </div>
        </FormContainer>
      )}

      {!!HoldingsItems?.length &&
        !holdingLoading &&
        portfolioView === "Main" && (
          <ColumnContainer>
            <button
              onClick={() => setPortfolioView("Analytics")}
              className="standardized-button"
            >
              Analytics
            </button>

            <HoldingItemsContainer>
              <div>
                <h2>Current Holdings</h2>
                {sum && <h4>Total Holdings: {currencyFormat(sum)}</h4>}

                <button
                  onClick={() => setHoldingSort("Value")}
                  className="standardized-button"
                >
                  Sort By Value
                  {/* <span>
                  <span>&uarr;</span>
                </span>
               */}
                  {/* <span>
                  <span>&#8595;</span>
                </span>
               */}
                </button>

                <button
                  onClick={() => setHoldingSort("Price")}
                  className="standardized-button"
                >
                  Sort By Price
                </button>
              </div>
              {HoldingsItems}
            </HoldingItemsContainer>
          </ColumnContainer>
        )}

      {!!analyticsData.length && portfolioView === "Analytics" && (
        <AnalyticsContainer>
          <button
            onClick={() => setPortfolioView("Main")}
            className="standardized-button"
          >
            Main
          </button>

          <div className="holdings-container">
            <div>
              <UserHoldingsPieChart data={analyticsData} sum={sum} />
            </div>
          </div>
        </AnalyticsContainer>
      )}
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 1rem;
`;

const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 1rem;

  .holdings-container {
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 12px;
    box-shadow: 2px 4px 8px gray;
    width: 100%;
    max-height: 90vh;
    overflow-y: scroll;

    @media ${MediaQueries.MD} {
      overflow-y: unset;
    }
  }
`;

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
      font-size: 14px;
    }

    .holdings-column {
      display: flex;
      flex-direction: column;
    }

    .item-total {
      display: flex;
      flex-direction: column;
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
  background-color: ${Colors.lightGray};

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
