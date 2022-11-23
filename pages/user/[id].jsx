import styled from "styled-components";
import { useSession } from "next-auth/client";
import { useEffect, useMemo, useState } from "react";
import { MediaQueries } from "../../styles/MediaQueries";
import {
  Web3Button,
  useConnectModal,
  useAccount,
  useBalance,
  useProvider,
  useSigner,
} from "@web3modal/react";
import PriceScreener from "../../components/commons/screener";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../helpers/queries/user/getUserAccount";
import Image from "next/image";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const [session, loading] = useSession();
  const { account, isReady } = useAccount();

  const [user, setUser] = useState();
  //   const [walletIsConnected, setWalletIsConnected] = useState(false);
  const { isOpen, open, close } = useConnectModal();

  const [
    fetchUserDetails,
    { data, loading: dataLoading, error, refetch, fetchMore },
  ] = useLazyQuery(GET_USER, {
    variables: {
      email: user?.email,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [loading]);

  useEffect(() => {
    if (user?.email) {
      fetchUserDetails();
    }
  }, [user]);

  const router = useRouter();

  const walletIsConnected = useMemo(() => {
    if (!account.status) return false;

    return account.status !== "disconnected" && account.status !== "connecting"
      ? true
      : false;
  }, [account]);

  const {
    data: tokenData,
    error: fetchTokenError,
    isLoading: fetchTokensLoading,
    refetch: refetchTokoenData,
  } = useBalance({ addressOrName: account?.address });

  const navigateToAssetPage = (favorite) => {
    router.push(`/assets/${favorite.symbol.toLowerCase()}`);
  };

  const userFavoritesList = useMemo(() => {
    if (!data?.getUser?.favorites) return [];

    return data.getUser.favorites.map((favorite) => {
      return (
        <div className="favorites-row">
          <Image
            src={favorite.image}
            height={"50px"}
            width={"50px"}
            alt="block-logo"
            className="pointer-link favorites-image"
            onClick={() => navigateToAssetPage(favorite)}
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
  }, [data?.getUser?.favorites]);

  return (
    <CentralWrapper>
      <Head>
        <title>Profile</title>
      </Head>

      <PriceScreener />
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
      </UserDetailsCard>

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
      )}

      {!!userFavoritesList.length && (
        <UserFavoritesList>
          <h4 className="header-text">Favorited Assets</h4>
          {userFavoritesList}
        </UserFavoritesList>
      )}
    </CentralWrapper>
  );
};

const CentralWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 3rem;
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

  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; Firefox
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

export default ProfilePage;
