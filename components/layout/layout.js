import { Fragment, useMemo } from "react";
import LoadingSpinner from "../commons/animations/LoadingSpinner";
import Header from "./header";
import { useSession, signIn, signOut } from "next-auth/client";

function Layout(props) {
  const [session, loading, status] = useSession();

  const updatedSession = useMemo(() => {
    return session;
  }, [status, session, loading]);

  return (
    <Fragment>
      <div>{loading && <LoadingSpinner />}</div>

      {!loading && (
        <>
          <Header session={updatedSession} />
          <main>{props.children}</main>
        </>
      )}
    </Fragment>
  );
}

export default Layout;
