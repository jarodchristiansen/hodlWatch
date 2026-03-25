import LoadingSpinner from "@/components/commons/animations/LoadingSpinner";
import PaginationComponent from "@/components/commons/pagination/Pagination";
import ScrollToTop from "@/components/commons/scroll-to-top/ScrollToTop";
import SearchForm from "@/components/forms/SearchForm/SearchForm";
import SEOHead from "@/components/seo/SEOHead";
import { GET_ASSET, GET_ASSETS } from "@/helpers/queries/assets";
import { BorderRadius, Colors, FontFamily, FontWeight, MediaQueries } from "@/styles/variables";
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
const AssetsPage = ({ userSession: session, collectiveData: _collectiveData }) => {
  const [offsetState, setOffsetState] = useState<number>(1);
  const [limitState] = useState(12);

  const [fetchAssets, { data, loading, error, refetch, fetchMore }] =
    useLazyQuery(GET_ASSETS, {
      variables: {
        offset: 1,
        limit: 12,
      },
      fetchPolicy: "cache-and-network",
    });

  const [assetData, setAssetData] = useState<any>(null);
  const [getAsset] = useLazyQuery(GET_ASSET);
  const [queryValue, setQueryValue] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [sortKey, setSortKey] = useState<"rank" | "price" | "mcap">("rank");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  useEffect(() => {
    // Keep browse list in sync with the latest query results when not in search mode.
    if (!isSearchMode && data?.getAssets) {
      setAssetData(null);
    }
  }, [data?.getAssets, isSearchMode]);

  const normalizeToArray = (maybeAsset: any) => {
    if (!maybeAsset) return [];
    if (Array.isArray(maybeAsset)) return maybeAsset;
    return [maybeAsset];
  };

  const filterAssets = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const q = (queryValue || "").trim();
    if (!q) {
      setIsSearchMode(false);
      setAssetData(null);
      setOffsetState(1);
      await refetch?.({ offset: 1, limit: limitState });
      return;
    }

    try {
      setIsSearchMode(true);
      const results = await getAsset({ variables: { symbol: q } });

      // `useLazyQuery` returns `{ data, error }` for this invocation; don't rely
      // on the other query's `error` state.
      if (results?.error) {
        // eslint-disable-next-line no-console
        console.error(results.error);
        setAssetData(null);
        return;
      }

      setAssetData(results?.data?.getAsset ?? null);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setAssetData(null);
    }
  };

  const clearSearch = async () => {
    setQueryValue("");
    setIsSearchMode(false);
    setAssetData(null);
    setOffsetState(1);
    await refetch?.({ offset: 1, limit: limitState });
  };

  const baseAssets = useMemo(() => {
    return isSearchMode ? normalizeToArray(assetData) : data?.getAssets || [];
  }, [assetData, data?.getAssets, isSearchMode]);

  const sortedAssets = useMemo(() => {
    const assets = [...(baseAssets || [])];
    const safeNum = (v: any) => (typeof v === "number" && !Number.isNaN(v) ? v : null);

    if (sortKey === "rank") {
      assets.sort((a, b) => (safeNum(a?.market_cap_rank) ?? 9e15) - (safeNum(b?.market_cap_rank) ?? 9e15));
    } else if (sortKey === "price") {
      assets.sort((a, b) => (safeNum(b?.current_price) ?? -9e15) - (safeNum(a?.current_price) ?? -9e15));
    } else if (sortKey === "mcap") {
      assets.sort((a, b) => (safeNum(b?.market_cap) ?? -9e15) - (safeNum(a?.market_cap) ?? -9e15));
    }
    return assets;
  }, [baseAssets, sortKey]);

  const canGoPrev = !isSearchMode && offsetState > 1;
  const canGoNext = !isSearchMode && (data?.getAssets?.length || 0) >= limitState;

  const loadMore = async () => {
    if (isSearchMode) return;
    if (!canGoNext) return;

    const nextOffset = offsetState + 1;
    await fetchMore?.({
      variables: { offset: nextOffset, limit: limitState },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.getAssets?.length) return prev;
        return {
          ...prev,
          getAssets: [...(prev?.getAssets || []), ...(fetchMoreResult.getAssets || [])],
        };
      },
    });
    setOffsetState(nextOffset);
  };

  const renderedAssets = useMemo(() => {
    if (!data && !loading) {
      return [];
    }

    if (data || isSearchMode) {
      return (
        <AssetContainerWrapper>
          <AssetsContainer
            assets={sortedAssets}
            session={session}
            viewMode={viewMode}
          // loadMore={loadMoreFunction}
          />
        </AssetContainerWrapper>
      );
    }
  }, [data, loading, isSearchMode, sortedAssets, session, viewMode]);

  // const loadMoreFunction = () => {
  //   // refetch({ offset: offsetState - 1 });
  //   fetchMore({
  //     offset: offsetState,
  //   });
  // };

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

      {loading && <LoadingSpinner overlay message="Loading assets" />}

      <div className="main-container">
        <ExplorerHeader>
          <div className="title-row">
            <div>
              <h1>Explore assets</h1>
              <p className="subcopy">
                Browse top assets by market cap rank, or jump straight to a ticker.
              </p>
            </div>
            <div className="context-chip" aria-live="polite">
              {isSearchMode ? (
                <span>
                  Result for <strong>{(queryValue || "").trim().toUpperCase()}</strong>
                </span>
              ) : (
                <span>
                  Page <strong>{offsetState}</strong>
                </span>
              )}
            </div>
          </div>

          <ExplorerControls>
            <SearchForm
              queryValue={queryValue}
              setQueryValue={setQueryValue}
              filterAssets={(e) => filterAssets(e)}
              onClear={clearSearch}
              isSearchMode={isSearchMode}
            />

            <ControlGroup aria-label="Browse controls">
              <Control>
                <label htmlFor="asset-sort">Sort</label>
                <select
                  id="asset-sort"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as any)}
                >
                  <option value="rank">Market cap rank</option>
                  <option value="mcap">Market cap</option>
                  <option value="price">Price</option>
                </select>
              </Control>

              <SegmentedControl aria-label="View mode">
                <button
                  type="button"
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </button>
                <button
                  type="button"
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                >
                  List
                </button>
              </SegmentedControl>
            </ControlGroup>
          </ExplorerControls>
        </ExplorerHeader>

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
          {!loading && !error && sortedAssets?.length === 0 && (
            <EmptyState>
              <h3>No assets found</h3>
              <output aria-live="polite">
                Try a different ticker symbol, or clear search to browse top assets.
              </output>
              {isSearchMode && (
                <button type="button" onClick={clearSearch}>
                  Back to browse
                </button>
              )}
            </EmptyState>
          )}

          {!!renderedAssets && renderedAssets}

          <ScrollToTop scrollThreshold={90} />

          {error && (
            <div>
              <span>Error Loading Assets, please refresh the page</span>
            </div>
          )}
        </div>

        {!error && !isSearchMode && (
          <BottomControls>
            <div className={"pagination-container"}>
              <PaginationComponent
                active={offsetState}
                setOffsetState={setOffsetState}
                refetch={refetch}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
              />
            </div>

            {/* <LoadMoreRow>
              <button type="button" onClick={loadMore} disabled={!canGoNext || loading}>
                {canGoNext ? "Load more" : "End of results"}
              </button>
            </LoadMoreRow> */}
          </BottomControls>
        )}
      </div>
    </PageWrapper>
  );
};

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

