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
            <MenuItem
              onClick={() => setPageView("dashboard")}
              className={isDashboardView && "selected"}
            >
              <Image
                alt="dashboard icon"
                src="/sidebar/charts-icon.svg"
                height={60}
                width={60}
              />
              <span>Indicators</span>
            </MenuItem>

            <MenuItem
              onClick={() => setPageView("reports")}
              className={isReportView && "selected"}
            >
              <Image
                alt="reports icon"
                src="/sidebar/news-icon.svg"
                height={60}
                width={60}
              />
              <span>News</span>
            </MenuItem>

            <MenuItem
              onClick={() => setPageView("simulator")}
              className={view === "simulator" && "selected"}
            >
              <Image
                alt="settings icon"
                src="/sidebar/simulator-icon.svg"
                height={60}
                width={60}
              />
              <span>Simulator</span>
            </MenuItem>

            <MenuItem
              onClick={() => setPageView("settings")}
              className={isSettingsView && "selected"}
            >
              <Image
                alt="settings icon"
                src="/sidebar/settings-icon.svg"
                height={60}
                width={60}
              />
              <span>Settings</span>
            </MenuItem>
          </>
        )}
      </TopContent>
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div<TopBarProps>`
  padding-top: 32px;
  height: 200px;
  width: 100%;

  .selected {
    background-color: ${Colors.primary};
  }

  @media ${MediaQueries.MD} {
    width: 100%;
  }
`;

const TopContent = styled.div`
  display: flex;
  justify-content: center;

  @media ${MediaQueries.MD} {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 48px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 8px;
  text-align: center;
  gap: 16px;
  align-items: center;

  cursor: pointer;
  color: ${Colors.white};

  span {
    font-weight: bold;
  }

  &:hover {
    background-color: ${Colors.primary};
  }

  @media ${MediaQueries.MD} {
    padding: 12px 8px;
  }
`;

export default AssetTopBar;
