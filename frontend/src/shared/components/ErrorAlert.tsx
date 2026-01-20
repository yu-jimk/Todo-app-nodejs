interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="rounded bg-red-50 p-3 text-red-700" role="alert">
      {message}
    </div>
  );
};

export default ErrorAlert;
