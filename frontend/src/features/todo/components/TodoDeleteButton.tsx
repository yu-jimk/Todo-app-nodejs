import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDeleteTodo from '../hooks/useDeleteTodo';

interface TodoDeleteButtonProps {
  id: string;
}

const TodoDeleteButton = ({ id }: TodoDeleteButtonProps) => {
  const navigate = useNavigate();
  const { deleteTodo, isDeleting } = useDeleteTodo();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('本当に削除しますか？')) {
      return;
    }
    try {
      await deleteTodo(id);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete todo:', err);
      alert(`削除に失敗しました：${err}`);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
      disabled={isDeleting}
    >
      {isDeleting ? '削除中...' : '削除'}
    </button>
  );
};

export default TodoDeleteButton;
