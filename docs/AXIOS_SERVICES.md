# Guia de Uso - Axios e Services

## 📁 Estrutura de Arquivos

```
src/
├── lib/
│   └── axios.ts              # Configuração base do axios com interceptors
├── types/
│   └── auth.ts               # Tipos TypeScript para autenticação
├── services/
│   ├── auth.service.ts       # Service de autenticação
│   └── example.service.ts    # Template para novos services
└── pages/
    └── Login.tsx             # Exemplo de uso do auth service
```

## 🚀 Configuração Inicial

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (já existe um `.env.example` como referência):

```env
VITE_API_URL=http://localhost:3000/api
```

### 2. Como Funciona

#### **Configuração do Axios** (`src/lib/axios.ts`)

- Cria uma instância do axios com configurações base
- **Interceptor de Request**: Adiciona automaticamente o token JWT em todas as requisições
- **Interceptor de Response**: Trata erros globalmente (401, 500, etc.)
- Redireciona para login se o token expirar

#### **Services** (`src/services/`)

Os services encapsulam toda a lógica de comunicação com a API:

- **authService**: Gerencia autenticação (login, registro, logout)
- **exampleService**: Template para criar novos services

## 📝 Como Usar

### Autenticação

```typescript
import { authService } from "@/services/auth.service"

// Login
try {
  const response = await authService.login({
    email: "usuario@email.com",
    password: "senha123"
  })
  console.log("Usuário logado:", response.user)
  // Token é salvo automaticamente no localStorage
} catch (error) {
  console.error("Erro no login:", error)
}

// Registro
const newUser = await authService.register({
  name: "João Silva",
  email: "joao@email.com",
  password: "senha123"
})

// Logout
authService.logout()

// Verificar se está autenticado
const isAuth = authService.isAuthenticated()

// Pegar usuário atual
const user = authService.getCurrentUser()

// Verificar autenticação com o servidor
const updatedUser = await authService.verifyAuth()
```

### Criando Novos Services

Use o `example.service.ts` como template:

```typescript
import { api } from "@/lib/axios"

type Product = {
  id: string
  name: string
  price: number
}

class ProductService {
  private readonly endpoint = "/products"

  async getAll(): Promise<Product[]> {
    const response = await api.get<Product[]>(this.endpoint)
    return response.data
  }

  async getById(id: string): Promise<Product> {
    const response = await api.get<Product>(`${this.endpoint}/${id}`)
    return response.data
  }

  async create(data: Omit<Product, "id">): Promise<Product> {
    const response = await api.post<Product>(this.endpoint, data)
    return response.data
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const response = await api.put<Product>(`${this.endpoint}/${id}`, data)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await api.delete(`${this.endpoint}/${id}`)
  }
}

export const productService = new ProductService()
```

### Usando em Componentes React

```typescript
import { useState } from "react"
import { productService } from "@/services/product.service"

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function loadProducts() {
    setLoading(true)
    setError("")
    
    try {
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError("Erro ao carregar produtos")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Use loadProducts() no useEffect ou em um botão
}
```

## 🔒 Tratamento de Erros

O axios está configurado para tratar erros automaticamente:

- **401 (Não Autorizado)**: Remove o token e redireciona para login
- **500 (Erro no Servidor)**: Loga o erro no console
- Outros erros são propagados para serem tratados no componente

### Tratando Erros Específicos

try {
  await authService.login({ email, password })
} catch (err) {
  const error = err as { response?: { data?: ApiError } }
  const errorMessage = error.response?.data?.message || "Erro desconhecido"
  console.error(errorMessage)
}
```

## 🎯 Boas Práticas

1. **Sempre use os services**: Nunca faça requisições diretas com axios nos componentes
2. **Tipos TypeScript**: Sempre defina os tipos das respostas da API
3. **Tratamento de erros**: Use try/catch em todas as chamadas assíncronas
4. **Loading states**: Sempre mostre feedback visual durante requisições
5. **Singleton pattern**: Exporte uma instância única do service

## 🔄 Fluxo de Autenticação

1. Usuário faz login → `authService.login()`
2. Service salva token no localStorage
3. Todas as requisições subsequentes incluem o token automaticamente
4. Se o token expirar (401), o usuário é redirecionado para login
5. Logout remove o token do localStorage

## 📚 Recursos Adicionais

- [Documentação do Axios](https://axios-http.com/docs/intro)
- [Interceptors do Axios](https://axios-http.com/docs/interceptors)
- [TypeScript com React](https://react-typescript-cheatsheet.netlify.app/)
