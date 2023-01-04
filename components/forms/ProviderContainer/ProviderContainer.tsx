import { signIn } from "next-auth/react";
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaTwitter,
  FaCoins,
} from "react-icons/fa";
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
  isSubmitDisabled: boolean;
}

/**
 *
 * @param providers: Auth Providers github etc...
 * @returns ProviderContainer: Component that shows the sign in provider squares
 */
const ProviderContainer = ({
  providers,
  isSubmitDisabled,
}: ProvidersAsProps) => {
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
      case "Coinbase":
        return <FaCoins size={28} data-testid="login-coinbase" />;
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
                  disabled={isSubmitDisabled}
                  onClick={(e) => {
                    signIn(provider.id, { redirect: true, callbackUrl: "/" })
                      .then(() => {})
                      .catch((err) => console.log("err", err));
                    // signInOthers(e, provider)
                  }}
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

  :disabled {
    background-color: white;
    color: black;
    cursor: not-allowed;
    pointer-events: all !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  white-space: nowrap;
  justify-content: center;
  padding: 2rem 0;
  gap: 1rem;
`;

export default ProviderContainer;
