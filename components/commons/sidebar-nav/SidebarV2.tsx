import { Colors, MediaQueries } from "@/styles/variables";
import Image from "next/image";
import styled from "styled-components";

interface SidebarProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
  view?: string;
  setPageView?: (view: string) => void;
}

const SidebarV2 = ({ open, setOpen, view, setPageView }: SidebarProps) => {
  const isDashboardView = view == "dashboard";
  const isReportView = view == "reports";
  const isSettingsView = view == "settings";

  // Detect mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      {/* Mobile overlay and sidebar only when open */}
      {isMobile && open && (
        <MobileSidebarOverlay onClick={() => setOpen(false)} />
      )}
      {(isMobile ? open : true) && (
        <SidebarContainer $open={open}>
          <ToggleIcon onClick={() => setOpen && setOpen(!open)}>
            {open ? (
              <i className="fas fa-times" />
            ) : (
              <i className="fas fa-bars" />
            )}
          </ToggleIcon>
          <SidebarContent>
            {open && (
              <>
                <MenuItem
                  $open={open}
                  className={isDashboardView ? "selected" : ""}
                  onClick={() => setPageView && setPageView("dashboard")}
                >
                  <Image
                    alt="dashboard icon"
                    src="/sidebar/dashboard.svg"
                    height={32}
                    width={32}
                    className="icon"
                  />
                  <span className="label">Dashboard</span>
                  {!open && <Tooltip>Dashboard</Tooltip>}
                </MenuItem>
                <MenuItem
                  $open={open}
                  className={isReportView ? "selected" : ""}
                  onClick={() => setPageView && setPageView("reports")}
                >
                  <Image
                    alt="reports icon"
                    src="/sidebar/reports.svg"
                    height={32}
                    width={32}
                    className="icon"
                  />
                  <span className="label">Reports</span>
                  {!open && <Tooltip>Reports</Tooltip>}
                </MenuItem>
                <MenuItem
                  $open={open}
                  className={isSettingsView ? "selected" : ""}
                  onClick={() => setPageView && setPageView("settings")}
                >
                  <Image
                    alt="settings icon"
                    src="/sidebar/settings.svg"
                    height={32}
                    width={32}
                    className="icon"
                  />
                  <span className="label">Settings</span>
                  {!open && <Tooltip>Settings</Tooltip>}
                </MenuItem>
              </>
            )}
            {!open && (
              <>
                <MenuItem
                  $open={open}
                  className={isDashboardView ? "selected" : ""}
                  onClick={() => setPageView && setPageView("dashboard")}
                >
                  <Image
                    alt="dashboard icon"
                    src="/sidebar/dashboard.svg"
                    height={32}
                    width={32}
                    className="icon"
                  />
                </MenuItem>
                <MenuItem
                  $open={open}
                  className={isReportView ? "selected" : ""}
                  onClick={() => setPageView && setPageView("reports")}
                >
                  <Image
                    alt="reports icon"
                    src="/sidebar/reports.svg"
                    height={32}
                    width={32}
                    className="icon"
                  />
                </MenuItem>
                <MenuItem
                  $open={open}
                  className={isSettingsView ? "selected" : ""}
                  onClick={() => setPageView && setPageView("settings")}
                >
                  <Image
                    alt="settings icon"
                    src="/sidebar/settings.svg"
                    height={32}
                    width={32}
                    className="icon"
                  />
                </MenuItem>
              </>
            )}
          </SidebarContent>
        </SidebarContainer>
      )}
      {/* Hamburger always visible on mobile */}
      {isMobile && (
        <MobileHamburger onClick={() => setOpen(!open)}>
          <i className={open ? "fas fa-times" : "fas fa-bars"} />
        </MobileHamburger>
      )}
    </>
  );
};

const SidebarContainer = styled.div<{ $open: boolean }>`
  height: 56px;
  width: 56px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${Colors.black};
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s;
  z-index: 200;
  box-shadow: 2px 0 12px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${MediaQueries.MD} {
    height: 100vh;
    width: ${({ $open }) => ($open ? "220px" : "56px")};

    &:hover {
      width: 220px;
    }
  }

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 220px;
    z-index: 9999;
    background: ${Colors.black};
    box-shadow: ${({ $open }) =>
      $open ? "2px 0 12px 0 rgba(0,0,0,0.18)" : "none"};
    transform: ${({ $open }) =>
      $open ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s;
    display: block;
  }
`;

const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  background-color: ${Colors.white};
  color: ${Colors.primary};
  border-radius: 50%;
  margin: 16px 0 12px 0;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  transition: background 0.2s;

  &:hover {
    background: ${Colors.accent};
    color: ${Colors.black};
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 12px;
`;

const MenuItem = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $open }) => ($open ? "flex-start" : "center")};
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  color: ${Colors.white};
  position: relative;
  transition: background 0.18s;

  &:hover {
    background-color: ${Colors.primary};
  }

  .icon {
    width: 32px;
    height: 32px;
    margin: 0 12px;
  }

  .label {
    display: ${({ $open }) => ($open ? "inline" : "none")};
    margin-left: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${Colors.white};
    white-space: nowrap;
  }
`;

// Tooltip for minimized state
const Tooltip = styled.div`
  visibility: hidden;
  background: ${Colors.charcoal};
  color: ${Colors.white};
  text-align: center;
  border-radius: 6px;
  padding: 4px 12px;
  position: absolute;
  left: 60px;
  z-index: 10;
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.2s;

  ${MenuItem}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const MobileSidebarOverlay = styled.div`
  @media (max-width: 767px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.35);
    z-index: 9998;
  }
  display: none;
`;

const MobileHamburger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 10000;
  background: ${Colors.black};
  color: ${Colors.white};
  border-radius: 50%;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

export default SidebarV2;
