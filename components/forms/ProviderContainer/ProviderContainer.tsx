import { BorderRadius, Colors, FontFamily, FontSize } from "@/styles/variables";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  FaCoins,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaTwitter,
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
  isSubmitDisabled?: boolean;
  callbackUrl?: string;
}

/**
 *
 * @param providers: Auth Providers github etc...
 * @returns ProviderContainer: Component that shows the sign in provider squares
 */
const ProviderContainer = ({
  providers,
  isSubmitDisabled,
  callbackUrl,
}: ProvidersAsProps) => {
  const [isSigningIn, setIsSigningIn] = useState(false);

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

  return (
    <ButtonContainer>
      {providers &&
        Object.values(providers).map(
          (provider) =>
            provider.name !== "Credentials" && (
              <div key={provider.name}>
                <ProviderButton
                  disabled={isSubmitDisabled || isSigningIn}
                  onClick={() => {
                    setIsSigningIn(true);
                    signIn(provider.id, {
                      redirect: true,
                      callbackUrl: callbackUrl ?? "/",
                    }).catch(() => setIsSigningIn(false));
                  }}
                  type={"button"}
                >
                  {selectIcon(provider?.name)}
                  <span className="button-label">
                    Continue with {provider?.name ?? provider?.id}
                  </span>
                </ProviderButton>
              </div>
            )
        )}
    </ButtonContainer>
  );
};

const ProviderButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.medium};
  font-weight: 700;
  color: ${Colors.white};
  background-color: ${Colors.primary};
  border: 2px solid ${Colors.primary};
  border-radius: ${BorderRadius.medium};
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  .button-icon {
    display: flex;
    align-items: center;
  }

  .button-label {
    white-space: nowrap;
  }

  &:hover:not(:disabled) {
    background-color: ${Colors.secondary};
    border-color: ${Colors.secondary};
    color: ${Colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
  gap: 1rem;
`;

export default ProviderContainer;
