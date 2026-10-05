import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortUrlRedirect = () => {
  const { shortUrl } = useParams();

  useEffect(() => {
    if (shortUrl) {
      window.location.replace(`${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`);
    }
  }, [shortUrl]);

  return <p>Redirecting...</p>;
};

export default ShortUrlRedirect;
