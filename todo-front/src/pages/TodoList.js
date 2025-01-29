import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { todoService } from "../services/todoService";
import TodoForm from "../components/TodoForm";
import LoadingSpinner from "../utils/LoadingSpinner";
import ErrorMessage from "../utils/ErrorMessage";
import "../styles/main.css";
import { ModalContext } from "../context/ModalContext";
import Pagination from "../utils/Pagination";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTodos, setSelectedTodos] = useState(new Set());
  const [editingTodo, setEditingTodo] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const context = useContext(ModalContext);

  const itemsPerPage = 5;

  console.log("TOdos length:: ", todos.length);

  // if (!context) {
  //   console.error(
  //     "ModalContext is undefined. Ensure ModalProvider wraps the component tree."
  //   );
  //   return <div>Error: ModalContext is not defined.</div>;;
  // }

  const { isModalOpen, openModal, closeModal } = context;

  // Handle Create
  const handleCreate = async (todoData) => {
    try {
      await todoService.createTodo(todoData);
      fetchTodos(currentPage);
      // setIsModalOpen(false);
      closeModal();
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  };

  // Handle Update
  const handleUpdate = async (id, todoData) => {
    console.log(id);
    try {
      await todoService.updateTodo(id, todoData);
      fetchTodos(currentPage);
      setEditingTodo(null);
      // setIsModalOpen(false);
      closeModal();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      fetchTodos(currentPage);
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Handle Bulk Delete
  const handleBulkDelete = async () => {
    try {
      for (const todoId of selectedTodos) {
        await todoService.deleteTodo(todoId);
      }
      setSelectedTodos(new Set());
      fetchTodos(currentPage);
    } catch (err) {
      setError("Error deleting selected todos");
    }
  };

  // Handle Search
  const handleSearch = async (keyword) => {
    try {
      const response = await todoService.searchTodos(keyword);
      setTodos(response.body || []);
    } catch (err) {
      console.error("Error searching todos:", err);
    }
  };

  // Handle Filter
  const handleFilter = async (filters) => {
    try {
      const response = await todoService.filterTodos(filters);
      setTodos(response.body || []);
    } catch (err) {
      console.error("Error filtering todos:", err);
    }
  };

  // Pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Select/Deselect Todos
  const handleCheckboxChange = (todoId) => {
    setSelectedTodos((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(todoId)) {
        updatedSelected.delete(todoId);
      } else {
        updatedSelected.add(todoId);
      }
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectedTodos.size === todos.length) {
      setSelectedTodos(new Set());
    } else {
      setSelectedTodos(new Set(todos.map((todo) => todo.todoId)));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const isAllSelected = selectedTodos.size === todos.length;

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoService.getAllTodos();
      const allTodos = response.body || [];
      setTotalPages(Math.ceil(allTodos.length / itemsPerPage));
      setTodos(allTodos); // Store all todos
      setError(null);
    } catch (err) {
      setError("Error fetching todos");
    } finally {
      setLoading(false);
    }
  };
 
  const getCurrentPageTodos = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return todos.slice(indexOfFirstItem, indexOfLastItem);
  };

  useEffect(() => {
    console.log("Fetching todos for page:", currentPage);
    fetchTodos(currentPage);
  }, [currentPage]);
  

  return (
    <div className="container mt-4">
      {/* Header Actions */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingTodo(null);
            // setIsModalOpen(true);
            openModal();
          }}
        >
          Add Todo
        </button>
        {selectedTodos.size > 0 && (
          <button className="btn btn-danger" onClick={handleBulkDelete}>
            Delete Selected ({selectedTodos.size})
          </button>
        )}
      </div>

      {/* Error and Loading States */}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {/* Todo Modal */}
      {isModalOpen && (
        <TodoForm
          onSubmit={
            editingTodo
              ? (data) => handleUpdate(editingTodo.todoId, data)
              : handleCreate
          }
          initialData={editingTodo}
          // onClose={handleCloseModal}
          isModalOpen={openModal}
        />
      )}

      {/* Todo Table */}
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageTodos().map((todo) => (
              <tr key={todo.todoId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTodos.has(todo.todoId)}
                    onChange={() => handleCheckboxChange(todo.todoId)}
                  />
                </td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.priority}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => {
                      setEditingTodo(todo);
                      // setIsModalOpen(true);
                      openModal();
                    }}
                  >
                   <i class="fa fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(todo.todoId)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination mt-3">
        <Pagination
          totalItems={todos.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TodoList;
