import jwt from 'jsonwebtoken'

let users = []

const secret = process.env.PASS_JWT

function createToken(user){
  //criação do token do usuário, primeiro parâmetro é o objeto, e o segundo é senha para acessar esses dados
  return jwt.sign({email: user.email, nome: user.nome}, secret)
}

function readToken(token){
  try {
    //verificação se a chave secreta está certa junto do token, retorna true ou false (coração do login)
    return jwt.verify(token, secret)

  } catch (error) {
    console.log(error)
    throw new Error("Token inválido")
  }
}

export function verifica(token) {
  return readToken(token)
}

export function cadastro(body){
  const user = users.find(({email}) => email == body.email)
  if (user) throw new Error("Usuário já cadastrado")
  
  users.push(body)

  const token = createToken(body)
  return token
}

export function login(body){
  const user = users.find(({email}) => email == body.email)
  
  if(!user) throw new Error("Usuário não encontrado")
  if(user.password !== body.password) throw new Error("Senha incorreta")

  const token = readToken(user)
  return token
}