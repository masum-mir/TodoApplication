import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const TodoForm = ({ onSubmit, initialData = null }) => {
 console.log("OnSUbmit:: ", onSubmit)

 const { isModalOpen, closeModal } = useContext(ModalContext);

  const [todo, setTodo] = useState(initialData || {
    title: '',
    description: '',
    priority: 'MEDIUM',
    dueDate: ''
  }); 
  
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  // const modalRef = useRef(null);
  // const modalInstance = useRef(null);

  // useEffect(() => {
  //   if (!modalRef.current) return;
    
  //   modalInstance.current = new Modal(modalRef.current);
   
  //   if (isModalOpen) {
  //     modalInstance.current.show();
  //   } else {
  //     modalInstance.current.hide();
  //   }

  //   return () => {
     
  //     if (modalInstance.current) {
  //       modalInstance.current.dispose();
  //     }
  //   };
  // }, [isModalOpen]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e:: ", e)
    onSubmit(todo);
    closeModal();
  };

  // if (!initialData && !onClose) return null;

  

  return (
    <div
    className={`modal fade ${isModalOpen ? "show" : ""}`}
    style={{ display: isModalOpen ? "block" : "none" }}
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-hidden={!isModalOpen}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {initialData ? 'Edit Todo' : 'Add Todo'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="title"
                    name="title"
                    value={todo.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    name="description"
                    value={todo.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    name="priority"
                    value={todo.priority}
                    onChange={handleChange}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    name="dueDate"
                    value={todo.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {initialData ? 'Update' : 'Save'} Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
 