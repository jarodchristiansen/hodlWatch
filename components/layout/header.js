import Link from "next/link";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

function Header() {
  const [session, loading, status] = useSession();

  const router = useRouter();

  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };
  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  let id = session?.user?.id;

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <Link href={"/"}>
            {/* <img src={"../chain.png"} className={"pointer-link"} /> */}

            <Image
              src={"/assets/cube-svgrepo-com.svg"}
              className={"pointer-link"}
              height={"50px"}
              width={"50px"}
              alt="block-logo"
              unoptimized={true}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {session && (
              <Nav.Link eventKey={"1"} role={"link"}>
                <Link href="/assets">
                  <Navbar.Text className={"pointer-link mx-1 fw-bold"}>
                    Assets
                  </Navbar.Text>
                </Link>
              </Nav.Link>
            )}

            {session && (
              <Nav.Link eventKey={"2"} role={"link"}>
                <Link href={`/user/${id}`}>
                  <Navbar.Text className={"pointer-link mx-1 fw-bold"}>
                    {"Profile"}
                  </Navbar.Text>
                </Link>
              </Nav.Link>
            )}

            {session && (
              <Nav.Link eventKey={"3"} role={"link"}>
                <Link href={`/news`}>
                  <Navbar.Text className={"pointer-link mx-1 fw-bold"}>
                    {"Newsfeed"}
                  </Navbar.Text>
                </Link>
              </Nav.Link>
            )}

            {/* <Nav.Link eventKey={"3"} role={"link"}>
              <Link href="/education">
                <Navbar.Text className={"pointer-link mx-1 fw-bold"}>
                  Education
                </Navbar.Text>
              </Link>
            </Nav.Link> */}

            {!session ? (
              <Nav.Link eventKey={"4"} role={"link"}>
                <Link href="/auth?path=SignIn">
                  <Navbar.Text className={"pointer-link mx-1 fw-bold"}>
                    {"Sign in"}
                  </Navbar.Text>
                </Link>
              </Nav.Link>
            ) : (
              <Nav.Link
                eventKey={"4"}
                role={"link"}
                onClick={handleSignout}
                className={"pointer-link fw-bold"}
              >
                {"Sign Out"}
              </Nav.Link>
            )}
            {/*{router?.route === "/assets" && (*/}
            {/*  <div className={"position-relative"}>*/}
            {/*    <CustomSearchComponent*/}
            {/*      className={"position-absolute bottom-0 end-0"}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*)}*/}
            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
            {/*  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
            {/*  <NavDropdown.Item href="#action/3.2">*/}
            {/*    Another action*/}
            {/*  </NavDropdown.Item>*/}
            {/*  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
            {/*  <NavDropdown.Divider />*/}
            {/*  <NavDropdown.Item href="#action/3.4">*/}
            {/*    Separated link*/}
            {/*  </NavDropdown.Item>*/}
            {/*</NavDropdown>*/}
          </Nav>
          <Nav>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {session && (
                <>
                  {/*<p style={{marginTop: "5%"}}>{session.user.name ?? session.user.email}</p> <br />*/}
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

export default Header;
