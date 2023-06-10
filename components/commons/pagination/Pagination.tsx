import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

interface PaginationComponentProps {
  active: number;
  setOffsetState: (number) => void;
  fetchMore: any;
  refetch: any;
}

const PaginationComponent = ({
  active,
  setOffsetState,
  fetchMore,
  refetch,
}: PaginationComponentProps) => {
  let items = [];

  let start = active > 2 ? active - 2 : 1;

  for (let number = start; number <= active + 2; number++) {
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
    <div data-testid={"pagination-component"}>
      <Pagination>
        <Pagination.Prev
          onClick={() => {
            refetch({ offset: active - 1 });
            setOffsetState(active - 1);
          }}
          data-testid={"pagination-key-previous"}
        />
        {items}
        <Pagination.Next
          onClick={() => {
            refetch({ offset: active + 1 });
            setOffsetState(active + 1);
          }}
          data-testid={"pagination-key-next"}
        />
      </Pagination>
      <br />

      {/*<Pagination size="lg">{items}</Pagination>*/}
      {/*<br />*/}

      {/*<Pagination size="sm">{items}</Pagination>*/}
    </div>
  );
};

export default PaginationComponent;
