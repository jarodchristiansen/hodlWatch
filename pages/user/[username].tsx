import SideMenu from "@/components/commons/sidebar-nav";
import PortfolioMain from "@/components/portfolio/PortfolioMain";
// import PriceScreener from "@/components/commons/screener";
import EditUserDetails from "@/components/user/edit-user-details";
import { GET_USER } from "@/helpers/queries/user/index";
import { Colors, MediaQueries } from "@/styles/variables";
import { useLazyQuery } from "@apollo/client";
// import { getSession, useSession } from "@web3modal/react";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

/**
 *
 * @returns User Profile Page with edit/profile pages connected as query strings
 */
const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  // const { account, isReady } = useAccount();

  //   const [walletIsConnected, setWalletIsConnected] = useState(false);
  // const { isOpen, open, close } = useConnectModal();

  const [
    fetchUserDetails,
    { data, loading: dataLoading, error, refetch, fetchMore },
  ] = useLazyQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  const router = useRouter();

  const slug = useMemo(() => {
    if (!router?.query?.username) return "";

    if (router?.query?.username) {
      fetchUserDetails({
        variables: {
          id: router.query.username,
        },
      });
    }

    return router.query.username;
    // @ts-ignore: username customized to be in session from database strategy
  }, [
    // @ts-ignore
    fetchUserDetails,
    router?.query?.username,
  ]);

  // @ts-ignore next-auth v3 type structure issue
  let id = session?.user?.username;

  const isUsersProfile = id == slug;

  useEffect(() => {
    if (data?.getUser) {
      setUser(data.getUser);
    }
  }, [data?.getUser]);

  // const walletIsConnected = useMemo(() => {
  //   if (!account.status) return false;

  //   return account.status !== "disconnected" && account.status !== "connecting"
  //     ? true
  //     : false;
  // }, [account]);

  // const {
  //   data: tokenData,
  //   error: fetchTokenError,
  //   isLoading: fetchTokensLoading,
  //   refetch: refetchTokoenData,
  // } = useBalance({ addressOrName: account?.address });

  const navigateToAssetPage = useCallback(
    (favorite) => {
      router.push(
        `/assets/${favorite.symbol.toLowerCase()}?name=${favorite.title}`
      );
    },
    [router]
  );

  const userFavoritesList = useMemo(() => {
    if (!data?.getUser?.favorites) return [];

    return data.getUser.favorites.map((favorite, idx) => {
      return (
        <div className="favorites-row" key={favorite.title}>
          <Image
            src={favorite.image}
            height={50}
            width={50}
            alt="block-logo"
            className="pointer-link favorites-image"
            onClick={() => navigateToAssetPage(favorite)}
            unoptimized={true}
          />
          <h5
            className="pointer-link"
            onClick={() => navigateToAssetPage(favorite)}
          >
            {favorite.title}-{favorite.symbol}
          </h5>
        </div>
      );
    });
  }, [data?.getUser?.favorites, navigateToAssetPage]);

  const viewState = useMemo(() => {
    if (!router.query?.view) return "Main";

    return router.query?.view;
  }, [router.query?.view]);

  const routeToMain = () => {
    router.push(`/user/${id}`);
  };

  const routeEditUser = () => {
    router.push(`/user/${id}?view=edit_user`);
  };

  const routeToPortfolio = () => {
    router.push(`/user/${id}?view=portfolio`);
  };

  const redirectNonUser = useCallback(() => {
    if (viewState === "edit_user" || viewState === "portfolio") {
      router.push("/");
    }
  }, []);

  const navLinks = [
    { name: "Profile", stateChanger: () => routeToMain() },
    { name: "Edit Account", stateChanger: () => routeEditUser() },
    { name: "Portfolio", stateChanger: () => routeToPortfolio() },
  ];

  useEffect(() => {
    if (!isUsersProfile && !!user) {
      redirectNonUser();
    }
  }, [isUsersProfile, viewState, user, redirectNonUser]);

  return (
    <PageWrapper>
      <Head>
        <link rel="icon" type="image/png" href="/images/cube-svgrepo-com.svg" />
        <title>Profile</title>
      </Head>

      <CentralWrapper>
        {isUsersProfile && (
          <div className="side-menu-container">
            <SideMenu navLinks={navLinks} />
          </div>
        )}

        <div className="page-wrapper">
          {viewState === "Main" && (
            <>
              <div className="switch-container">
                <button className="standardized-button" onClick={routeEditUser}>
                  Edit Profile
                </button>
                <button
                  className="standardized-button"
                  onClick={routeToPortfolio}
                >
                  View Portfolio
                </button>
              </div>

              <UserDetailsCard>
                <div className="detail-header">
                  <h2>User Details</h2>
                </div>

                <div className="detail-row">
                  <h4>Name:</h4>
                  <h4>{user?.name}</h4>
                </div>

                <div className="detail-row">
                  <h4>Email:</h4>
                  <h4>{user?.email}</h4>
                </div>

                {data?.getUser && (
                  <>
                    <div className="detail-row">
                      <h4>Username:</h4>
                      <h4>{data.getUser?.username}</h4>
                    </div>

                    <div className="detail-row">
                      <h4>Profile Pic:</h4>
                      <Image
                        src={data.getUser?.image}
                        height={50}
                        width={50}
                        alt="block-logo"
                        unoptimized={true}
                      />
                    </div>
                  </>
                )}
              </UserDetailsCard>
              {/* 
              {!walletIsConnected && (
                <ConnectWalletCard>
                  <h4>It looks like your wallet isn't connected</h4>
                  <button className="standardized-button" onClick={open}>
                    Connect Your Wallet
                  </button>
                </ConnectWalletCard>
              )}

              {!!walletIsConnected && (
                <ConnectWalletCard onClick={open}>
                  <h6>{account?.address}</h6>
                  <div>
                    <h4>Balance:</h4>
                    <h4>
                      {tokenData?.formatted} {tokenData?.symbol}
                    </h4>
                  </div>
                  <Web3Button />
                </ConnectWalletCard>
              )} */}

              {!!userFavoritesList.length ? (
                <UserFavoritesList>
                  <h4 className="header-text">Favorited Assets</h4>
                  {userFavoritesList}
                </UserFavoritesList>
              ) : (
                <UserFavoritesList>
                  <h4 className="header-text">No Favorited Assets</h4>
                </UserFavoritesList>
              )}
            </>
          )}

          {viewState === "edit_user" && isUsersProfile && (
            <>
              {/* <div className="switch-container">
                <button className="standardized-button" onClick={routeToMain}>
                  Back to Main Page
                </button>
              </div> */}

              <div className="switch-container">
                <button className="standardized-button" onClick={routeToMain}>
                  View Profile
                </button>
                <button
                  className="standardized-button"
                  onClick={routeToPortfolio}
                >
                  View Portfolio
                </button>
              </div>

              <EditUserDetails user={user} fetchedUser={data?.getUser} />
            </>
          )}

          {viewState === "portfolio" && isUsersProfile && (
            <>
              <div className="switch-container">
                <button className="standardized-button" onClick={routeToMain}>
                  View Profile
                </button>
                <button className="standardized-button" onClick={routeEditUser}>
                  Edit Profile
                </button>
              </div>

              <div>
                <PortfolioMain />
              </div>
            </>
          )}
        </div>
      </CentralWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  padding-bottom: 4rem;
`;

const CentralWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  gap: 3rem;

  .side-menu-container {
    display: none;

    @media ${MediaQueries.MD} {
      display: unset;
    }
  }

  .page-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 3rem;
    padding-top: 3rem;
  }

  .switch-container {
    display: flex;
    gap: 1rem;

    @media ${MediaQueries.MD} {
      display: none;
    }
  }

  .back-button {
    align-self: flex-start;
    padding: 0 1rem;
    color: ${Colors.elegant.accentPurple};
    font-weight: bold;
    font-size: 18px;
  }
`;

const ConnectWalletCard = styled.div`
  width: 100%;
  border: 2px solid black;
  border-radius: 14px;
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media ${MediaQueries.MD} {
    width: 30rem;
  }
`;

const UserDetailsCard = styled.div`
  width: 100%;
  border: 2px solid black;
  border-radius: 14px;
  background-color: ${Colors.lightGray};

  .detail-header {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .detail-row {
    padding: 1rem 2rem;
    margin: auto;
    width: 100%;
    display: flex;
    white-space: nowrap;
    justify-content: space-between;
    border-top: 1px solid black;
    gap: 1rem;
    overflow-x: auto;

    ::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }

  @media ${MediaQueries.MD} {
    width: 30rem;
  }
`;

const UserFavoritesList = styled.div`
  width: 100%;
  border: 2px solid black;
  border-radius: 14px;
  max-width: 30rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  max-height: 40rem;
  overflow-y: auto;
  background-color: ${Colors.lightGray};

  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
  }

  .header-text {
    text-align: center;
    padding-bottom: 1rem;
  }

  .favorites-row {
    display: flex;
    white-space: nowrap;
    justify-content: space-between;
    padding: 1rem 1rem;
    border-top: 1px solid black;

    .favorites-image {
      border-radius: 30px;
      border: 1px solid gray;
    }
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
    props: { session },
  };
}

export default ProfilePage;
