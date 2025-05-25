import LoadingSpinner from "@/components/commons/animations/LoadingSpinner";
import PaginationComponent from "@/components/commons/pagination/Pagination";
import ScrollToTop from "@/components/commons/scroll-to-top/ScrollToTop";
import SearchForm from "@/components/forms/SearchForm/SearchForm";
import SEOHead from "@/components/seo/SEOHead";
import { GET_ASSET, GET_ASSETS } from "@/helpers/queries/assets";
import { Colors, MediaQueries } from "@/styles/variables";
import { useLazyQuery } from "@apollo/client";
import { getSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import client from "../../apollo-client";
import AssetsContainer from "../../components/assets/AssetsContainer/AssetsContainer";
import { GET_COLLECTIVE_STATS } from "../../helpers/queries/collective";

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
  }, [fetchAssets]);

  useEffect(() => {
    setAssetData(data?.getAsset);
  }, [data?.getAsset]);

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
  }, [data, loading, assetData, session]);

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
      <SEOHead
        isHomePage={true}
        metaTitle={
          "Mesh: Top Cryptocurrency Assets by Marketing Cap and market leading indicators for them"
        }
        metaDescription={
          "Mesh is a web3 data explorer that provides real-time data on the top cryptocurrency assets by market cap and market leading indicators for them."
        }
        previewImage="/assets/assets-page.png"
      />

      {loading && (
        <div className={"container text-center"}>
          <LoadingSpinner />
        </div>
      )}

      <div className="main-container">
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

        {/* <div>
          <CryptoHeatMap />
        </div> */}

        <div>
          {!!renderedAssets && renderedAssets}

          <ScrollToTop scrollThreshold={90} />

          {error && (
            <div>
              <span>Error Loading Assets, please refresh the page</span>
            </div>
          )}
        </div>

        {!error && (
          <div className={"pagination-container"}>
            <PaginationComponent
              active={offsetState}
              setOffsetState={setOffsetState}
              fetchMore={fetchMore}
              refetch={refetch}
            />
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

const CollectiveStatsHeader = styled.div`
  padding: 2rem 1.5rem;
  background: linear-gradient(
    90deg,
    ${Colors.primary} 0%,
    ${Colors.charcoal} 100%
  );
  color: ${Colors.accent};
  border-radius: 18px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 24px 0 rgba(20, 20, 40, 0.18);
  text-align: center;
  justify-content: center;
  border: 1px solid ${Colors.accent}33;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: ${Colors.accent};
    letter-spacing: 0.5px;
  }

  .mid-row {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    text-align: center;
    justify-content: center;
    padding: 1.5rem 0.5rem;
    margin: 0 -1.5rem;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(
        135deg,
        ${Colors.charcoal} 60%,
        ${Colors.primary} 100%
      );
      border-radius: 12px;
      min-width: 140px;
      padding: 1.25rem 1rem;
      border: 1px solid ${Colors.accent}33;
      box-shadow: 0 2px 12px 0 rgba(20, 20, 40, 0.1);
      color: ${Colors.accent};
      margin: 0 0.5rem;

      h5 {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: ${Colors.accent};
        letter-spacing: 0.2px;
      }
      span {
        font-size: 1.25rem;
        font-weight: 700;
        color: #fffbe6;
      }
    }
  }
`;

const PageWrapper = styled.div`
  padding-top: 48px;
  min-height: 100vh;
  background: linear-gradient(
    120deg,
    ${Colors.primary} 0%,
    ${Colors.charcoal} 100%
  );

  .main-container {
    display: flex;
    flex-direction: column;
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1.5rem;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    ${Colors.charcoal} 60%,
    ${Colors.primary} 100%
  );
  border: 1px solid ${Colors.accent}33;
  box-shadow: 0 2px 12px 0 rgba(20, 20, 40, 0.1);
  text-align: right;
  white-space: nowrap;
  justify-content: flex-end;
  padding: 1.25rem 2rem;
  margin-bottom: 1.5rem;

  @media ${MediaQueries.MD} {
    padding: 1.25rem 4rem;
  }
`;

const AssetContainerWrapper = styled.div`
  padding: 2rem 0;
  background: transparent;
  border-radius: 16px;
  @media ${MediaQueries.MD} {
    padding: 48px 0;
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
