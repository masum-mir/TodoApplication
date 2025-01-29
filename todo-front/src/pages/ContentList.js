// import React, { useEffect, useState, createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { contentService } from "../services/editorService";
// import LoadingSpinner from "../utils/LoadingSpinner";
// import ErrorMessage from "../utils/ErrorMessage";
// import "../styles/main.css";
// import { ModalContext } from "../context/ModalContext";
// import Pagination from "../utils/Pagination";

// const ContentList = () => {
//   const [content, setcontent] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedcontent, setSelectedcontent] = useState(new Set());
//   const [editingTodo, setEditingTodo] = useState(null);
//   // const [isModalOpen, setIsModalOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const itemsPerPage = 5;

//   console.log("content length:: ", content.length);

//   // Handle Create
//   const handleCreate = async (todoData) => {
//     try {
//       await contentService.createTodo(todoData);
//       fetchcontent(currentPage);
//     } catch (err) {
//       console.error("Error creating todo:", err);
//     }
//   };

//   // Handle Update
//   const handleUpdate = async (id, todoData) => {
//     console.log(id);
//     try {
//       await contentService.updateTodo(id, todoData);
//       fetchcontent(currentPage);
//       setEditingTodo(null);
//     } catch (err) {
//       console.error("Error updating todo:", err);
//     }
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     try {
//       await contentService.deleteTodo(id);
//       fetchcontent(currentPage);
//     } catch (err) {
//       console.error("Error deleting todo:", err);
//     }
//   };

//   // Handle Bulk Delete
//   const handleBulkDelete = async () => {
//     try {
//       for (const todoId of selectedcontent) {
//         await contentService.deleteTodo(todoId);
//       }
//       setSelectedcontent(new Set());
//       fetchcontent(currentPage);
//     } catch (err) {
//       setError("Error deleting selected content");
//     }
//   };

//   // Handle Search
//   const handleSearch = async (keyword) => {
//     try {
//       const response = await contentService.searchcontent(keyword);
//       setcontent(response.body || []);
//     } catch (err) {
//       console.error("Error searching content:", err);
//     }
//   };

//   // Handle Filter
//   const handleFilter = async (filters) => {
//     try {
//       const response = await contentService.filtercontent(filters);
//       setcontent(response.body || []);
//     } catch (err) {
//       console.error("Error filtering content:", err);
//     }
//   };

//   // Pagination
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Select/Deselect content
//   const handleCheckboxChange = (todoId) => {
//     setSelectedcontent((prevSelected) => {
//       const updatedSelected = new Set(prevSelected);
//       if (updatedSelected.has(todoId)) {
//         updatedSelected.delete(todoId);
//       } else {
//         updatedSelected.add(todoId);
//       }
//       return updatedSelected;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedcontent.size === content.length) {
//       setSelectedcontent(new Set());
//     } else {
//       setSelectedcontent(new Set(content.map((todo) => todo.todoId)));
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };
//   const isAllSelected = selectedcontent.size === content.length;

//   // Fetch content
//   const fetchcontent = async () => {
//     try {
//       setLoading(true);
//       const response = await contentService.getAllContent();
//       console.log("content response:: ", response);
//       const allcontent = response.body || [];
//       console.log("all content:: ", allcontent);
//       setTotalPages(Math.ceil(allcontent.length / itemsPerPage));
//       setcontent(allcontent); // Store all content
//       setError(null);
//     } catch (err) {
//       setError("Error fetching content ", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCurrentPagecontent = () => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     return content.slice(indexOfFirstItem, indexOfLastItem);
//   };

//   useEffect(() => {
//     console.log("Fetching content for page:", currentPage);
//     // fetchcontent(currentPage);
//     const fetchcontent = async () => {
//       try {
//         const response = await contentService.getAllContent();
//         const allcontent = response.body || [];
//         console.log("all content:: ", allcontent);
//         setcontent(allcontent);
//       } catch (err) {
//         console.log("Error fetching content ", err);
//       }
//     };
//     fetchcontent();
//   }, [currentPage]);

//   return (
//     <div className="container mt-4">
//       {/* Header Actions */}
//      <div className="header">Notes</div>

