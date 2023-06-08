import { useLazyQuery } from "@apollo/client";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import AssetsContainer from "../../components/assets/AssetsContainer/AssetsContainer";
import LoadingSpinner from "@/components/commons/animations/LoadingSpinner";
import PaginationComponent from "@/components/commons/pagination/Pagination";
import SearchForm from "@/components/forms/SearchForm/SearchForm";
import GET_ASSET from "@/helpers/queries/assets/getAsset";
import { GET_ASSETS } from "@/helpers/queries/assets/getAssets";
import { MediaQueries } from "@/styles/variables";
import { GET_COLLECTIVE_STATS } from "../../helpers/queries/collective";
import client from "../../apollo-client";
import TopAssetsRow from "@/components/assets/TopAssetsRow";

/**
 *
 * @param userSession: session returned from Next-Auth ssr query
 * @returns AssetPage that allows for searching/filtering of digital assets
 */
const AssetsPage = ({ userSession: session, collectiveData }) => {
  const [offsetState, setOffsetState] = useState<number>(1);
  const [limitState, setLimitState] = useState(9);

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

  console.log({ data }, "from FETCH ASSETS");

  const filterAssets = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const results = await getAsset({
      variables: { symbol: queryValue },
    });

    if (error) {
      console.log(error);
    } else {
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

  // const loadMoreFunction = () => {
  //   // refetch({ offset: offsetState - 1 });
  //   fetchMore({
  //     offset: offsetState,
  //   });
  // };

  const collectiveDataComponents = useMemo(() => {
    if (!collectiveData?.data?.getCollectiveStats?.asset_count) return [];

    let data = collectiveData?.data?.getCollectiveStats;
    return (
      <CollectiveStatsHeader data-testid="collective-stats-header">
        <div>
          <h3>24hr Snapshot</h3>
        </div>

        <div className="mid-row">
          <div>
            <h5>User Count</h5>
            <span>{data.user_count}</span>
          </div>
          <div>
            <h5>Followed Assets</h5>
            <span>{data.followed_assets}</span>
          </div>
          <div>
            <h5>Number of Assets</h5>
            <span>{data.asset_count}</span>
          </div>
        </div>
      </CollectiveStatsHeader>
    );
  }, [collectiveData]);

  return (
    <PageWrapper>
      <Head>
        <link rel="icon" type="image/png" href="/images/cube-svgrepo-com.svg" />
        <title>Assets</title>
      </Head>

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

        {/* {!!collectiveDataComponents && collectiveDataComponents} */}

        {/* {!!collectiveData?.data?.getCollectiveStats?.top_assets?.length && (
          <div data-testid="top-assets-row">
            <TopAssetsRow
              topAssets={collectiveData?.data?.getCollectiveStats?.top_assets}
            />
          </div>
        )} */}

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
              <span>Error Loading Assets, please refresh the page</span>
            </div>
          )}
        </div>
      </>
    </PageWrapper>
  );
};

const CollectiveStatsHeader = styled.div`
  padding: 2rem;
  background-color: #faf5ff;
  text-align: center;
  justify-content: center;

.mid-row {
  display: flex;
  gap: 1rem;
  overflow-x: scroll;
  text-align: center;
  justify-content: center;
  gap: 1rem;
  padding 2rem;

  margin-left: -2rem;
  margin-right: -2rem;

  @media ${MediaQueries.MD} {
    margin-left: unset;
    margin-right: unset;
  }

  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  div {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 8px;
    justify-content: center;
    padding: 1rem;
    border: 1px solid black;
    box-shadow: 2px 4px 8px lightgray;

    span {
      font-weight: bold;
    }
  }
}
 
`;

const PageWrapper = styled.div`
  min-height: 100vh;
`;

const FilterBar = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0rem;
  z-index: 100;
  border-bottom: 1px solid gray;

  text-align: right;
  white-space: nowrap;
  justify-content: flex-end;

  padding: 1.5rem 2rem;

  @media ${MediaQueries.MD} {
    position: relative;
    padding: 1.5rem 6rem;
  }
`;

const AssetContainerWrapper = styled.div`
  padding: 2rem 0;

  @media ${MediaQueries.MD} {
    padding: 2rem 6rem;
  }
`;

const getCollectiveStats = async (context) => {
  const result = await client.query({
    query: GET_COLLECTIVE_STATS,
  });

  return { data: result };
};

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

  let data = null;

  const response = await getCollectiveStats(context);

  data = response.data;

  return {
    props: { userSession: session, collectiveData: data },
  };
}

export default AssetsPage;
