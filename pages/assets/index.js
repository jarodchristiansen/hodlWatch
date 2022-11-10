import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import GET_ASSETS from "../../helpers/queries/getAssets";
import React, { useState, useEffect } from "react";
import AssetsContainer from "../../components/assets/AssetsContainer";
import GET_ASSET from "../../helpers/queries/getAsset";
import client from "../../apollo-client";
import SearchForm from "../../components/forms/SearchForm";
import PaginationComponent from "../../components/commons/Pagination";
import { render } from "react-dom";
import { useSession, getSession } from "next-auth/client";
import LoadingSpinner from "../../components/commons/animations/LoadingSpinner";
import PriceScreener from "../../components/commons/screener";

const AssetsPage = () => {
  const [offsetState, setOffsetState] = useState(1);
  const [limitState, setLimitState] = useState(25);
  const { session, status } = useSession();

  console.log({ session, status });

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_ASSETS, {
    variables: {
      offset: 1,
      limit: 25,
    },
    fetchPolicy: "cache-first",
  });
  const [assetData, setAssetData] = useState(data);
  const [getAsset] = useLazyQuery(GET_ASSET);
  const [queryValue, setQueryValue] = useState("");

  useEffect(() => {
    setAssetData(data?.getAsset);
  }, []);

  const filterAssets = async (e) => {
    e?.preventDefault();

    console.log("e in filterAssets", e);

    const results = await getAsset({
      variables: { symbol: queryValue },
    });

    if (error) {
      console.log(error);
    } else {
      console.log("This is filterAssets data", results);
      // return data;
      setAssetData(results.data.getAsset);
    }
  };

  const renderAssets = () => {
    console.log("running renderAssets", data);
    if (data) {
      return (
        <div>
          <AssetsContainer assets={assetData || data?.getAssets} />
        </div>
      );
    } else if (!data && !loading) {
      console.log({ data, loading });
    }
  };

  return (
    <>
      <PriceScreener />

      <div className={"container"}>
        <div className={"w-100 border border-1 border-bottom"}>
          <div
            className={
              "search-form-container d-flex justify-content-center align-items-center flex-wrap mt-4"
            }
          >
            <SearchForm
              queryValue={queryValue}
              setQueryValue={setQueryValue}
              filterAssets={(e) => filterAssets(e)}
            />
          </div>
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
        </div>

        <div>
          {loading && (
            <div className={"container text-center"}>
              <LoadingSpinner />
            </div>
          )}
          {/*{data && (*/}
          {/*  <div>*/}
          {/*    <AssetsContainer assets={data?.getAssets} />*/}
          {/*  </div>*/}
          {/*)}*/}
          {!loading && renderAssets()}
          {error && <div>Error Boi - {console.log(error)}</div>}
        </div>
      </div>
    </>
  );
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

  return {
    props: { session },
  };
}

export default AssetsPage;