//       {/* Error and Loading States */}
//       {loading && <LoadingSpinner />}
//       {error && <ErrorMessage message={error} />}

//       {/* Todo Table */}
//       <div className="table-container">
    
           
//           <div>
//   {content.map((block, index) => { 
//     if (!block.content) return null; // Skip if content is null or undefined

//     let parsedContent = [];
//     try {
//       parsedContent = JSON.parse(block.content); // Parse JSON safely
//       if (!Array.isArray(parsedContent)) return null; // Ensure it's an array
//       console.log("Data:: ", parsedContent);
//     } catch (err) {
//       console.error("Error parsing JSON:", err);
//       return null; // Skip rendering if JSON is invalid
//     }
//     return parsedContent.map((item, subIndex) => (
//       <div key={`${index}-${subIndex}`}>
//         <textarea>
//           {(() => {
//             switch (item.type) {
//               case "heading":
//                 return (
//                   <h1 key={subIndex} style={{ fontFamily: item.children[0].fontFamily, fontSize: item.children[0].fontSize, color: item.children[0].color }}>
//                     {item.children[0].text}
//                   </h1>
//                 );
//               case "blockquote":
//                 return (
//                   <blockquote key={subIndex} style={{ fontFamily: item.children[0].fontFamily, fontSize: item.children[0].fontSize, color: item.children[0].color }}>
//                     {item.children[0].text}
//                   </blockquote>
//                 );
//               case "code":
//                 return (
//                   <pre key={subIndex} style={{ fontFamily: item.children[0].fontFamily, fontSize: item.children[0].fontSize, color: item.children[0].color }}>
//                     <code>{item.children[0].text}</code>
//                   </pre>
//                 );
//               case "list":
//                 return (
//                   <ul key={subIndex} style={{ fontFamily: item.children[0].fontFamily, fontSize: item.children[0].fontSize, color: item.children[0].color }}>
//                     <li>{item.children[0].text}</li>
//                   </ul>
//                 );
//               default:
//                 return (
//                   <p key={subIndex} style={{ fontFamily: item.children[0].fontFamily, fontSize: item.children[0].fontSize, color: item.children[0].color }}>
//                     {item.children[0].text}
//                   </p>
//                 );
//             }
//           })()}
//         </textarea>
//       </div>
//     ));
//   })}
// </div>
 
//       </div>
       
//     </div>
//   );
// };

// export default ContentList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contentService } from "../services/editorService";
import LoadingSpinner from "../utils/LoadingSpinner";
import ErrorMessage from "../utils/ErrorMessage"; 
import "../styles/editorPanel.css"

const ContentList = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await contentService.getAllContent();
      setContent(response.body || []);
    } catch (err) {
      console.error("Error fetching content:", err);
      setError("Error fetching content.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderContent = (item, key) => {
    const styles = {
      fontFamily: item.children[0]?.fontFamily,
      fontSize: item.children[0]?.fontSize,
      color: item.children[0]?.color,
    };

    switch (item.type) {
      case "heading":
        return <h1 key={key} style={styles}>{item.children[0]?.text}</h1>;
      case "blockquote":
        return <blockquote key={key} style={styles}>{item.children[0]?.text}</blockquote>;
      case "code":
        return <pre key={key} style={styles}><code>{item.children[0]?.text}</code></pre>;
      case "list":
        return <ul key={key} style={styles}><li>{item.children[0]?.text}</li></ul>;
      default:
        return <p key={key} style={styles}>{item.children[0]?.text}</p>;
    }
  };

  return (
    <div className="container mt-4">
      <div className="header">Notes</div>
      
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      <div className="content-container">
        {content.map((block, index) => {
          if (!block.content) return null;
          
          let parsedContent = [];
          try {
            parsedContent = JSON.parse(block.content);
            if (!Array.isArray(parsedContent)) return null;
          } catch (err) {
            console.error("Error parsing JSON:", err);
            return null;
          }

          return (
            <div key={index} className="content-block">
              {parsedContent.map((item, subIndex) => renderContent(item, `${index}-${subIndex}`))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentList;
