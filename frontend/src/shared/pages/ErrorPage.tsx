import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage = '予期しないエラーが発生しました';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="text-center">
        <p className="text-6xl font-bold text-blue-600">{errorStatus}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          エラーが発生しました
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">{errorMessage}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
