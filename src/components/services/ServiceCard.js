import styles from '../projects/ProjectCard.module.css'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
function ServiceCard({id, handleRemove, name,description,costs}){

    const remove=(e)=>{
        e.preventDefault()
        handleRemove(id, costs)
    }
    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total</span> R${costs}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/>Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard