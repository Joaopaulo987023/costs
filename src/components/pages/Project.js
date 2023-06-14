import { useParams } from "react-router-dom"
import {useState,useEffect} from 'react'
import Loading from "../layout/Loading"
import Container from "../layout/Container"
import styles from './Project.module.css'
import ProjectForm from "../projects/ProjectForm"
import Message from "../layout/Message"
import ServicesForm from "../services/ServicesForm"
import ServiceCard from "../services/ServiceCard"

import { parse, v4 as uuidv4} from 'uuid'


function Project(){
    const { id } = useParams()
    const[project,setProject]=useState([])
    const[showProjectForm,setShowProjectForm]=useState(false) //mostrar detalhes do projeto
    const[message,setMessage]=useState() // controle das mensagens quando algo acontecer
    const[type, setType]=useState() //setar o tipo da msg error ou success
    const[showServiceForm,setShowServiceForm]=useState(false)
    const[services,setServices]=useState([])
    
    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method:'GET',
            headers: {"Content-type":"application/json"}
        }).then((resp)=>resp.json())
        .then((data)=>{
            setProject(data),
            setServices(data.services)//dentro do projeto pega o objeto services
        
        })
        .catch((error)=>console.log(error))
        },300)
    },[id]) //monitorando o id

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm) //negativo de project form, se ele ta true fica false
                                                 //se está false fica true
    
    } 

    function toggleServiceForm(){
        setShowServiceForm(true) //negativo de project form, se ele ta true fica false
                                                 //se está false fica true
    
    } 
    
    function editPost(project){
        setMessage('')

        //buget Validation
        if(project.budget< project.costs){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:"PATCH",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(project)
        }).then((resp)=>resp.json())
        .then((data)=>{
            setShowProjectForm(false)
            setProject(data)
            setMessage("Projeto atualizado com sucesso!")
            setType('success')
        })
        .catch((error)=>console.log(error))
    }

    function createServices(project){
        setMessage('')
        //Last services(pegando o ultimo serviço)
        const lastServices = project.services[project.services.length-1]  
        lastServices.id= uuidv4()

        const lastServicesCost = lastServices.costs
        const newCost = parseFloat(project.costs) + parseFloat(lastServicesCost)
        //valor do custo total do projeto + valor do ultimo serviço
        

        // Maximum value validation
        if(newCost > parseFloat(project.budget)){
                
                setMessage('Orçamento ultrapassado, verifique o valor do serviço')
                setType('error')
                project.services.pop() //remove o objeto da lista
                return false
        }
        project.costs = newCost


        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:"PATCH",
            headers: {
                "Content-type":"application/json"
            },
            body:JSON.stringify(project)
        }).then((resp)=>resp.json())
        .then((data)=>
            setShowServiceForm(false) // quando eu adicionar um serviço eu quero que o showServiceForm suma
        ).catch((err)=>console.log(err))

    }

    function removeService(id,costs){

        const servicesUpdated = project.services.filter((service)=>service.id!==id)

        const projectUpdated = project

        projectUpdated.services=servicesUpdated

        projectUpdated.costs = parseFloat(projectUpdated.costs) - parseFloat(costs)


        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method:"PATCH",
            headers: {
                "Content-type": "application/json"
        },
            body:JSON.stringify(projectUpdated)

        }).then((resp)=>resp.json())
        .then((data)=>{
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage("Serviço excluído com sucesso")
        setType('success')}
        )
        .catch((error)=>console.log(error))
    }

    return(
        <> {
            project.name?(
                <div className={styles.project_details}>
                    {message && <Message type={type} msg={message}/>}
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>{project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm? 'Editar projeto' : 'Fechar'} 
                                {/* se o meu showProjectForm estiver false ou seja não estiver mostrando o formulario de edição do projeto, o text do botao será Editar projeto, caso contrário será fechar */}
                            </button>
                            {!showProjectForm?(
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento Total: </span>R${project.budget}
                                    </p>
                                    <p>
                                        <span>Orçamento Utilizado: </span>R${project.costs}
                                    </p>
                                </div>
                            ):(
                                //mostrando detalhes do projeto
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                    btnText='Concluir Edição' 
                                    projectData={project} 
                                    handleSubmit={editPost}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                                <h2>Adicione um serviço</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm? 'Adicionar serviço' : 'Fechar'} </button>
                                <div className={styles.project_info}>
                                    {showServiceForm && <div>Formulario de serviço</div>}
                                </div>
                                <div className={styles.project_info}>
                                    {showServiceForm && <ServicesForm
                                    handleSubmit={createServices}
                                    btnText='Adicionar serviço'
                                    projectData={project}
                                    />}
                                    
                                </div>
                            </div> 
                            <div className={styles.project_info}>
                                    <h2>Serviços</h2>
                                    <Container customClass='start'>
                                        {services.length>0 &&
                                            services.map(service=>(
                                                <ServiceCard
                                                name={service.name}
                                                id={service.id}
                                                costs={service.costs}
                                                description={service.description}
                                                key={service.id}
                                                handleRemove={removeService}
                                                />
                                            ))
                                        }{services.length === 0 && <p>Não há serviços cadastrados</p>

                                        }
                                    </Container>
                                </div>
                    </Container>
                </div>

            ):(
            <Loading/>)
        }  
        </>
    )
}

export default Project