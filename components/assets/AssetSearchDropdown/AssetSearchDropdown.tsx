import { GET_ASSET } from "@/helpers/queries/assets";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AssetSearchDropdown = ({ type, addAssetMethod }) => {
  const [searchValue, setSearchValue] = useState("");
  const [getAsset, { data, loading, error }] = useLazyQuery(GET_ASSET);
  const [isOpen, setIsOpen] = useState(false); // To track if dropdown should be open

  const updateSearchValue = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 2 && type == "Crypto") {
      getAsset({
        variables: { symbol: value, type },
      });
      setIsOpen(true); // Open the dropdown when options are available
    } else if (value.length > 2 && type == "TradFI") {
      getAsset({
        variables: { symbol: value, type },
      });
      setIsOpen(true); // Open the dropdown when options are available
    }
  };

  useEffect(() => {
    if (!data || data?.getAsset?.length === 0) {
      setIsOpen(false); // Close the dropdown if no options are available
    }
  }, [data]);

  return (
    <DropdownContainer>
      <label htmlFor="asset-search">Asset Search</label>
      <Input type="text" onChange={updateSearchValue} />

      {/* Use the isOpen state to conditionally render the Select */}
      {isOpen && data && data?.getAsset?.length > 0 && (
        <div className="option-container">
          {/* Remove the "Select an option" prompt */}
          {data.getAsset.map((asset) => (
            <option
              key={asset.id}
              value={asset.symbol}
              onClick={(e: any) => addAssetMethod(e.target.value)}
            >
              {asset.symbol.toUpperCase()} - {asset.name}
            </option>
          ))}
        </div>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .option-container {
    border: 1px solid black;
    position: absolute;
    top: 80px;
    background-color: white;
    z-index: 100;
    max-height: 200px;
    overflow-y: scroll;

    option {
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      padding: 12px;
      cursor: pointer;

      &:hover {
        background-color: blue;
      }
    }
  }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
`;

export default AssetSearchDropdown;