const ExplorerHeader = styled.div`
  border-radius: ${BorderRadius.xlarge};
  padding: 22px 18px;
  border: 1px solid rgba(212, 168, 75, 0.18);
  background: rgba(26, 62, 114, 0.22);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.16);

  @media ${MediaQueries.MD} {
    padding: 28px 26px;
  }

  .title-row {
    display: flex;
    flex-direction: column;
    gap: 14px;

    @media ${MediaQueries.MD} {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
    }
  }

  h1 {
    margin: 0;
    font-family: ${FontFamily.headline};
    font-size: 2.1rem;
    font-weight: 800;
    color: ${Colors.accent};
    letter-spacing: 0.5px;
  }

  .subcopy {
    margin: 8px 0 0 0;
    color: rgba(255, 255, 255, 0.86);
    line-height: 1.6;
    max-width: 62ch;
  }

  .context-chip {
    align-self: flex-start;
    border-radius: 999px;
    padding: 10px 14px;
    background: rgba(0, 0, 0, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
    strong {
      color: ${Colors.accent};
      font-weight: 800;
    }
  }
`;

const ExplorerControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 18px;

  @media ${MediaQueries.MD} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 18px;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: space-between;

  @media ${MediaQueries.MD} {
    justify-content: flex-end;
    flex-wrap: nowrap;
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;

  label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.82);
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  select {
    height: 44px;
    border-radius: 12px;
    padding: 0 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(0, 0, 0, 0.2);
    color: ${Colors.white};
    font-weight: 700;
    outline: none;

    &:focus-visible {
      outline: 2px solid ${Colors.accent};
      outline-offset: 2px;
    }
  }
`;

const SegmentedControl = styled.fieldset`
  display: flex;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
  overflow: hidden;
  height: 44px;

  button {
    height: 44px;
    padding: 0 14px;
    border: none;
    background: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.85);
    font-weight: 800;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
      background: rgba(245, 230, 179, 0.14);
      color: ${Colors.white};
    }

    &.active {
      background: ${Colors.accent};
      color: ${Colors.charcoal};
    }

    &:focus-visible {
      outline: 2px solid ${Colors.accent};
      outline-offset: -2px;
    }
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

const EmptyState = styled.div`
  border-radius: ${BorderRadius.xlarge};
  padding: 22px 18px;
  border: 1px solid rgba(212, 168, 75, 0.18);
  background: rgba(0, 0, 0, 0.18);
  color: ${Colors.white};
  text-align: center;

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.25rem;
    font-weight: 800;
    color: ${Colors.accent};
  }

  output {
    display: block;
    margin: 0 auto 14px auto;
    max-width: 60ch;
    color: rgba(255, 255, 255, 0.86);
    line-height: 1.6;
    font: inherit;
  }

  button {
    height: 44px;
    padding: 0 18px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(245, 230, 179, 0.14);
    color: ${Colors.white};
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.15s ease, background 0.15s ease;

    &:hover {
      transform: translateY(-1px);
      background: rgba(245, 230, 179, 0.18);
    }

    &:focus-visible {
      outline: 2px solid ${Colors.accent};
      outline-offset: 2px;
    }
  }
`;

const BottomControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding-bottom: 56px;
`;

const LoadMoreRow = styled.div`
  display: flex;
  justify-content: center;

  button {
    height: 44px;
    padding: 0 18px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(0, 0, 0, 0.2);
    color: ${Colors.white};
    font-weight: ${FontWeight.bold};
    cursor: pointer;
    transition: background 0.15s ease, transform 0.15s ease;

    &:hover:enabled {
      background: rgba(245, 230, 179, 0.14);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid ${Colors.accent};
      outline-offset: 2px;
    }
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
