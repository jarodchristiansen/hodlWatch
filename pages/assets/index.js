import { useLazyQuery } from "@apollo/client";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import AssetsContainer from "../../components/assets/AssetsContainer";
import LoadingSpinner from "@/components/commons/animations/LoadingSpinner";
import PaginationComponent from "@/components/commons/Pagination";
import PriceScreener from "@/components/commons/screener";
import SearchForm from "@/components/forms/SearchForm/SearchForm";
import GET_ASSET from "@/helpers/queries/assets/getAsset";
import { GET_ASSETS } from "@/helpers/queries/assets/getAssets";
import { GET_USER } from "@/helpers/queries/user";
import { MediaQueries } from "@/styles/MediaQueries";

const AssetsPage = ({ userSession: session }) => {
  const [offsetState, setOffsetState] = useState(1);
  const [limitState, setLimitState] = useState(9);
  // const { session, status } = useSession();

  const [fetchAssets, { data, loading, error, refetch, fetchMore }] =
    useLazyQuery(GET_ASSETS, {
      variables: {
        offset: 1,
        limit: 9,
      },
      fetchPolicy: "cache-and-network",
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

  const renderedAssets = useMemo(() => {
    if (!data && !loading) {
      return [];
    }

    if (data) {
      return (
        <AssetContainerWrapper>
          <AssetsContainer
            assets={assetData || data?.getAssets}
            session={session}
            // loadMore={loadMoreFunction}
          />
        </AssetContainerWrapper>
      );
    }
  }, [data, loading, assetData]);

  const loadMoreFunction = () => {
    // refetch({ offset: offsetState - 1 });
    fetchMore({
      offset: offsetState,
    });
  };

  return (
    <PageWrapper>
      <Head>
        <link rel="icon" type="image/png" href="/images/cube-svgrepo-com.svg" />
        <title>Assets</title>
      </Head>

      <PriceScreener />

      {loading && (
        <div className={"container text-center"}>
          <LoadingSpinner />
        </div>
      )}

      <>
        <FilterBar>
          <SearchForm
            queryValue={queryValue}
            setQueryValue={setQueryValue}
            filterAssets={(e) => filterAssets(e)}
          />
        </FilterBar>

        <div>
          {!!renderedAssets && renderedAssets}

          {!error && (
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
      </>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
`;

const FilterBar = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 4.5rem;
  z-index: 100;
  border-bottom: 1px solid gray;
  box-shadow: 2px 4px 8px gray;

  text-align: right;
  white-space: nowrap;
  justify-content: flex-end;

  background-color: white;
  padding: 1.5rem 2rem;
  width: 100%;

  @media ${MediaQueries.MD} {
    top: 2.8rem;
    padding: 1.5rem 6rem;
  }
`;

const AssetContainerWrapper = styled.div`
  padding: 2rem 0;

  @media ${MediaQueries.MD} {
    padding: 2rem 6rem;
  }
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { userSession: session },
  };
}

export default AssetsPage;
