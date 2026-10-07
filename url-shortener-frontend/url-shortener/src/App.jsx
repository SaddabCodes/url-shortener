import AppRouter, { SubDomainRouter } from "./AppRouter";
import { getSubDomain } from "./utils/helper";

export default function App() {
  const isShortUrlSubdomain = getSubDomain(window.location.hostname) === "url";

  return (
    <div>
      {isShortUrlSubdomain ? <SubDomainRouter /> : <AppRouter />}
    </div>
  );
}
