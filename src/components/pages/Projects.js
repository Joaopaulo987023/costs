import Message from "../layout/Message"
import LinkButton from "../layout/LinkButton"
import Container from "../layout/Container"
import { useLocation } from 'react-router-dom'

import {useState, useEffect} from 'react'

import Loading from "../layout/Loading"

import styles from "./Projects.module.css"
import ProjectCard from "../projects/ProjectCard"

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading ,setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    useEffect(()=>{
        setTimeout(()=>{
            fetch('http://localhost:5000/projects',{
            method:"GET",
            headers:{"Content-type":"application/json"
                },
            })
                .then((resp)=>resp.json())
                .then((data)=>{
                    
                    setProjects(data)
                    setRemoveLoading(true)
                })    
                .catch((error)=>console.log(error))
        
        },400) // setando um timeOut para simular o carregamento de uma api externa
    },[])

    //criando função que remove os projetos do sistema, baseado no id
    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "DELETE",
            headers: {'Content-type':'application/json'},
        }).then((resp)=>resp.json())
        .then(data=>setProjects(projects.filter((project)=>project.id !== id)),
        setProjectMessage('Projeto removido com sucesso!')
        // meu setProject será a filtragem da lista de itens que não tenha esse id
    )}


    const location = useLocation()
    let message =''
    if(location.state){                 
        message=location.state.message
    }

    //pegando dinamicamente o valor passado na msg apos redirecionar a pagina usando o useNavigate
    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar projeto'/>
            </div>
            {message&& <Message msg={message} type='success'/>}
            {projectMessage&& <Message msg={projectMessage} type='success'/>}
            <Container>{projects.length>0 &&
                projects.map((project)=>(
                <ProjectCard 
                name={project.name}
                category={project.category.name}
                key={project.id}
                id={project.id}
                budget={project.budget}
                handleRemove={removeProject}
                />))}
            {!removeLoading && // Se o removeLoading for false ai eu vou e mostro o efeito de loading
                <Loading/>
             }
            {removeLoading && projects.length === 0 && ( // se removeLoading for true e não existir nenhum
                <p>Não há projetos cadastrados</p>)        // projeto, mostra esse paragrafo   
            }
             
            </Container>           
        </div>
    )
}

export default Projects
