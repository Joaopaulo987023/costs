import styles from './Input.module.css'
function Input({type,text,placeholder, name, value, handleOnChange}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type}
            placeholder={placeholder} 
            name={name} 
            onChange={handleOnChange}
            value={value}/>
        </div>     
    )
}

export default Input