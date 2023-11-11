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

  return (
    <SidebarContainer open={open}>
      <ToggleIcon onClick={() => setOpen(!open)}>
        {open ? <i className="fas fa-times" /> : <i className="fas fa-bars" />}
      </ToggleIcon>
      <SidebarContent>
        {open && (
          <>
            <MenuItem
              className={isDashboardView && "selected"}
              onClick={() => setPageView("dashboard")}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              className={isReportView && "selected"}
              onClick={() => setPageView("reports")}
            >
              Reports
            </MenuItem>
            <MenuItem
              className={isSettingsView && "selected"}
              onClick={() => setPageView("settings")}
            >
              Settings
            </MenuItem>
          </>
        )}

        {!open && (
          <>
            <MenuItem
              className={isDashboardView && "selected"}
              onClick={() => setPageView("dashboard")}
            >
              <Image
                alt="dashboard icon"
                src="/sidebar/dashboard.svg"
                height={60}
                width={60}
              />
            </MenuItem>

            <MenuItem
              className={isReportView && "selected"}
              onClick={() => setPageView("reports")}
            >
              <Image
                alt="reports icon"
                src="/sidebar/reports.svg"
                height={60}
                width={60}
              />
            </MenuItem>

            <MenuItem
              className={isSettingsView && "selected"}
              onClick={() => setPageView("settings")}
            >
              <Image
                alt="settings icon"
                src="/sidebar/settings.svg"
                height={60}
                width={60}
              />
            </MenuItem>
          </>
        )}
      </SidebarContent>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div<SidebarProps>`
  height: 110px;
  width: 100%;
  position: relative;
  top: 0;
  background-color: ${Colors.midnight};
  transition: width 0.3s ease;

  .selected {
    background-color: ${Colors.accentBlue};
  }

  @media ${MediaQueries.MD} {
    width: ${({ open }) => (open ? "13%" : "80px")};
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
    background-color: ${Colors.midnight};
    transition: width 0.3s ease;
    z-index: 100;
  }
`;

const ToggleIcon = styled.div`
  display: none;

  @media ${MediaQueries.MD} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    cursor: pointer;
    font-size: 20px;
    background-color: ${Colors.white};
    margin: 18px auto;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  justify-content: center;

  @media ${MediaQueries.MD} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
`;

const MenuItem = styled.div`
  padding: 24px 8px;
  cursor: pointer;
  color: ${Colors.white};

  img {
    padding: 4px;
  }

  &:hover {
    background-color: ${Colors.accentBlue};
  }
`;

export default SidebarV2;
