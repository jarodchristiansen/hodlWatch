import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { numberWithCommas } from "../../../../../helpers/formatters/thousands";

interface PairBlockProps {
  data: PairData;
  id?: string;
}

interface PairData {
  FULLNAME: string;
  ID: string;
  MKTCAPPENALTY: number;
  NAME: string;
  SUPPLY: number;
  SYMBOL: string;
  VOLUME24HOURTO: number;
}

const PairBlock = (props: PairBlockProps) => {
  const { data, id } = props;

  const router = useRouter();

  const routeUser = () => {
    router.push(`/assets/${data?.SYMBOL.toLowerCase()}`);
  };

  return (
    <PairBlockContainer>
      <h6 className="pointer-link block-header" onClick={routeUser}>
        {data?.FULLNAME}
      </h6>
      <h6>
        {" "}
        <span className="label">Total Supply:</span>{" "}
        {numberWithCommas(data?.SUPPLY, 14)}
      </h6>

      <h6>
        <span className="label">Volume (24hr):</span>
        {numberWithCommas(data?.VOLUME24HOURTO, 8)} ({id.toUpperCase()})
      </h6>
    </PairBlockContainer>
  );
};

const PairBlockContainer = styled.div`
  text-align: center;
  padding: 1rem 1rem;
  border: 2px solid gray;
  width: fit-content;
  min-width: 12rem;
  border-radius: 12px;
  box-shadow: 2px 4px 8px gray;

  .block-header {
    font-weight: bold;
  }

  .label {
    display: flex;
    white-space: nowrap;
    text-align: center;
    justify-content: center;
    font-weight: bold;
    padding-top: 0.5rem;
  }
`;

export default PairBlock;
