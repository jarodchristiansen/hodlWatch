import Link from "next/link";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

function Header() {
  const [session, loading, status] = useSession();
  const [selectedRoute, setSelectedRoute] = useState();

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

  let id = session?.user?.id;

  const routes = [
    { key: 1, route: "/assets", guarded: true, text: "Assets" },
    { key: 2, route: `/user/${id}`, guarded: true, text: "Profile" },
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

    return routes.map((route) => {
      if (!route?.key) return;

      return (
        <>
          {!!route.guarded && !!session && (
            <Nav.Link eventKey={route.key.toString()} role={"link"}>
              <TextContainer>
                <Link href={route.route}>
                  <Navbar.Text className={"pointer-link mx-1 fw-bold"}>
                    {route.text}
                  </Navbar.Text>
                </Link>

                {selectedRoute == route.key && (
                  <span className="active-underline-span"></span>
                )}
              </TextContainer>
            </Nav.Link>
          )}

          {!route.guarded && (
            <Nav.Link eventKey={route.key.toString()} role={"link"}>
              <TextContainer>
                <Link href={route.route}>
                  <Navbar.Text className={"pointer-link mx-1 fw-bold"}>
                    {route.text}
                  </Navbar.Text>
                </Link>

                {selectedRoute == route.key && (
                  <span className="active-underline-span"></span>
                )}
              </TextContainer>
            </Nav.Link>
          )}
        </>
      );
    });
  }, [routes?.length, session, selectedRoute]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      onSelect={handleSelect}
    >
      <Container>
        <Navbar.Brand onClick={() => setSelectedRoute("")}>
          <Link href={"/"} passHref>
            <a>
              <Image
                src={"/assets/cube-svgrepo-com.svg"}
                className={"pointer-link"}
                height={"50px"}
                width={"50px"}
                alt="block-logo"
              />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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

          <Nav>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {session && (
                <>
                  <img
                    src={session.user.image}
                    style={{ maxHeight: "50px", float: "end" }}
                    alt=""
                  />
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const SignOutSpan = styled.span`
  color: gray;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  .active-underline-span {
    margin-top: -0.4rem;
    height: 2px;
    color: gray;
    background-color: gray;
  }
`;

export default Header;
