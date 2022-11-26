import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { MediaQueries } from "../../../styles/MediaQueries";

const EditUserDetails = ({ user, fetchedUser }) => {
  const [viewState, setViewState] = useState("Main");

  const setEditUsername = () => {
    console.log("Set Edit Username");
    setViewState("Username");
  };

  const setEditMain = () => {
    setViewState("Main");
  };

  const viewIsMain = viewState === "Main";
  const viewIsUsername = viewState === "Username";

  return (
    <>
      {viewIsMain && (
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

          {fetchedUser && (
            <>
              <div className="detail-row">
                <h4>Username:</h4>

                <h4>{fetchedUser?.username}</h4>

                <span onClick={setEditUsername}>X</span>
              </div>

              <div className="detail-row">
                <h4>Profile Pic:</h4>
                <Image
                  src={fetchedUser?.image}
                  height={"50px"}
                  width={"50px"}
                  alt="block-logo"
                  layout="fixed"
                />
              </div>
            </>
          )}
        </UserDetailsCard>
      )}

      {viewIsUsername && (
        <UserDetailsCard>
          <div className="detail-header">
            <h2>User Details</h2>
          </div>

          <div className="detail-row-inactive">
            <h4>Name:</h4>
            <h4>{user?.name}</h4>
          </div>

          <div className="detail-row-inactive">
            <h4>Email:</h4>
            <h4>{user?.email}</h4>
          </div>

          {fetchedUser && (
            <>
              <div className="detail-row">
                <h4>Username:</h4>
                <UserNameInput placeholder={fetchedUser?.username} />
                {/* <h4>{fetchedUser?.username}</h4> */}

                <span onClick={setEditMain}>Back</span>
              </div>

              <div className="detail-row-inactive">
                <h4>Profile Pic:</h4>
                <Image
                  src={fetchedUser?.image}
                  height={"50px"}
                  width={"50px"}
                  alt="block-logo"
                  layout="fixed"
                />
              </div>
            </>
          )}
        </UserDetailsCard>
      )}
    </>
  );
};

const UserNameInput = styled.input`
  padding: 1rem 1rem;
  border-radius: 0.5rem;
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

  .detail-row-inactive {
    padding: 1rem 2rem;
    margin: auto;
    width: 100%;
    display: flex;
    white-space: nowrap;
    justify-content: space-between;
    border-top: 1px solid black;
    gap: 1rem;
    overflow-x: auto;
    background-color: #c0bfbf;
    opacity: 0.7;
    pointer-events: disabled;

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

export default EditUserDetails;
