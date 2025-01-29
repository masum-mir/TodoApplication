// const routes = [
//     {
//       path: "/",
//       component: "Login",
//       isPublic: true,
//       title: "Login Page",
//     },
//     {
//       path: "/todoList",
//       component: "TodoList",
//       isProtected: true,
//       title: "Todo List",
//     },
//     {
//       path: "*",
//       component: "NotFound",
//       isPublic: true,
//       title: "404 - Page Not Found",
//     },
//   ];
  
//   export default routes;
export const ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    HOME: '/'
  },
  PRIVATE: {
    DASHBOARD: '/',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    TODO_LIST: '/todoList',
    CONTENT_LIST: '/contentList'
  }
};