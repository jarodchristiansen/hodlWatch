import { GET_ASSET } from "@/helpers/queries/assets";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";

const AssetSearchDropdown = ({ type, addAssetMethod }) => {
  const [searchValue, setSearchValue] = useState("");
  const [getAsset, { data, loading, error }] = useLazyQuery(GET_ASSET);

  const updateSearchValue = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 2) {
      getAsset({
        variables: { symbol: value },
      });
    }
  };

  return (
    <div>
      <label htmlFor="asset-search">Asset Search</label>
      <input type="text" onChange={updateSearchValue} />

      {data && data.getAsset.length > 0 && (
        <select onChange={(e) => addAssetMethod(e.target.value)}>
          <option value="">Select an option</option>
          {data.getAsset.map((asset) => (
            <option key={asset.id} value={asset.symbol}>
              {asset.symbol.toUpperCase()} - {asset.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AssetSearchDropdown;
