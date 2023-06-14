import styles from './SubmitButton.module.css'
function Submit({type,text}){
    return(
        <div >
            <button className={styles.btn} type={type}>{text}</button>
        </div>
    )
}

export default Submit