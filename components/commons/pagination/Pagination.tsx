import { Pagination } from "react-bootstrap";
import styled from "styled-components";
import { Colors } from "@/styles/variables";

interface PaginationComponentProps {
  active: number;
  setOffsetState: (number) => void;
  refetch: any;
  canGoPrev?: boolean;
  canGoNext?: boolean;
}

const PaginationComponent = ({
  active,
  setOffsetState,
  refetch,
  canGoPrev = true,
  canGoNext = true,
}: PaginationComponentProps) => {
  const items: any[] = [];

  const windowSize = 5; // odd number looks best around active
  const half = Math.floor(windowSize / 2);
  const start = Math.max(1, active - half);
  const end = Math.max(start, active + half);

  for (let number = start; number <= end; number++) {
    items.push(
      <Pagination.Item
        key={number}
        data-cy={"pagination-page"}
        active={number === active}
        onClick={() => {
          refetch({ offset: number });
          setOffsetState(number);
        }}
        data-testid={`pagination-key-${number}`}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <PaginationShell data-testid={"pagination-component"}>
      <Pagination>
        <Pagination.First
          disabled={!canGoPrev}
          onClick={() => {
            if (!canGoPrev) return;
            refetch({ offset: 1 });
            setOffsetState(1);
          }}
          data-testid={"pagination-key-first"}
        />
        <Pagination.Prev
          disabled={!canGoPrev}
          onClick={() => {
            if (!canGoPrev) return;
            const next = Math.max(1, active - 1);
            refetch({ offset: next });
            setOffsetState(next);
          }}
          data-testid={"pagination-key-previous"}
        />
        {items}
        <Pagination.Next
          disabled={!canGoNext}
          onClick={() => {
            if (!canGoNext) return;
            const next = active + 1;
            refetch({ offset: next });
            setOffsetState(next);
          }}
          data-testid={"pagination-key-next"}
        />
      </Pagination>
    </PaginationShell>
  );
};

const PaginationShell = styled.div`
  .pagination {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px;
    margin-bottom: 0 !important;
  }

  .page-item {
    margin: 0 !important;
    float: none !important;
  }

  .page-link {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px;
    border-radius: 12px !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    background: rgba(0, 0, 0, 0.2) !important;
    color: rgba(255, 255, 255, 0.88) !important;
    font-weight: 800;
    line-height: 1 !important;
    padding: 0 14px !important;
    min-width: 44px;
    height: 44px;
    text-align: center;
    box-shadow: none !important;
    transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
  }

  .page-link:hover {
    background: rgba(245, 230, 179, 0.14) !important;
    color: ${Colors.white} !important;
    transform: translateY(-1px);
  }

  .page-item.active .page-link {
    background: ${Colors.accent} !important;
    color: ${Colors.charcoal} !important;
    border-color: rgba(212, 168, 75, 0.65) !important;
  }

  .page-item.disabled .page-link {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  .page-link:focus {
    box-shadow: none !important;
  }

  .page-link:focus-visible {
    outline: 2px solid ${Colors.accent} !important;
    outline-offset: 2px;
  }
`;

export default PaginationComponent;
