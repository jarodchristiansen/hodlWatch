import { currencyFormat } from "../../../helpers/formatters/currency";

const AssetDetailsHeader = ({ asset, time, assetData }) => {
  return (
    <div className={"card"}>
      <div className="card-header text-center">
        {asset.toUpperCase()} - {assetData.name}
      </div>
      <div className={"card-body"}>
        <div className="container">
          <div className="row row-cols-2 m-auto">
            <div className={"row"}>
              <h6 className="col text-start">Market Cap:</h6>
              <h6 className="col text-end">
                {currencyFormat(assetData.market_cap)}
              </h6>
            </div>

            <div className={"row text-end"}>
              <h6 className="col">Max Supply:</h6>
              <h6 className="col">{assetData.max_supply || "N/A"}</h6>
            </div>

            {/*Section Divider    */}

            <div className={"row text-start"}>
              <h6 className="col">24H Volume:</h6>
              <h6 className="col text-end">
                {currencyFormat(assetData.volume_24h)}
              </h6>
            </div>

            <div className={"row text-end"}>
              <h6 className="col">7D Change:</h6>
              <h6 className="col">{assetData.percent_change_7d}</h6>
            </div>
            {/*Section Divider    */}

            <div className={"row"}>
              <h6 className="col text-start">Current Price:</h6>
              <h6 className="col text-end">
                {currencyFormat(assetData.price)}
              </h6>
            </div>

            <div className={"row text-end"}>
              <h6 className="col">24H Change:</h6>
              <h6 className="col">{assetData.percent_change_24h}</h6>
            </div>
            {/*Section Divider    */}

            <div className={"row"}>
              <h6 className="col text-start">Placholder Data ATM:</h6>
              <h6 className="col text-end">
                {currencyFormat(assetData.volume_24h)}
              </h6>
            </div>

            <div className={"row "}>
              <h6 className="col text-end">30D Change:</h6>
              <h6 className="col text-end">{assetData.percent_change_30d}</h6>
            </div>
            {/*Section Divider    */}
          </div>
        </div>
      </div>
      <div className="card-footer text-center">
        <h5>{time} Day View</h5>
      </div>
    </div>
  );
};

export default AssetDetailsHeader;
