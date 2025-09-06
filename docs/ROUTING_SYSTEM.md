# Sistema de Roteamento - WeMove Frontend

## Rotas Implementadas

Este projeto agora inclui um sistema de roteamento completo usando React Router DOM.

### Rotas Disponíveis

- **`/`** - Página inicial (Home)
- **`/login`** - Tela de login 
- **`/register`** - Tela de registro (em desenvolvimento)

### Componentes Criados

#### Páginas

1. **`src/pages/Home.tsx`** - Página inicial com links para login e registro
2. **`src/pages/Login.tsx`** - Tela de login baseada no design do Figma
3. **`src/pages/Register.tsx`** - Tela de registro (placeholder)

#### Tela de Login

A tela de login foi desenvolvida seguindo o design do Figma e inclui:

- Layout mobile-first com largura máxima de dispositivo móvel
- Barra de status simulada (horário, sinal, bateria)
- Logo da WeMove com fallback em caso de imagem não encontrada
- Formulário de login com:
  - Campo de email com ícone
  - Campo de senha com ícone
  - Botão de login
- Link para registro na parte inferior

#### Funcionalidades

- **Navegação**: Sistema de roteamento com React Router DOM
- **Componentes Reutilizáveis**: Usa os componentes `Input` e `Button` já existentes
- **Responsivo**: Design otimizado para dispositivos móveis
- **Fallbacks**: Imagens com fallback em caso de erro
- **Validação**: Campos obrigatórios no formulário

### Tecnologias Utilizadas

- React Router DOM v6
- TypeScript
- Tailwind CSS
- Lucide React (ícones)
- Componentes customizados existentes

### Como Usar

1. Navegue para `http://localhost:5173/` para a página inicial
2. Clique em "Fazer Login" ou navegue para `/login`
3. Preencha os campos de email e senha
4. Clique no botão "Login" para testar (atualmente apenas console.log)

### Próximos Passos

- [ ] Implementar autenticação real
- [ ] Completar tela de registro
- [ ] Adicionar validação de formulário
- [ ] Implementar proteção de rotas
- [ ] Adicionar dashboard/home após login
