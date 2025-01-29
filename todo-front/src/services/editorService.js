const API_BASE_URL = 'http://localhost:8088/api/editor';


export const contentService = {
    async getAllContent() {
      const response = await fetch(API_BASE_URL, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        } 
      });
      console.log("Response:: ", response);
      return await response.json();
    },
  
    async createContent(todo) {
      const response = await fetch(`${API_BASE_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(todo)
      });
      return await response.json();
    },
  
    async updateContent(id, todo) {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(todo)
      });
      return await response.json();
    },
  
    async deleteContent(id) {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    },
    
  };

