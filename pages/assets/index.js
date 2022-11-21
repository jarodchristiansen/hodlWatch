import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import GET_ASSETS from "../../helpers/queries/getAssets";
import React, { useState, useEffect, useRef } from "react";
import AssetsContainer from "../../components/assets/AssetsContainer";
import GET_ASSET from "../../helpers/queries/getAsset";
import SearchForm from "../../components/forms/SearchForm/SearchForm";
import PaginationComponent from "../../components/commons/Pagination";
import { useSession, getSession } from "next-auth/client";
import LoadingSpinner from "../../components/commons/animations/LoadingSpinner";
import PriceScreener from "../../components/commons/screener";
import styled from "styled-components";

const AssetsPage = () => {
  const [offsetState, setOffsetState] = useState(1);
  const [limitState, setLimitState] = useState(9);
  const { session, status } = useSession();

  console.log({ session, status });

  const [fetchAssets, { data, loading, error, refetch, fetchMore }] =
    useLazyQuery(GET_ASSETS, {
      variables: {
        offset: 1,
        limit: 9,
      },
      fetchPolicy: "cache-first",
    });
  const [assetData, setAssetData] = useState(data);
  const [getAsset] = useLazyQuery(GET_ASSET);
  const [queryValue, setQueryValue] = useState("");

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    setAssetData(data?.getAsset);
  }, [data?.getAsset]);

  const filterAssets = async (e) => {
    e?.preventDefault();

    const results = await getAsset({
      variables: { symbol: queryValue },
    });

    if (error) {
      console.log(error);
    } else {
      // return data;
      setAssetData(results.data.getAsset);
    }
  };

  const renderAssets = () => {
    if (data) {
      return (
        <div>
          <AssetsContainer
            assets={assetData || data?.getAssets}
            loadMore={loadMoreFunction}
          />
        </div>
      );
    } else if (!data && !loading) {
      // console.log({ data, loading });
    }
  };

  const loadMoreFunction = () => {
    // refetch({ offset: offsetState - 1 });
    fetchMore({
      offset: offsetState,
    });
  };

  return (
    <>
      <PriceScreener />

      <div className={"container"}>
        <SearchBarContainer>
          <SearchForm
            queryValue={queryValue}
            setQueryValue={setQueryValue}
            filterAssets={(e) => filterAssets(e)}
          />
        </SearchBarContainer>

        <div>
          {loading && (
            <div className={"container text-center"}>
              <LoadingSpinner />
            </div>
          )}

          {!loading && renderAssets()}

          {data && !loading && (
            <div
              className={
                "pagination-container d-flex justify-content-center align-items-center flex-wrap mt-3"
              }
            >
              <PaginationComponent
                active={offsetState}
                setOffsetState={setOffsetState}
                fetchMore={fetchMore}
                refetch={refetch}
              />
            </div>
          )}

          {error && (
            <div>
              Error Loading Assets, please refresh the page {console.log(error)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const SearchBarContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
  padding: 2rem 2rem;
  text-align: right;
  white-space: nowrap;
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { session },
  };
}

export default AssetsPage;
