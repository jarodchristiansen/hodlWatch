import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { UPDATE_USERNAME } from "@/helpers/mutations/user";
import { MediaQueries } from "@/styles/MediaQueries";
import Avatar, { genConfig } from "react-nice-avatar";

/**
 *
 * @param user: User associated with the profile
 * @param fetchedUser: User fetched from database to confirm user is associated user
 * @returns EditUserDetails flow that allows user to update their profile components
 */
const EditUserDetails = ({ user, fetchedUser, config, setConfigValue }) => {
  const [usernameInput, setUsernameInput] = useState("");

  const [updateUsername, { loading, error }] = useMutation(UPDATE_USERNAME);

  const [viewState, setViewState] = useState("Main");
  const [avatarView, setAvatarView] = useState("");

  const setEditUsername = () => {
    setViewState("Username");
  };

  const setEditMain = () => {
    setViewState("Main");
  };

  const setEditAvatar = () => {
    setViewState("Avatar");
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
  const viewisAvatar = viewState === "Avatar";

  const setAvatarState = (e: any) => {
    let value = e.target.value;

    console.log("In set Avatar State", { value });

    setAvatarView(value);
  };

  const avatarCards = useMemo(() => {
    if (!config || !avatarView) return [];

    let options = [];

    if (avatarView === "gender") {
      options = [
        genConfig({ ...config, sex: "man" }),
        genConfig({ ...config, sex: "woman", hairStyle: "" }),
      ];
    }

    return options.map((element) => {
      return (
        <AvatarCard onClick={() => setConfigAsSelection(element)}>
          <Avatar style={{ width: "8rem", height: "8rem" }} {...element} />
        </AvatarCard>
      );
    });
  }, [avatarView]);

  const setConfigAsSelection = (value: any) => {
    console.log("In setConfigAsSelection", { value });
    config = value;

    setConfigValue(value);
  };

  return (
    <>
      {!!config && (
        <>
          <span onClick={setEditAvatar}>Edit</span>
          <Avatar style={{ width: "8rem", height: "8rem" }} {...config} />
        </>
      )}

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
                  height={"50px"}
                  width={"50px"}
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

      {viewisAvatar && (
        <AvatarEditPanel>
          <div className="attribute-row">
            <button value="gender" onClick={setAvatarState}>
              Gender
            </button>
            {/* <span>Hair Style</span>
            <span>Hair Color</span> */}
            <button value="hair" onClick={setAvatarState}>
              Hair
            </button>
            <button value="face" onClick={setAvatarState}>
              Face
            </button>
            {/* <span>Hat Style</span>
            <span>Hat Color</span> */}
            <button value="hat" onClick={setAvatarState}>
              Hat
            </button>
            <button value="eyes" onClick={setAvatarState}>
              Eyes
            </button>
            <button value="glasses" onClick={setAvatarState}>
              Glasses
            </button>
            <button value="nose" onClick={setAvatarState}>
              Nose
            </button>
            <button value="mouth" onClick={setAvatarState}>
              Mouth
            </button>

            <button value="shirt" onClick={setAvatarState}>
              Shirt
            </button>
            {/* <span>Shirt Style</span>
            <span>Shirt Color</span> */}
            <button value="bg" onClick={setAvatarState}>
              BG
            </button>
          </div>

          <div className="view-header">
            {!!avatarView && (
              <h3>{avatarView[0].toUpperCase() + avatarView.slice(1)}</h3>
            )}
          </div>

          <div className="options-grid">
            {!!avatarCards?.length && avatarCards}
          </div>
        </AvatarEditPanel>
      )}
    </>
  );
};

const AvatarCard = styled.div`
  max-width: 8rem;
  border: 1px solid black;
`;

const AvatarEditPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;

  .view-header {
    text-align: center;
    padding: 1rem;
  }

  .attribute-row {
    text-align: center;

    @media ${MediaQueries.MD} {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0rem 7rem;
    }
  }

  .options-grid {
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: 0rem;
  }
`;

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
