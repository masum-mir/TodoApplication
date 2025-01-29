import { createContext, useState } from "react";
import TodoList from "../pages/TodoList";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {/* {children} */}
      <TodoList />
    </ModalContext.Provider>
  );
};
