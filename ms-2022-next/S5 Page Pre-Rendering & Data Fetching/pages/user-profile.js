function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// it runs only on the servers after deployment
export const getServerSideProps = async (context) => {
  const { params, req, res } = context;

  // Reach out and add header to req (authentication)
  console.log('Server Side Generate.');

  return {
    props: {
      username: 'Vince',
    },
  };
};
