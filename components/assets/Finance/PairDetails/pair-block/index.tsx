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

  console.log({ data }, "In PAIRBLOCK ITSELF");

  const router = useRouter();

  const routeUser = () => {
    router.push(`/assets/${data?.SYMBOL.toLowerCase()}`);
  };

  return (
    <PairBlockContainer>
      <h6 className="pointer-link" onClick={routeUser}>
        {data?.FULLNAME}
      </h6>
      <h6>{data?.NAME}</h6>
      <h6>{data?.SYMBOL}</h6>
      <h6>{numberWithCommas(data?.SUPPLY)} - Total Supply</h6>
      <h6>
        {numberWithCommas(data?.VOLUME24HOURTO)} - In {id.toUpperCase()}
      </h6>
    </PairBlockContainer>
  );
};

const PairBlockContainer = styled.div`
  text-align: center;
  padding: 1rem 1rem;
  border: 2px solid black;
  width: fit-content;
  min-width: 12rem;
`;

export default PairBlock;
