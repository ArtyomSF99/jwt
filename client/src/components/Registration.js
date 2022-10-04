import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Registration = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
  const[emailDirty, setEmailDirty] = useState(false)
  const[passwordDirty, setPasswordDirty] = useState(false)
  const[firstNameDirty, setFirstNameDirty] = useState(false)
  const[lastNameDirty, setLastNameDirty] = useState(false)
  const[emailError, setEmailError] = useState('Email не может быть пустым')
  const[passwordError, setPasswordError] = useState('Пароль не может быть пустым')
  const[firstNameError, setFirstNameError] = useState('Имя не может быть пустым')
  const[lastNameError, setLastNameError] = useState('Фамилия не может быть пустым')
  const[formValid, setFormValid] = useState(false)
  const[serverMessage, setServerMessage] = useState('')

    async function createUser() {
        await axios.post('http://localhost:5000/api/registration',{
           "email": email,
           "password":password,
           "firstname": firstName,
           "lastname":lastName
        }).then(res => {
          
           setServerMessage(res.data.message)
         })
        }
         useEffect(() => {
            if(emailError || passwordError || firstNameError || lastNameError ){
              setFormValid(false)
            }
            else{
              setFormValid(true)
            }
          }, [emailError, passwordError, firstNameError, lastNameError])
        
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
                setPasswordError('Пароль не может быть пустым')
              }
            }
            else{
              setPasswordError('')
            }
        }
        
            const firstNameHandler = (e) => {
                setFirstName(e.target.value)
               
                  if(!e.target.value){
                    setFirstNameError('Имя не может быть пустым')
                  
                }
                else{
                  setFirstNameError('')
                }
            }
        
                const lastNameHandler = (e) => {
                    setLastName(e.target.value)
                    
                      if(!e.target.value){
                        setLastNameError('Фамилия не может быть пустым')
                      
                    }
                    else{
                      setLastNameError('')
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
              case 'firstName':
                setFirstNameDirty(true)
                break
              case 'lastName':
                setLastNameDirty(true)
                break     
        
            }
          }

         const login = event => {
            event.preventDefault()  
            createUser()
            console.log(email)
        }
    return(
        <div className="login">
            
            <h1 style={{textAlign: 'center'}}>Регистрация</h1>
            {serverMessage
            ?<h4 style={{textAlign: 'center', color:'teal'}}>{serverMessage}</h4>
            :null}
            <form onSubmit={login}>
            
            <div>
            {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
            <input className='myinput' onChange={e=> emailHandler(e)} value={email} onBlur={e=> blurHandler(e)} name='email' type='text' placeholder='Введите ваш email...'/>
            </div>
            <div>
            {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
            <input className='myinput' onChange={e=> passwordHandler(e)} value={password} name='password' type='password' placeholder='Введите ваш пароль...'/>
            </div>
            <div>
            {(firstNameDirty && firstNameError) && <div style={{color:'red'}}>{firstNameError}</div>}
            <input className='myinput' onChange={e=> firstNameHandler(e)} value={firstName} name='firstName' type='text' placeholder='Введите ваше имя...'/>
            </div>
            <div>
            {(lastNameDirty && lastNameError) && <div style={{color:'red'}}>{lastNameError}</div>}
            <input className='myinput' onChange={e=> lastNameHandler(e)} value={lastName} name='LastName' type='text' placeholder='Введите вашу фамилию...'/>
            </div>
            <div className='myinput'>
            <button className='myinput' type='submit'>Зарегистрироваться</button>
            </div>
            
            </form>
            
            <Link to={`/Login`} >
            <button className='myinput'>Войти</button>
            </Link>
        </div>
    )
}


export default Registration;