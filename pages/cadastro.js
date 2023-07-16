import { useState } from "react";
import Link from "next/link";
import { setCookie } from "cookies-next";
import Button from "../src/components/button/button";
import Input from "../src/components/Input";
import LoginCard from "../src/components/LoginCard";

import {useRouter} from 'next/router'

import styles from '../styles/Login.module.css'

export default function Cadastro(){
  const [formData, setFormData] = useState({
    nome: "",
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
      const response = await fetch("/api/user/cadastro", {
        method: "POST",
        body: JSON.stringify(formData)
      })
      
      const json = await response.json()
      console.log(response.status)
      console.log(json)

      if(response.status !== 201) throw new Error(json)

      //primeiro param é o nome do cookie e o segundo é o valor, nesse caso o json para identificar o usuário
      setCookie('authorization', json)

      //rota segura só para quem tiver o login
      router.push("/login")
    } catch (error) {
      setError(error.message)
    }
  }

  return(
    <div className={styles.background}>
      <LoginCard title={"Crie sua conta"}>
      <form className={styles.form} onSubmit={handleForm}>
        <Input
          type="text"
          name="nome"
          placeholder="seu nome"
          value={formData.nome}
          onChange={(event) => handleFormEdit(event, "nome")}
          required
        />
        <Input 
          type="email"
          name="email"
          placeholder="seu e-mail"
          value={formData.email} 
          onChange={(event) => handleFormEdit(event, "email")}
          required
          />
        <Input 
          type="password"
          name="password"
          placeholder="sua senha" 
          value={formData.password} 
          onChange={(event) => handleFormEdit(event, "password")}
          required
          />

        <Button>
          cadastrar
        </Button>
        {error && <span>{error}</span>}
      </form>
      <Link href="/login" >Já possui conta?</Link>
      </LoginCard>
    </div>
  )
}