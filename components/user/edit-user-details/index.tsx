import { UPDATE_USERNAME } from "@/helpers/mutations/user";
import { Colors, MediaQueries } from "@/styles/variables";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

/**
 *
 * @param user: User associated with the profile
 * @param fetchedUser: User fetched from database to confirm user is associated user
 * @returns EditUserDetails flow that allows user to update their profile components
 */
const EditUserDetails = ({ user, fetchedUser }) => {
  const [usernameInput, setUsernameInput] = useState("");

  const [updateUsername, { loading, error }] = useMutation(UPDATE_USERNAME);

  const [viewState, setViewState] = useState("Main");

  const setEditUsername = () => {
    setViewState("Username");
  };

  const setEditMain = () => {
    setViewState("Main");
  };

  const submitUsernameChange = () => {
    updateUsername({
      variables: {
        input: {
          email: user.email,
          username: usernameInput,
        },
      },
    });
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
                  height={50}
                  width={50}
                  alt="block-logo"
                  layout="fixed"
                  unoptimized={true}
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
                <UserNameInput
                  placeholder={fetchedUser?.username}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
                {/* <h4>{fetchedUser?.username}</h4> */}

                <span onClick={setEditMain}>Back</span>
              </div>

              <div className="detail-row-inactive">
                <h4>Profile Pic:</h4>
                <Image
                  src={fetchedUser?.image}
                  height={50}
                  width={50}
                  alt="block-logo"
                  layout="fixed"
                  unoptimized={true}
                />
              </div>
            </>
          )}

          <button onClick={submitUsernameChange}>Submit</button>
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
