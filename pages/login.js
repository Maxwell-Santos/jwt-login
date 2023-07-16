import Button from "../src/components/button/button";
import Input from "../src/components/Input";
import LoginCard from "../src/components/LoginCard";
import styles from '../styles/Login.module.css'
import Link from 'next/link'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useState } from "react";


export default function Login(){

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("")
  const router = useRouter()

  function handleFormEdit(event, name){
    setFormData({
      ...formData,
      [name]: event.target.value //vai pegar o valor da variável name, para isso usa o colchetes
    })
  }
  
  const handleForm = async (e) => {

    try {
      e.preventDefault()
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(formData)
      })
      
      const json = await response.json()
      console.log(response.status)
      console.log(json)

      if(response.status !== 200) throw new Error(json)

      //primeiro param é o nome do cookie e o segundo é o valor, nesse caso o json para identificar o usuário
      setCookie('authorization', json)

      //rota segura só para quem tiver o login
      router.push("/")
    } catch (error) {
      setError(error.message)

    }
  }

  return(
    <div className={styles.background} onSubmit={handleForm}>
      <LoginCard title={"Entre na sua conta"}>
        <form className={styles.form}>
            
          <Input
            type="email"
            name="email"
            placeholder="seu e-mail"
            value={formData.email}
            onChange={(e) => handleFormEdit(e, 'email')}
            required
            />

          <Input
            type="password"
            name="password"
            placeholder="sua senha"
            value={formData.password}
            onChange={(e) => handleFormEdit(e, 'password')}
            required
          />
          <Button>
            Login
          </Button>
        {error && <span>{error}</span>}

        </form>        
        <Link href="/cadastro" >Ainda não possui conta ?</Link>
      </LoginCard>
    </div>
  )
}