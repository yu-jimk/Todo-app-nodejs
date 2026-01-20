import { Link } from 'react-router-dom';
import useTodos from '../hooks/useTodos';
import TodoCheckbox from '../components/TodoCheckbox';
import TodoDetailButton from '../components/TodoDetailButton';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorAlert from '../../../shared/components/ErrorAlert';

const TodoPage = () => {
  const { todos, loading, error } = useTodos();
  if (loading) return <LoadingSpinner message="TODOリストを読み込み中..." />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ErrorAlert message={error.message} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">TODO List</h1>

      <Link
        to="/todos/new"
        className="mb-4 inline-block rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        + 新規作成
      </Link>

      {todos.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow">
          <p className="text-gray-500">TODO はありません</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left text-sm text-gray-600">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">完了</th>
                <th className="px-4 py-3">タイトル</th>
                <th className="px-4 py-3">作成日</th>
                <th className="px-4 py-3">更新日</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {todos.map((todo) => (
                <tr key={todo.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{todo.id}</td>

                  <td className="px-4 py-3">
                    <TodoCheckbox id={todo.id} completed={todo.completed} />
                  </td>

                  <td
                    className={`${todo.completed ? 'text-gray-400 line-through' : ''} px-4 py-3 font-medium`}
                  >
                    {todo.title}
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {new Date(todo.createdAt).toLocaleDateString('ja-JP')}
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {new Date(todo.updatedAt).toLocaleDateString('ja-JP')}
                  </td>

                  <td className="px-4 py-3">
                    <TodoDetailButton id={todo.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TodoPage;
