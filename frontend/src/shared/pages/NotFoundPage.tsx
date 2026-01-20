import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="text-center">
        <p className="text-6xl font-bold text-blue-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          ページが見つかりません
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
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

export default NotFoundPage;
