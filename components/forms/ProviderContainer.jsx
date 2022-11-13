import React, { useState, useEffect } from "react";
import { getProviders, getSession, signIn, useSession } from "next-auth/client";
import {
  FaGithub,
  FaFacebookSquare,
  FaGoogle,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { BootStrapButtonClasses } from "../../helpers/atomics/classes";
import styled from "styled-components";

const ProviderContainer = ({ providers }) => {
  const signInOthers = async (e, provider) => {
    // console.log({ provider });
    // e.preventDefault();
    // const result = await signIn(
    //   provider.id
    //   //     , {
    //   //   callbackUrl: `${window.location.origin}`,
    //   // }
    // );
    // console.log({ result });
    //
    // if (!result?.error) {
    //   await getSession().then((session) => {
    //     console.log({ session });
    //   });
    // }
  };

  const selectIcon = (name) => {
    switch (name) {
      case "GitHub":
        return <FaGithub size={28} className={"my-2 mx-2"} color={"#fff"} />;
      case "Google":
        return <FaGoogle size={28} className={"my-2 mx-2"} color={"#fff"} />;
      case "Facebook":
        return <FaFacebook size={28} className={"my-2 mx-2"} color={"#fff"} />;
      case "Twitter":
        return <FaTwitter size={28} className={"my-2 mx-2"} color={"#fff"} />;
      default:
        return <div>N/A</div>;
    }
  };

  // useEffect(() => {
  //   handleFormatOnNumberOfProvider();
  // }, [providers]);

  // const handleFormatOnNumberOfProvider = () => {
  //   let grid = document.getElementById("auth-provider-grid");
  //   let childCount = grid?.childElementCount;

  //   childCount && childCount % 2 == 0
  //     ? grid.classList?.add("row", "row-cols-2")
  //     : grid.classList?.add("col-8", `col-row-${childCount}`);
  // };

  return (
    <ButtonContainer>
      {providers &&
        Object.values(providers).map(
          (provider) =>
            provider.name !== "Credentials" && (
              <div key={provider.name}>
                <button
                  onClick={(e) => {
                    signIn(provider.id, { redirect: true, callbackUrl: "/" })
                      .then(() => {
                        console.log("Success");
                      })
                      .catch((err) => console.log("err", err));
                    // signInOthers(e, provider)
                  }}
                  className={BootStrapButtonClasses.Provider}
                  id={"provider-button"}
                  type={"button"}
                >
                  {selectIcon(provider?.name)}
                </button>
              </div>
            )
        )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  padding: 1rem;
  animation: fadeIn 2s;
  text-align: center;
  margin: 0 auto;
  display: grid;
  column-gap: 3rem;
  row-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default ProviderContainer;
