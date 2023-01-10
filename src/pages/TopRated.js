import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProduct";

const TopRated = () => {
  const {
    state: { products, loading, error },
  } = useProducts();
  console.log("data", products);

  let content;
  if (loading) content = <p>Loading...</p>;
  if (!loading && error) content = <p>Something went wrong</p>;
  if (!loading && !error && products.length == 0) content = <p>No products found</p>;
  if (!loading && !error && products)
    content = products
      .filter((product) => product.rating >= 4)
      .map((product, index) => <ProductCard product={product} ket={product.id} />);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
      {content}
    </div>
  );
};

export default TopRated;
