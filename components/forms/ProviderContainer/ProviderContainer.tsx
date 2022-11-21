import React from "react";
import { signIn } from "next-auth/client";
import { FaGithub, FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa";
import { BootStrapButtonClasses } from "../../../helpers/atomics/classes";
import styled from "styled-components";

interface ProvidersAsProps {
  providers: {
    credentials: {
      callbackUrl: string;
      id: string;
      name: string;
      signinUrl: string;
      type: string;
    };
    facebook: {
      callbackUrl: string;
      id: string;
      name: string;
      signinUrl: string;
      type: string;
    };
    github: {
      callbackUrl: string;
      id: string;
      name: string;
      signinUrl: string;
      type: string;
    };
    google: {
      callbackUrl: string;
      id: string;
      name: string;
      signinUrl: string;
      type: string;
    };
    twitter: {
      callbackUrl: string;
      id: string;
      name: string;
      signinUrl: string;
      type: string;
    };
  };
}

const ProviderContainer = ({ providers }: ProvidersAsProps) => {
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
        return <FaGithub size={28} data-testid="login-github" />;
      case "Google":
        return <FaGoogle size={28} data-testid="login-google" />;
      case "Facebook":
        return <FaFacebook size={28} data-testid="login-facebook" />;
      case "Twitter":
        return <FaTwitter size={28} data-testid="login-twitter" />;
      default:
        return <div data-testid="login-na">N/A</div>;
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
                <ProviderButton
                  onClick={(e) => {
                    signIn(provider.id, { redirect: true, callbackUrl: "/" })
                      .then(() => {
                        console.log("Success");
                      })
                      .catch((err) => console.log("err", err));
                    // signInOthers(e, provider)
                  }}
                  id={"provider-button"}
                  type={"button"}
                >
                  <div className="button-content">
                    {selectIcon(provider?.name)}
                    {/* <span>{provider?.name}</span> */}
                  </div>
                </ProviderButton>
              </div>
            )
        )}
    </ButtonContainer>
  );
};

const ProviderButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 8px;
  border: 2px solid black;
  box-shadow: 2px 4px 8px gray;

  .button-content {
    display: flex;
    white-space: nowrap;
    gap: 1rem;
    padding: 0.5rem 0.5rem;
  }

  :hover {
    background-color: white;
    color: black;
  }
`;

const ButtonContainer = styled.div`
  padding: 1rem;
  animation: fadeIn 2s;
  text-align: center;
  margin: 0 auto;
  display: grid;
  row-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export default ProviderContainer;
