import Input from '../form/Input'
import Submit from '../form/Submit'
import styles from '../projects/ProjectForm.module.css'
import { useState } from 'react'

function ServicesForm({handleSubmit, btnText, projectData}){

    const[service, setService] = useState([])

    const submit=(e)=>{
        e.preventDefault()
        projectData.services.push(service) //jogando serviços dentro dos serviços(pode ter mais de 1)
        handleSubmit(projectData)
        
    }
    function handleChange(e){
        setService({ ...service, [e.target.name]: e.target.value}) //pegando o objeto atual, e dizendo que o target.name vai ser o valor que está no target.value (o que o usuario digitou name:value uma chave comum de um objeto)
    }
    return(
        <div>
            <form onSubmit={submit} className={styles.form}>
                <Input 
                    text='Nome do serviço'
                    type='text'
                    name='name'
                    placeholder="Insira o nome do serviço"
                    handleOnChange={handleChange}
                />
                 <Input 
                    text='Custo do serviços'
                    type='number'
                    name='costs'
                    placeholder="Insira o custo do serviço"
                    handleOnChange={handleChange}
                />
                 <Input 
                    text='Descrição do serviço'
                    type='text'
                    name='description'
                    placeholder="Descreva o serviço"
                    handleOnChange={handleChange}
                />
                <Submit type='submit' text={btnText}/>
            </form>
        </div>
    )
}

export default ServicesForm

