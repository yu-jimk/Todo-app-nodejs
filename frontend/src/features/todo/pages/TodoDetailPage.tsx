import { useParams } from 'react-router-dom';
import useTodoDetail from '../hooks/useTodoDetail';
import TodoEditButton from '../components/TodoEditButton';
import TodoDeleteButton from '../components/TodoDeleteButton';
import BackButton from '../components/BackButton';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorAlert from '../../../shared/components/ErrorAlert';

const TodoDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { todo, loading, error } = useTodoDetail(id ?? '');
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ErrorAlert message="無効なTODO IDです" />
      </div>
    );
  }

  if (loading) return <LoadingSpinner message="TODO詳細を読み込み中..." />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ErrorAlert message={error.message} />
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ErrorAlert message="TODOが見つかりませんでした" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">TODO 詳細</h1>

      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow">
        <div className="mb-4">
          <span className="font-semibold text-gray-600">ID:</span>{' '}
          <span className="text-gray-800">{todo.id}</span>
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-600">タイトル:</span>{' '}
          <span className="text-gray-800">{todo.title}</span>
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-600">完了:</span>{' '}
          <span className={`font-bold ${todo.completed ? 'text-green-600' : 'text-red-600'}`}>
            {todo.completed ? '完了' : '未完了'}
          </span>
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-600">作成日:</span>{' '}
          <span className="text-gray-800">{new Date(todo.createdAt).toLocaleString('ja-JP')}</span>
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-600">更新日:</span>{' '}
          <span className="text-gray-800">{new Date(todo.updatedAt).toLocaleString('ja-JP')}</span>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <TodoEditButton id={todo.id} />
          <TodoDeleteButton id={todo.id} />
        </div>
        <BackButton to="/" />
      </div>
    </div>
  );
};

export default TodoDetailPage;
