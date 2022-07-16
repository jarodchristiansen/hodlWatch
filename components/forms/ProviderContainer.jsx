import React, { useState, useEffect } from "react";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import {
  FaGithub,
  FaFacebookSquare,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { BootStrapButtonClasses } from "../../helpers/atomics/classes";

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
      case "Twitter (Legacy)":
        return <FaTwitter size={28} className={"my-2 mx-2"} color={"#fff"} />;
      default:
        return <div>N/A</div>;
    }
  };

  useEffect(() => {
    handleFormatOnNumberOfProvider();
  }, [providers]);

  const handleFormatOnNumberOfProvider = () => {
    let grid = document.getElementById("auth-provider-grid");
    let childCount = grid?.childElementCount;

    childCount && childCount % 2 == 0
      ? grid.classList?.add("row", "row-cols-2")
      : grid.classList?.add("col-8", `col-row-${childCount}`);
  };

  return (
    <div
      className={"w-100 my-5 py-4 border border-2 border-light"}
      id={"auth-provider-grid"}
    >
      {providers &&
        Object.values(providers).map(
          (provider) =>
            provider.name !== "Credentials" && (
              <div key={provider.name}>
                <button
                  onClick={(e) => {
                    signIn(provider.id, { redirect: false })
                      .then(() => console.log("success"))
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
    </div>
  );
};

export default ProviderContainer;
