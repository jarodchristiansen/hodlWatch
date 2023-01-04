import Link from "next/link";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { MediaQueries } from "@/styles/MediaQueries";

/**
 *
 * @returns Header component above pages
 */
function Header() {
  const { data: session, status } = useSession();
  const [selectedRoute, setSelectedRoute] = useState<string | number>("");

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

  const routes = [
    { key: 1, route: "/assets", guarded: true, text: "Assets" },
    { key: 2, route: `/user/`, guarded: true, text: "Profile" },
    { key: 3, route: "/news", guarded: true, text: "News" },
    { key: 4, route: "/education", guarded: false, text: "Education" },
    !session && {
      key: 5,
      route: "/auth?path=SignIn",
      guarded: false,
      text: "Sign In",
    },
  ];

  useEffect(() => {
    setRouterAsPath();
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
          {!!route.guarded && !!session && (
            <TextContainer>
              <Link href={route.route}>{route.text}</Link>
              {selectedRoute == route.key && (
                <span className="active-underline-span"></span>
              )}
            </TextContainer>
          )}

          {!route.guarded && (
            <TextContainer>
              <Link href={route.route}>{route.text}</Link>
              {selectedRoute == route.key && (
                <span className="active-underline-span"></span>
              )}
            </TextContainer>
          )}
        </div>
      );
    });
  }, [routes?.length, selectedRoute, session]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      onSelect={handleSelect}
    >
      <Container>
        <Navbar.Brand onClick={() => setSelectedRoute("")}>
          <Link href={"/"} passHref legacyBehavior>
            <Image
              src={"/assets/cube-svgrepo-com.svg"}
              className={"pointer-link"}
              height={50}
              width={50}
              alt="block-logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <RouteRow>
            {routeObjects}
            {session && (
              <Nav.Link
                eventKey={"5"}
                role={"link"}
                onClick={handleSignout}
                className={"pointer-link fw-bold"}
              >
                <SignOutSpan>{"Sign Out"}</SignOutSpan>
              </Nav.Link>
            )}
          </RouteRow>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const RouteRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-weight: bold;

  @media ${MediaQueries.MD} {
    flex-direction: row;
    width: 100%;
  }
`;

const SignOutSpan = styled.span`
  font-weight: bold;
  color: white;

  @media ${MediaQueries.MD} {
    white-space: nowrap;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;

  .active-underline-span {
    height: 2px;
    color: white;
    background-color: white;
  }
`;

export default Header;
