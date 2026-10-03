import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-slate-800">Something went wrong</h1>
      <p className="text-slate-600">Please try again or return to the home page.</p>
      <Link className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white" to="/">
        Go home
      </Link>
    </div>
  );
};

export default ErrorPage;
