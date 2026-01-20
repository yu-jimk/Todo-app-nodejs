interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = '読み込み中...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex min-h-50 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
