import styled from "styled-components";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { MediaQueries } from "../../styles/MediaQueries";

const ProfilePage = () => {
  const [session, loading] = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    if (session.user) {
      setUser(session.user);
    }
  }, [loading]);

  console.log({ user });

  return (
    <CentralWrapper>
      <UserDetailsCard>
        <div className="detail-header">
          <h2>User Details</h2>
        </div>

        <div className="detail-row">
          <h4>Name:</h4>
          <h4>{user?.name}</h4>
        </div>

        <div className="detail-row">
          <h4>Email:</h4>
          <h4>{user?.email}</h4>
        </div>

        {/* <div className="detail-row">
          <h4>Some Text:</h4>
          <h4>Stuff</h4>
        </div> */}
      </UserDetailsCard>
    </CentralWrapper>
  );
};

const CentralWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const UserDetailsCard = styled.div`
  width: 100%;
  border: 2px solid black;
  border-radius: 14px;
  margin-top: 3rem;

  .detail-header {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .detail-row {
    padding: 1rem 2rem;
    margin: auto;
    width: 100%;
    display: flex;
    white-space: nowrap;
    justify-content: space-between;
    border-top: 1px solid black;
    gap: 1rem;

    overflow-x: auto;

    /* margin-left: -2rem;
      margin-right: -2rem;
      padding-left: 4rem;
      padding-right: 4rem; */

    ::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }

  @media ${MediaQueries.MD} {
    width: 30rem;
  }
`;

export default ProfilePage;
