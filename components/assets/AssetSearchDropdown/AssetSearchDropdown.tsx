import { GET_ASSET } from "@/helpers/queries/assets";
import { useLazyQuery } from "@apollo/client";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

export type AssetSearchDropdownProps = Readonly<{
  type: string;
  addAssetMethod: (symbol: string) => void;
}>;

const AssetSearchDropdown = ({
  type,
  addAssetMethod,
}: AssetSearchDropdownProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [getAsset, { data }] = useLazyQuery(GET_ASSET);
  const [isOpen, setIsOpen] = useState(false);

  const updateSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    const isTradOrCrypto = type === "Crypto" || type === "TradFI";
    if (value.length > 2 && isTradOrCrypto) {
      getAsset({
        variables: { symbol: value, type },
      });
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (!data || data?.getAsset?.length === 0) {
      setIsOpen(false);
    }
  }, [data]);

  return (
    <DropdownContainer>
      <label htmlFor="asset-search">Asset Search</label>
      <Input
        id="asset-search"
        type="text"
        value={searchValue}
        onChange={updateSearchValue}
      />

      {isOpen && data && data?.getAsset?.length > 0 && (
        <ul className="option-container" role="listbox" aria-label="Assets">
          {data.getAsset.map((asset) => (
            <li key={asset.id} role="presentation">
              <OptionButton
                type="button"
                onClick={() => addAssetMethod(asset.symbol)}
              >
                {asset.symbol.toUpperCase()} - {asset.name}
              </OptionButton>
            </li>
          ))}
        </ul>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .option-container {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid black;
    position: absolute;
    top: 80px;
    background-color: white;
    z-index: 100;
    max-height: 200px;
    overflow-y: auto;
  }
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 12px;
  cursor: pointer;
  background: white;
  font: inherit;

  &:hover {
    background-color: blue;
    color: white;
  }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
`;

export default AssetSearchDropdown;
