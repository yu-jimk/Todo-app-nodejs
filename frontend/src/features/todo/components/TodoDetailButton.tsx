import { Link } from 'react-router-dom';

interface TodoDetailButtonProps {
  id: string;
}

const TodoDetailButton = ({ id }: TodoDetailButtonProps) => {
  return (
    <Link to={`/todos/${id}`} className="text-gray-600 hover:underline">
      詳細
    </Link>
  );
};

export default TodoDetailButton;
