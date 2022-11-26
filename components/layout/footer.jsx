import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Colors } from "../../styles/Colors";
import { MediaQueries } from "../../styles/MediaQueries";

const Footer = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  let id = session?.user?.id;

  const routerToProfile = (manage) => {
    if (session?.user?.id && manage) {
      router.push(`/user/${session.user.id}?view=edit_user`);
    } else if (session?.user?.id) {
      router.push(`/user/${session.user.id}`);
    } else {
      router.push("/auth?path=SignUp");
    }
  };

  return (
    <FooterContainer>
      <div className="text-column">
        {/* <h4>Stay tuned</h4> */}
        <h6>Follow For More Content</h6>

        <InfoColumnsContainer>
          <div className="info-column">
            <h5>News & Info</h5>

            <h6>Latest Posts</h6>

            <Link href="/news">
              <h6>Newsfeed</h6>
            </Link>
          </div>
          <div className="info-column">
            <h5>Resources</h5>

            <Link href="/news">
              <h6>Assets</h6>
            </Link>

            <h6>Education</h6>
          </div>
          <div className="info-column">
            <h5>Users</h5>
            <h6 onClick={() => routerToProfile(false)}>Profile</h6>
            <h6 onClick={() => routerToProfile(true)}>Manage Account</h6>
          </div>
        </InfoColumnsContainer>

        <div className="social-row">
          <span>Insta</span>
          <span>FB</span>
          <span>Twitter</span>
        </div>
      </div>
    </FooterContainer>
  );
};

const InfoColumnsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  justify-content: center;

  @media ${MediaQueries.MD} {
    gap: 9rem;
  }

  .info-column {
    display: flex;
    flex-direction: column;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  /* background-color: ${Colors.PrimaryButtonBackground}; */
  background-color: #1a1919;
  color: white;
  padding: 2rem 2rem;
  margin-top: 4rem;
  border-top: 2px solid gray;

  .text-column {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .social-row {
    padding-top: 2rem;
    display: flex;
    flex-direction: row;
    gap: 3rem;
  }
`;

export default Footer;
