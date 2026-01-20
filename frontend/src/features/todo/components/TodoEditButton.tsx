import { Link } from 'react-router-dom';

interface TodoEditButtonProps {
  id: string;
}

const TodoEditButton = ({ id }: TodoEditButtonProps) => {
  return (
    <Link
      to={`/todos/${id}/edit`}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      編集
    </Link>
  );
};

export default TodoEditButton;
