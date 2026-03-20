import { BorderRadius, Colors, FontFamily, FontWeight, MediaQueries } from "@/styles/variables";
import React from "react";
import styled from "styled-components";

interface SearchFormProps {
  queryValue: string;
  setQueryValue: React.Dispatch<React.SetStateAction<string>>;
  filterAssets: (e?: React.ChangeEvent<HTMLFormElement>) => Promise<void>;
  onClear?: () => void;
  isSearchMode?: boolean;
}

/**
 *
 * @param queryValue: Current Search Term (Asset Symbol)
 * @param setQueryValue: Sets Current Search Term (Asset Symbol)
 * @param filterAssets: Function that filters the current asset shown in UI
 * @returns searchForm compnent that allows users to search assets
 */
const SearchForm = ({
  queryValue,
  setQueryValue,
  filterAssets,
  onClear,
  isSearchMode,
}: SearchFormProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    filterAssets(e);
  };

  const handleInputChange = (value: string) => {
    setQueryValue(value);
  };

  return (
    <FormWrapper onSubmit={handleSearch} data-testid={"asset-search-form"}>
      <FieldGroup>
        <label className="sr-only" htmlFor="asset-search">
          Search assets
        </label>
        <StyledInput
          id="asset-search"
          value={queryValue}
          placeholder="Search by ticker or name (e.g., BTC or Bitcoin) — press Enter"
          onChange={(event) => handleInputChange(event.target.value)}
          data-testid="search-input"
          inputMode="search"
          autoComplete="off"
        />
        {!!queryValue && (
          <ClearButton
            type="button"
            onClick={() => {
              setQueryValue("");
              onClear?.();
            }}
            aria-label="Clear search"
          >
            Clear
          </ClearButton>
        )}
      </FieldGroup>

      <SubmitButton type="submit" data-testid="search-button">
        Search
      </SubmitButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  width: 100%;

  @media ${MediaQueries.MD} {
    min-width: 520px;
    width: auto;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const FieldGroup = styled.div`
  position: relative;
  flex: 1;
  min-width: 240px;
`;

const SubmitButton = styled.button`
  height: 44px;
  padding: 0 16px;
  background: ${Colors.accent};
  color: ${Colors.charcoal};
  font-family: ${FontFamily.primary};
  font-weight: ${FontWeight.bold};
  border-radius: 12px;
  border: none;
  cursor: pointer;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.18);
  transition: transform 0.15s ease, background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${Colors.primary};
    color: ${Colors.white};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  color: ${Colors.white};
  font-weight: ${FontWeight.bold};
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.2);
  padding: 0 84px 0 14px;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 700;
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
  padding: 0 10px;
  border-radius: ${BorderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(245, 230, 179, 0.12);
  color: rgba(255, 255, 255, 0.92);
  font-weight: 800;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: rgba(245, 230, 179, 0.16);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

export default SearchForm;
