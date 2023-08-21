import { Colors, MediaQueries } from "@/styles/variables";
import Image from "next/image";
import styled from "styled-components";

interface TopBarProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
  view?: string;
  setPageView?: (view: string) => void;
}

const AssetTopBar = ({ open, setOpen, view, setPageView }: TopBarProps) => {
  const isDashboardView = view === "dashboard";
  const isReportView = view === "reports";
  const isSettingsView = view === "settings";

  return (
    <TopBarContainer open={open}>
      <TopContent>
        {!open && (
          <>
            <MenuItem onClick={() => setPageView("dashboard")}>
              <Image
                alt="dashboard icon"
                src="/sidebar/charts-icon.svg"
                height={60}
                width={60}
              />
            </MenuItem>

            <MenuItem onClick={() => setPageView("reports")}>
              <Image
                alt="reports icon"
                src="/sidebar/news-icon.svg"
                height={60}
                width={60}
              />
            </MenuItem>

            <MenuItem onClick={() => setPageView("simulator")}>
              <Image
                alt="settings icon"
                src="/sidebar/simulator-icon.svg"
                height={60}
                width={60}
              />
            </MenuItem>

            <MenuItem onClick={() => setPageView("settings")}>
              <Image
                alt="settings icon"
                src="/sidebar/settings-icon.svg"
                height={60}
                width={60}
              />
            </MenuItem>
          </>
        )}
      </TopContent>
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div<TopBarProps>`
  height: 60px;
  width: 100%;
  position: sticky; /* Change to sticky */
  top: 75px;
  background-color: ${Colors.midnight};
  transition: width 0.3s ease;
  z-index: 100;

  .selected {
    background-color: ${Colors.fresh.accentBlue};
  }

  @media ${MediaQueries.MD} {
    width: 100%;
    background-color: ${Colors.midnight};
    transition: width 0.3s ease;
    z-index: 100;
  }
`;

const TopContent = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${Colors.midnight};
  border-top: 2px solid white;

  @media ${MediaQueries.MD} {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 18px;
  }
`;

const MenuItem = styled.div`
  padding: 24px 8px;
  cursor: pointer;
  color: ${Colors.elegant.white};

  img {
    padding: 4px;
  }

  &:hover {
    background-color: ${Colors.fresh.accentBlue};
  }

  @media ${MediaQueries.MD} {
    padding: 12px 8px;
  }
`;

export default AssetTopBar;
