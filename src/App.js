import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Projects from './components/pages/Projects';
import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import NewProject from './components/pages/NewProject';
import Project from './components/pages/Project';
function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass='min-height'>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/company' element={<Company/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/projects' element={<Projects/>}/>
            <Route path='/newproject' element={<NewProject/>}/>
            { <Route path='/project/:id' element={<Project/>}/> /* foi declarado desse jeito para que possamos acessar a pagina com o id do projeto para edição */}
        </Routes>
      </Container>  
      <Footer/>
    </Router>
    
  )
}

export default App;
