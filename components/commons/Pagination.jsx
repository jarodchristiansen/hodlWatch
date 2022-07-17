import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({
  active,
  setOffsetState,
  fetchMore,
  refetch,
}) => {
  let items = [];

  let start = active > 2 ? active - 2 : 1;

  for (let number = start; number <= active + 2; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          refetch({ offset: number });
          setOffsetState(number);
        }}
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
        />
        {items}
        <Pagination.Next
          onClick={() => {
            refetch({ offset: active + 1 });
            setOffsetState(active + 1);
          }}
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
