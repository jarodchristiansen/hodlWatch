import {
  Colors,
  ContentWidth,
  FontFamily,
  FontSize,
  FontWeight,
  MediaQueries,
  SectionSpacing,
  Surfaces,
} from "@/styles/variables";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styled from "styled-components";

const FOOTER_SOCIAL = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/",
} as const;

/**
 * Site footer — dark surface, restrained typography, aligned with app shell rhythm.
 */
const Footer = () => {
  const { data: session } = useSession();
  // @ts-expect-error next-auth session user shape
  const username = session?.user?.username as string | undefined;
  const profileHref = username ? `/user/${username}` : "/auth?path=SignIn";
  const year = new Date().getFullYear();

  return (
    <FooterShell>
      <FooterInner>
        <FooterTop>
          <BrandBlock>
            <BrandLink href="/">HodlWatch</BrandLink>
            <BrandTagline>
              Market data, watchlists, and context—without the noise.
            </BrandTagline>
          </BrandBlock>
        </FooterTop>

        <NavGrid>
          <NavColumn>
            <NavHeading id="footer-nav-news">News &amp; legal</NavHeading>
            <NavList aria-labelledby="footer-nav-news">
              <li>
                <FooterLink href="/news">Newsfeed</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms-of-service">Terms of service</FooterLink>
              </li>
            </NavList>
          </NavColumn>

          <NavColumn>
            <NavHeading id="footer-nav-resources">Product</NavHeading>
            <NavList aria-labelledby="footer-nav-resources">
              <li>
                <FooterLink href="/assets">Assets</FooterLink>
              </li>
              <li>
                <FooterLink href="/education">Background</FooterLink>
              </li>
            </NavList>
          </NavColumn>

          <NavColumn>
            <NavHeading id="footer-nav-account">Account</NavHeading>
            <NavList aria-labelledby="footer-nav-account">
              <li>
                <FooterLink href={profileHref}>Profile</FooterLink>
              </li>
              <li>
                <FooterLink href="/auth?path=SignIn">Sign in</FooterLink>
              </li>
            </NavList>
          </NavColumn>
        </NavGrid>

        <FooterRule />

        <FooterMeta>
          <Copyright>
            © {year} Mesh. <span className="muted">All rights reserved.</span>
          </Copyright>
          <SocialRow aria-label="Social links">
            <SocialAnchor
              href={FOOTER_SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HodlWatch on Instagram (opens in a new tab)"
            >
              <FaInstagram aria-hidden size={20} />
            </SocialAnchor>
            <SocialAnchor
              href={FOOTER_SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mesh on Facebook (opens in a new tab)"
            >
              <FaFacebook aria-hidden size={20} />
            </SocialAnchor>
            <SocialAnchor
              href={FOOTER_SOCIAL.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mesh on X (opens in a new tab)"
            >
              <FaTwitter aria-hidden size={20} />
            </SocialAnchor>
          </SocialRow>
        </FooterMeta>
      </FooterInner>
    </FooterShell>
  );
};

const FooterShell = styled.footer`
  width: 100%;
  background: linear-gradient(180deg, ${Surfaces.cardPanelStrong} 0%, ${Colors.charcoal} 100%);
  color: ${Colors.white};
  font-family: ${FontFamily.primary};
  border-top: 1px solid rgba(212, 168, 75, 0.35);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
`;

const FooterInner = styled.div`
  max-width: ${ContentWidth.default};
  margin: 0 auto;
  padding: ${SectionSpacing.relaxed} ${SectionSpacing.default} ${SectionSpacing.default};

  @media ${MediaQueries.LG} {
    padding-left: max(${SectionSpacing.default}, env(safe-area-inset-left));
    padding-right: max(${SectionSpacing.default}, env(safe-area-inset-right));
    padding-bottom: ${SectionSpacing.relaxed};
  }
`;

const FooterTop = styled.div`
  margin-bottom: ${SectionSpacing.default};
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  max-width: 28rem;
`;

const BrandLink = styled(Link)`
  font-family: ${FontFamily.headline};
  font-size: clamp(1.5rem, 3vw, 1.85rem);
  font-weight: ${FontWeight.bold};
  color: ${Colors.accent};
  text-decoration: none;
  letter-spacing: 0.04em;
  line-height: 1.15;
  transition: color 0.2s ease, opacity 0.2s ease;

  &:hover {
    color: ${Colors.accentLight};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

const BrandTagline = styled.p`
  margin: 0;
  font-size: ${FontSize.small};
  line-height: 1.55;
  color: ${Colors.textMutedOnDark};
  font-weight: ${FontWeight.regular};
`;

const NavGrid = styled.nav`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${SectionSpacing.default};

  @media ${MediaQueries.MD} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${SectionSpacing.compact} ${SectionSpacing.relaxed};
  }
`;

const NavColumn = styled.div`
  min-width: 0;
`;

const NavHeading = styled.h2`
  margin: 0 0 14px 0;
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.xsmall};
  font-weight: ${FontWeight.bold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled(Link)`
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.regular};
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  line-height: 1.45;
  border-bottom: 1px solid transparent;
  transition: color 0.18s ease, border-color 0.18s ease;

  &:hover {
    color: ${Colors.accentLight};
    border-bottom-color: rgba(212, 168, 75, 0.45);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const FooterRule = styled.div`
  height: 1px;
  margin: ${SectionSpacing.default} 0;
  background: rgba(255, 255, 255, 0.08);
`;

const FooterMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${SectionSpacing.compact};

  @media ${MediaQueries.MD} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${SectionSpacing.default};
  }
`;

const Copyright = styled.p`
  margin: 0;
  font-size: ${FontSize.xsmall};
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.5;

  .muted {
    color: rgba(255, 255, 255, 0.45);
  }
`;

const SocialRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SocialAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  color: ${Colors.accent};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    transform 0.18s ease;

  &:hover {
    color: ${Colors.charcoal};
    background: ${Colors.accent};
    border-color: ${Colors.accent};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

export default Footer;
