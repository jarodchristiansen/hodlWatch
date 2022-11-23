import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import GET_ASSETS from "../../helpers/queries/assets/getAssets";
import React, { useState, useEffect, useRef, useMemo } from "react";
import AssetsContainer from "../../components/assets/AssetsContainer";
import GET_ASSET from "../../helpers/queries/assets/getAsset";
import SearchForm from "../../components/forms/SearchForm/SearchForm";
import PaginationComponent from "../../components/commons/Pagination";
import { useSession, getSession } from "next-auth/client";
import LoadingSpinner from "../../components/commons/animations/LoadingSpinner";
import PriceScreener from "../../components/commons/screener";
import styled from "styled-components";
import Head from "next/head";
import { GET_USER } from "../../helpers/queries/user/getUserAccount";

const AssetsPage = () => {
  const [offsetState, setOffsetState] = useState(1);
  const [limitState, setLimitState] = useState(9);
  const [session, { loading: sessionLoading }] = useSession();

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
  const [user, setUser] = useState();

  const [
    fetchUserDetails,
    {
      data: UserData,
      loading: dataLoading,
      error: FetchUserDataError,
      refetch: RefetchUser,
    },
  ] = useLazyQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserDetails({
        variables: {
          email: session.user.email,
        },
      });
    }
  }, [loading]);

  useEffect(() => {
    setAssetData(data?.getAsset);
  }, [data?.getAsset]);

  useEffect(() => {
    if (!UserData?.getUser) return;

    setUser(UserData?.getUser);
  }, [UserData?.getUser]);

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
            user={user}
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
      <Head>
        <title>Assets</title>
      </Head>

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
