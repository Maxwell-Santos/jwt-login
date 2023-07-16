//https://localhost:3000/api/user/login

import { login } from "../../../services/user"

export default function handler(req, res){
  try {
    const newUser = login(req.body)
    res.status(201).json(newUser)

  } catch (error) {
    res.status(400).json(error.message)
  }  
}
