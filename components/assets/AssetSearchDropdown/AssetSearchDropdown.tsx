import { GET_ASSET } from "@/helpers/queries/assets";
import { useLazyQuery } from "@apollo/client";
import type { ChangeEvent } from "react";
import { useEffect, useId, useState } from "react";
import styled from "styled-components";

export type AssetSearchDropdownProps = Readonly<{
  type: string;
  addAssetMethod: (symbol: string) => void;
}>;

const AssetSearchDropdown = ({
  type,
  addAssetMethod,
}: AssetSearchDropdownProps) => {
  const uid = useId().replace(/:/g, "");
  const inputId = `asset-search-in-${uid}`;
  const datalistId = `asset-search-list-${uid}`;
  const [searchValue, setSearchValue] = useState("");
  const [getAsset, { data }] = useLazyQuery(GET_ASSET);

  const updateSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    const isTradOrCrypto = type === "Crypto" || type === "TradFI";
    if (value.length > 2 && isTradOrCrypto) {
      getAsset({
        variables: { symbol: value, type },
      });
    }
  };

  useEffect(() => {
    if (!searchValue || !data?.getAsset?.length) return;
    const exact = data.getAsset.find(
      (a: { symbol: string }) =>
        a.symbol.toLowerCase() === searchValue.toLowerCase()
    );
    if (exact) {
      addAssetMethod(exact.symbol);
      setSearchValue("");
    }
  }, [data, searchValue, addAssetMethod]);

  return (
    <DropdownContainer>
      <label htmlFor={inputId}>Asset Search</label>
      <Input
        id={inputId}
        type="text"
        value={searchValue}
        onChange={updateSearchValue}
        list={datalistId}
        autoComplete="off"
      />
      <datalist id={datalistId}>
        {(data?.getAsset ?? []).map(
          (asset: { id: string; symbol: string; name: string }) => (
            <option
              key={asset.id}
              value={asset.symbol}
              label={`${asset.symbol.toUpperCase()} - ${asset.name}`}
            />
          )
        )}
      </datalist>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .option-container {
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

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
`;

export default AssetSearchDropdown;
