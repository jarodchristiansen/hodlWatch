import React, { useEffect, useState, useRef } from "react";
import ADD_PRODUCT from "@/helpers/mutations/addProduct";
import { useMutation } from "@apollo/client";
import GET_PRODUCTS from "@/helpers/queries/getProducts";

const AddProductForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productionCapacity, setProduction] = useState();
  const [price, setPrice] = useState();

  const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }, "getProducts"],
  });

  const handleAddProduct = (event) => {
    event.preventDefault();

    if (productionCapacity) {
      setProduction(parseInt(productionCapacity));
    }

    if (price) {
      setPrice(parseFloat(price));
    }

    const formData = {
      name,
      description,
      productionCapacity: parseInt(productionCapacity),
      price: parseFloat(price),
    };

    // addProduct({
    //   variables: {
    //     input: {
    //       name: "Second Item Dude",
    //       productionCapacity: 3,
    //       price: 3.2,
    //       description: "This is another item",
    //     },
    //   },
    // }).then((resp) => console.log({ resp }));

    addProduct({
      variables: { input: formData },
      // update: (cache, { data: { addProduct } }) => {
      //   const data = cache.readQuery({ query: GET_PRODUCTS });
      //   let modifiedData = [...data.getProducts, addProduct];
      //   console.log({ data, modifiedData, addProduct });
      //   cache.writeQuery({ query: GET_PRODUCTS }, modifiedData);
      // },
    }).then((resp) => console.log({ resp }));

    setName("");
    setDescription("");
    setProduction("");
    setPrice("");
  };

  return (
    <div>
      AddProductForm
      <form onSubmit={handleAddProduct}>
        <div className={"mb-3"}>
          <label>Name:</label>
          <input
            type={"text"}
            name={"name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={"mb-3"}>
          <label>Description:</label>
          <input
            type={"text"}
            name={"description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={"mb-3"}>
          <label>Production Capacity/(Month):</label>
          <input
            type={"number"}
            name={"productionCapacity"}
            value={productionCapacity}
            onChange={(e) => setProduction(e.target.value)}
          />
        </div>

        <div className={"mb-3"}>
          <label>Price:</label>
          <input
            min="1"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type={"submit"}>Submit</button>
      </form>
    </div>
  );
};

export default AddProductForm;
