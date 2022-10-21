const Test = ({ url }: { url: string }) => {
  return (
    <div>
      <p>Server: {url}</p>
      <p>Browser: {process.env.NEXT_PUBLIC_VERCEL_URL}</p>
    </div>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      url: process.env.NEXT_PUBLIC_VERCEL_URL,
    },
  };
};

export default Test;
