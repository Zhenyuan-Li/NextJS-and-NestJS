import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

// can not use fs (file system) in client side
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default HomePage;

// None of below runs on client side. First run on server before deploying
// but also could run on sever after deploying (ISR) -> see console.log('Regenerating') on prod mode
export const getStaticProps = async () => {
  // console.log('Regenerating')

  // current working directory is the overall file structure (root), not in page
  // JSON.parse() turn JSON to the regular js object
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // if there is no data
  if (!data) {
    return {
      // change another routes to render
      redirect: {
        destination: '/no-data',
      },
    };
  }

  // if the products is empty
  if (data.products.length === 0) {
    // render 404 page
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // What if the data changes frequently? use ISR. Matters for production
    // For any incoming request to this page, it should be re-generated unless,
    // it less than 120 seconds ago that it was last re-generated
    revalidate: 120,
  };
};
