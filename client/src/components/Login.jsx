import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context';



const Login = () => {


  const {isAuth, setIsAuth} = useContext(AuthContext)
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[emailDirty, setEmailDirty] = useState(false)
  const[passwordDirty, setPasswordDirty] = useState(false)
  const[emailError, setEmailError] = useState('Email не может быть пустым')
  const[passwordError, setPasswordError] = useState('Пароль не может быть пустым')
  const[formValid, setFormValid] = useState(false)
  const[serverMessage, setServerMessage] = useState('')
  
  async function postUser() {
          await axios.post('http://localhost:5000/api/login',{
             "email": email,
             "password":password
          }).then(res => {
            const user = {
              id: res.data.user.id, 
              email:res.data.user.email,
              firstname: res.data.user.firstname,
              lastname: res.data.user.lastname,
          }
          console.log(res.data.user)
          setServerMessage(res.data.message)
          localStorage.setItem('user', JSON.stringify(user));
                
                if(res.data.valid === true){
                  setIsAuth(true)
                }
                 
              }
            
           )
           
          }
     

  useEffect(() => {
    if(emailError || passwordError){
      setFormValid(false)
    }
    else{
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const emailHandler = (e) =>{
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(String(e.target.value).toLowerCase())){
      setEmailError("Некорректный email")
    }
    else{
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length<6 || e.target.value.length>15){
      setPasswordError("Пароль должен быть длинее 6 и меньше 15")
      if(!e.target.value){
        setEmailError('Пароль не может быть пустым')
      }
    }
    else{
      setPasswordError('')
    }
   
  }

  const blurHandler = (e) =>{
    switch (e.target.name){
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
        default:

    }
  }
  
    const login = event => {
        event.preventDefault() 
        postUser()
        localStorage.setItem('auth', 'true')
       
    }
   
    
  

    return(
        <div className='login'>
            <h1 style={{textAlign: 'center'}}>Авторизация</h1>
            {serverMessage
            ?<h4 style={{textAlign: 'center', color:'teal'}}>{serverMessage}</h4>
            :null}
            <form onSubmit={login}>
            {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
            <input className='myinput' onChange={e=> emailHandler(e)} value={email} onBlur={e=> blurHandler(e)} name='email' type='text' placeholder='Введите ваш email...'/>
            {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
            <input className='myinput' onChange={e=> passwordHandler(e)} value={password} name='password' type='password' placeholder='Введите ваш пароль...'/>
            <div className='myinput'>
            
            <button className='myinput' type='submit'>Войти</button>
            
            
            </div>
           
            
                
                
            </form>
           <Link to={`/Registration`} >
            <button className='myinput'>Регистрация</button>
           </Link>
              
        </div>
    )
}

export default Login; 