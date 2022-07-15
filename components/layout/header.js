// import Link from "next/link";
// import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
//
//

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";

const Header = () => {
  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };
  const { data: session, status } = useSession();
  let username = session?.user?.username;

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Link href={"/"}>
              <img src={"../chain.png"} className={"pointer-link"} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {status === "authenticated" && (
                <Nav.Link eventKey={"2"} role={"link"}>
                  <Link href="/assets">
                    <Navbar.Text className={"pointer-link mx-1"}>
                      {"Assets"}
                    </Navbar.Text>
                  </Link>
                </Nav.Link>
              )}

              <Nav.Link eventKey={"3"} role={"link"}>
                <Link href="/education">
                  <Navbar.Text className={"pointer-link mx-1"}>
                    Education
                  </Navbar.Text>
                </Link>
              </Nav.Link>

              {status === "authenticated" && (
                <Nav.Link eventKey={"4"} role={"link"}>
                  <Link href={`/user/${username}`}>
                    <Navbar.Text className={"pointer-link mx-1"}>
                      {"Profile"}
                    </Navbar.Text>
                  </Link>
                </Nav.Link>
              )}

              {status === "unauthenticated" ? (
                <Nav.Link eventKey={"5"} role={"link"}>
                  <Link href="/auth">
                    <Navbar.Text className={"pointer-link mx-1"}>
                      {"Sign in"}
                    </Navbar.Text>
                  </Link>
                </Nav.Link>
              ) : (
                <Nav.Link
                  eventKey={"5"}
                  role={"link"}
                  onClick={handleSignout}
                  className={"pointer-link"}
                >
                  {"Sign out"}
                </Nav.Link>
              )}
            </Nav>
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
