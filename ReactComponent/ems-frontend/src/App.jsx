
import './App.css'
import EmployeeComponent from './components/Employee/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent'
import ListProjectComponent from './components/Project/ListProjectComponent'
//for configuring routes for different paths
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewEmployee from './components/Employee/ViewEmployee'
import ViewProject from './components/Project/ViewProject'
import ProjectComponent from './components/Project/ProjectComponent'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          { /* // whenever user hits this link: http://localhost:3000/ in the browser, this route will render */}
          <Route path='/' element={<ListEmployeeComponent />}></Route>
          {/*//http://localhost:3000/employees*/}
          <Route path='/employees' element={<ListEmployeeComponent />}></Route>
          {/*//http://localhost:3000/add-employee*/}
          <Route path='/add-employee' element={<EmployeeComponent />}></Route>
          {/*//http://localhost:3000/edit-employee/1*/}
          <Route path='/edit-employee/:id' element={<EmployeeComponent />}></Route>
          {/*//http://localhost:3000/edit-employee/view1*/}
          <Route path='/employees/view/:id' element={<ViewEmployee />}></Route>

          {/*All for projects*/}
          {/*//http://localhost:3000/projects*/}
          <Route path='/projects' element={<ListProjectComponent />}></Route>
          <Route path='/add-project' element={<ProjectComponent />}></Route>
          <Route path='/edit-project/:id' element={<ProjectComponent />}></Route>
          <Route path='/projects/view-project/:id' element={<ViewProject />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter> 
    </>
  )
}

export default App
