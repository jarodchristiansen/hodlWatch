import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import GET_PRODUCTS from "../helpers/queries/getProducts";
import REMOVE_PRODUCT from "../helpers/mutations/removeProduct";

const ProductContainer = ({ products }) => {
  const [items, setItems] = useState(products);

  const { data } = useQuery(GET_PRODUCTS);

  const [removeProduct, { loading, error }] = useMutation(REMOVE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }, "getProducts"],
  });

  useEffect(() => {
    if (loading === false && data) {
      setItems(data?.getProducts);
    }
  }, [loading, data]);

  const removeItem = (product) => {
    removeProduct({
      variables: { id: product?.id },
    }).then((res) => console.log({ res }));
  };

  const renderProducts = () => {
    if (items && !error) {
      return (
        <div className={"container"}>
          <ul>
            {items.map((product) => (
              <li key={product.id} className={"flex flex-row"}>
                {product.name}

                <button className={"ms-3"} onClick={() => removeItem(product)}>
                  Del
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (error) {
      return <div>Error Message: {console.log({ error })}</div>;
    }
  };

  return (
    <div>
      <div>ProductContainer</div>

      {loading ? <div>Loading...</div> : renderProducts()}
    </div>
  );
};

export default ProductContainer;
