import {useEffect, useState} from 'react'

import Input from "../form/Input"
import Select from "../form/Select"
import Submit from "../form/Submit"
import styles from './ProjectForm.module.css'
function ProjectForm({btnText , handleSubmit, projectData}){
    const [categories, setCategories]= useState([])
    const [project, setProject] = useState(projectData || {})


    //useEffect renderiza 
    useEffect(()=>{
        fetch('http://localhost:5000/categories',{
        method: 'GET',
        headers: {"Content-type":"application/json"
        },
    })
    .then((resp)=> resp.json())
    .then((data)=>setCategories(data)
    ).catch((err)=>console.log(err))
    },[])
    
    const submit = (e)=> {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({ ...project, [e.target.name]: e.target.value })//pegando o objeto atual, e dizendo que o target.name vai ser o valor que está no target.value (o que o usuario digitou)
        
    }
    function handleCategory(e) {
        setProject({
          ...project,
          category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
          },
        })
      }
    
    return(
        <form onSubmit={submit} className={styles.form}>
            <Input text='Nome do projeto' 
            name='name'
            value={project.name}
            type="text"
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
            />

            <Input text='Valor do orçamento' 
            name='budget' 
            type="number"
            placeholder="Insira o orçamento do projeto"
            handleOnChange={handleChange}
            value={project.budget}
            />
            <Select 
            options={categories}text='Selecione a categoria'
            name="category_id"
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
            />

            <Submit type='submit' text={btnText}/>

        </form>
    )
}

export default ProjectForm