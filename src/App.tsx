/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import ToDoList from './Components/ToDoList';
import IndividualTask from './Components/[id]';
import { ApplicationContextProvider } from './Context/ApplicationContext';
import Completed from './Components/Completed';
import Missed from './Components/Missed';
import Edit from './Components/Edit';

function App() {

  return (
    <ApplicationContextProvider>
      <Routes>
        <Route path='/' element={ <Layout/> } >
          <Route index element={ <ToDoList/> }/>
          <Route path='/completed' element={ <Completed/> } />
          <Route path='/missed' element={ <Missed/> } />
          <Route path='/:id' element={ <IndividualTask/> }/>
          <Route path='/:id/edit' element={ <Edit/> } />
        </Route>
      </Routes>
    </ApplicationContextProvider>
  )
}

export default App
