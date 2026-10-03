const Loader = () => {
  return (
    <div className="flex min-h-64 items-center justify-center" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
    </div>
  );
};

export default Loader;
