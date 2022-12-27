import { MediaQueries } from "@/styles/MediaQueries";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

/**
 *
 * @returns Footer component below pages
 */
const Footer = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  //@ts-ignore: next-auth issue v3
  let id = session?.user?.id;

  const routerToProfile = (manage) => {
    if (id && manage) {
      router.push(`/user/${id}?view=edit_user`);
    } else if (id) {
      router.push(`/user/${id}`);
    } else {
      router.push("/auth?path=SignUp");
    }
  };

  return (
    <FooterContainer>
      <div className="text-column">
        <InfoColumnsContainer>
          <div className="info-column">
            <h4>News & Info</h4>

            <Link href="/news" passHref>
              <a>
                <h6>Newsfeed</h6>
              </a>
            </Link>



            <Link href="/terms-of-service" passHref>
              <a>
                <h6>Terms of Service</h6>
              </a>
            </Link>
          </div>
          <div className="info-column">
            <h4>Resources</h4>

            <Link href="/assets">
              <h6>Assets</h6>
            </Link>

            <Link href="/education">
              <h6>Education</h6>
            </Link>
          </div>
          <div className="info-column">
            <h4>Users</h4>
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
