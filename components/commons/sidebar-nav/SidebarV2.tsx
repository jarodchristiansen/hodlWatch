import { Colors, MediaQueries } from "@/styles/variables";
import styled from "styled-components";

interface SidebarProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
}

const SidebarV2 = ({ open, setOpen }: SidebarProps) => {
  return (
    <SidebarContainer open={open}>
      <ToggleIcon onClick={() => setOpen(!open)}>
        {open ? <i className="fas fa-times" /> : <i className="fas fa-bars" />}
      </ToggleIcon>
      <SidebarContent>
        {open && (
          <>
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Reports</MenuItem>
            <MenuItem>Settings</MenuItem>
          </>
        )}
      </SidebarContent>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div<SidebarProps>`
  height: ${({ open }) => (open ? "200px" : "60px")};
  width: 100%;
  position: relative;
  top: 0;
  background-color: ${Colors.midnight};
  transition: width 0.3s ease;
  /* z-index: 100; */

  @media ${MediaQueries.MD} {
    width: ${({ open }) => (open ? "15%" : "70px")};
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  cursor: pointer;
  font-size: 20px;
  background-color: ${Colors.elegant.white};
`;

const SidebarContent = styled.div`
  text-align: center;

  @media ${MediaQueries.LG} {
    text-align: left;
  }
`;

const MenuItem = styled.div`
  padding: 24px 12px;
  cursor: pointer;
  color: ${Colors.elegant.white};

  &:hover {
    background-color: ${Colors.richBlack};
  }
`;

export default SidebarV2;
