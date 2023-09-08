import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layouts/Main";
import Deshboard from "../components/Deshboard";
import AddNewTask from "../components/AddNewTask";
import AllTasks from "../components/AllTasks";
import Employee from "../components/Employee";
import Registration from "../components/SigninSignup/Registration";
import Signin from "../components/SigninSignup/Singin";
import Teams from "../components/Teams";
import PrivateRoute from "./PrivateRoute";
import TeamRequest from "../components/TeamRequest";
import MyTeams from "../components/MyTeams";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,

      children:[
        {
            path:'/',
            element:<Deshboard></Deshboard>
        },
        {
            path:'/addTask',
            element:<PrivateRoute><AddNewTask></AddNewTask></PrivateRoute>
        },
        {
            path:'/allTasks',
            element:<PrivateRoute><AllTasks></AllTasks></PrivateRoute>
        },
        {
            path:'/employee',
            element:<Employee></Employee>
        },
        {
            path:'/myTeams',
            element:<PrivateRoute><MyTeams></MyTeams></PrivateRoute>
        },
        {
            path:'/teamRequest',
            element:<PrivateRoute><TeamRequest></TeamRequest></PrivateRoute>
        },
        {
            path:'/teams',
            element:<PrivateRoute><Teams></Teams></PrivateRoute>
        },
        {
          path:'/signin',
          element:<Signin></Signin>
        },
        {
          path:'/registration',
          element:<Registration></Registration>
        }

      ]
      ,
     
    },
  ]);
  