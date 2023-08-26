import { numberWithCommas } from "@/helpers/formatters/thousands";
import { Colors } from "@/styles/variables";
import { useRouter } from "next/router";
import styled from "styled-components";

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

/**
 *
 * @param data: The pair data associated with each pair compared to the main asset for the page
 * @param id?: the id of the main asset we are comparing to
 * @returns PairBlock that renders the volume of the trading pair compared to main asset.
 */
const PairBlock = (props: PairBlockProps) => {
  const { data, id } = props;

  const router = useRouter();

  const routeUser = () => {
    router.push(`/assets/${data?.SYMBOL.toLowerCase()}/?name=${data?.NAME}`);
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
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem 1rem;
  border: 2px solid gray;
  /* width: fit-content; */
  min-width: 8rem;
  border-radius: 10px;
  background-color: ${Colors.lightGray};
  border: 2px solid ${Colors.modern.accentBlue};

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
