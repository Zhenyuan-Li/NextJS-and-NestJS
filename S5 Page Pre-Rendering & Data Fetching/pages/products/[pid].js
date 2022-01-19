import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // For the fallback state in pre-rendering dynamic path
  if (!loadedProduct) {
    return <p>Loading... ...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export default ProductDetailPage;

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}

// 1. context: use to get hold of the concrete param values (dynamic segments in the path)
// 2. for dynamic path, it is not enough, export below getStaticRoutes as well
export const getStaticProps = async (context) => {
  const { params } = context;
  const data = await getData();

  const productId = params.pid;
  const product = data.products.find((product) => productId === product.id);
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths = async () => {
  // Do this if the dummy data contains all the dynamic id we needed.
  // Otherwise, turn fallback true, and return not found in getStaticProps
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    // If there exists tons of products id, instead of limited ones, fallback key helps
    // true: it tell us even we not defined, there are still valid values and should be loaded when visited
    fallback: true,
  };
};
