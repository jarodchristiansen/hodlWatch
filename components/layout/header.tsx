import { Colors, FontFamily, FontSize, MediaQueries } from "@/styles/variables";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

/**
 *
 * @returns Header component above pages
 */
function Header() {
  const { data: session, status } = useSession();
  const [selectedRoute, setSelectedRoute] = useState<string | number>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const { asPath } = router;

  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };
  const handleSignout = (e) => {
    e.preventDefault();
    setSelectedRoute("");
    signOut();
  };

  const handleSelect = (selectedKey) => {
    setSelectedRoute(selectedKey);
  };

  // @ts-ignore: next-auth type issue v3
  let id = session?.user?.username;

  const routes = [
    { key: 1, route: "/assets", guarded: false, text: "Assets" },
    { key: 2, route: `/user/${id}`, guarded: false, text: "Profile" },
    { key: 3, route: "/news", guarded: false, text: "News" },
    // { key: 4, route: "/simulator", guarded: false, text: "Simulator" },
    { key: 4, route: "/education", guarded: false, text: "Background" },
    !session && {
      key: 5,
      route: "/auth?path=SignIn",
      guarded: false,
      text: "Sign In",
    },
  ];

  useEffect(() => {
    setRouterAsPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  const setRouterAsPath = () => {
    let matchingRoute = routes.filter((item) => asPath.includes(item.route));

    if (matchingRoute.length) {
      setSelectedRoute(matchingRoute[0].key);
    }
  };

  const routeObjects = useMemo(() => {
    if (!routes?.length) return [];

    return routes.map((route, idx) => {
      if (!route?.key) return;

      return (
        <div key={route?.route}>
          <TextContainer>
            <NavLink
              href={route.route}
              onClick={() => {
                setSelectedRoute(route.key);
                setMenuOpen(false);
              }}
              $active={selectedRoute === route.key}
            >
              {route.text}
            </NavLink>
            {selectedRoute == route.key && (
              <span className="active-underline-span"></span>
            )}
          </TextContainer>
        </div>
      );
    });
  }, [routes, selectedRoute, session]);

  return (
    <HeaderBar>
      <HeaderInner>
        <LogoArea>
          <LogoLink href="/">HodlWatch</LogoLink>
        </LogoArea>
        <Hamburger
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </Hamburger>
        <NavMenu $open={menuOpen}>
          <RouteRow>
            {routeObjects}
            {session && (
              <TextContainer>
                <NavLink
                  as="button"
                  onClick={handleSignout}
                  $active={false}
                  style={{ color: Colors.accent }}
                >
                  <SignOutSpan>Sign Out</SignOutSpan>
                </NavLink>
              </TextContainer>
            )}
          </RouteRow>
        </NavMenu>
      </HeaderInner>
    </HeaderBar>
  );
}

const HeaderBar = styled.header`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: ${Colors.charcoal};
  color: ${Colors.white};
  border-bottom: 2px solid ${Colors.accent};
  font-family: ${FontFamily.primary};
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  height: 64px;
  @media ${MediaQueries.MD} {
    height: 80px;
  }
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
`;

const LogoLink = styled.a`
  color: ${Colors.accent};
  font-family: ${FontFamily.headline};
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 0.04em;
  &:hover {
    color: ${Colors.white};
  }
`;

const Hamburger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
  span {
    display: block;
    height: 4px;
    width: 100%;
    background: ${Colors.accent};
    border-radius: 2px;
    transition: all 0.3s;
  }
  @media ${MediaQueries.MD} {
    display: none;
  }
`;

const NavMenu = styled.nav<{ $open: boolean }>`
  position: fixed;
  top: 64px;
  left: 0;
  width: 100vw;
  background: ${Colors.charcoal};
  box-shadow: 0 4px 24px 0 ${Colors.cardShadow};
  padding: 24px 0 12px 0;
  display: ${({ $open }) => ($open ? "block" : "none")};
  @media ${MediaQueries.MD} {
    position: static;
    background: none;
    box-shadow: none;
    padding: 0;
    display: flex !important;
    width: auto;
    top: auto;
  }
`;

const NavLink = styled.a<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? Colors.accent : Colors.white)};
  font-family: ${FontFamily.primary};
  font-weight: bold;
  text-decoration: none;
  font-size: ${FontSize.large};
  padding: 8px 18px;
  border-radius: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
  &:hover {
    color: ${Colors.accent};
    background: rgba(255, 255, 255, 0.04);
  }
`;

const RouteRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-weight: 600;
  text-align: center;
  padding: 12px 0;
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.large};
  background: transparent;

  @media ${MediaQueries.MD} {
    flex-direction: row;
    width: 100%;
  }
`;

const SignOutSpan = styled.span`
  color: ${Colors.accent};
  font-family: ${FontFamily.primary};
  font-weight: bold;
  @media ${MediaQueries.MD} {
    white-space: nowrap;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: ${Colors.white};
    font-family: ${FontFamily.primary};
    font-weight: bold;
    text-decoration: none;
    font-size: ${FontSize.large};
    transition: color 0.2s;
    &:hover {
      color: ${Colors.accent};
    }
  }
  .active-underline-span {
    height: 3px;
    background: ${Colors.accent};
    width: 100%;
    display: block;
    margin-top: 2px;
    border-radius: 2px;
  }
`;

export default Header;
