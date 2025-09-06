# Sistema de Tema We Move

Este documento descreve o sistema de tema implementado para a aplicação We Move, baseado na paleta de cores fornecida pelo Zeplin.

## Estrutura do Sistema

### 1. Tokens de Design (`src/lib/theme.ts`)

Os tokens de design são organizados em categorias:

- **Cores Base**: Branco e preto
- **Paleta da Marca**: Tons de azul (brand)
- **Estados de Feedback**: Success, Warning, Error
- **Escalas de Cinza**: Gray (claro) e GrayDark (escuro)
- **Tipografia**: Fontes, tamanhos e pesos
- **Espaçamentos**: Sistema de espaçamento consistente
- **Bordas**: Raios de borda padronizados
- **Sombras**: Elevações consistentes

### 2. CSS Custom Properties (`src/styles/tokens.css`)

As variáveis CSS são definidas para diferentes modos de tema:

```css
.-Light-Mode {
  /* Tokens para modo claro */
}

.-Dark-Mode {
  /* Tokens para modo escuro */
}
```

### 3. Configuração do Tailwind (`tailwind.config.ts`)

Extensão do Tailwind CSS para usar os tokens personalizados:

- Cores semânticas usando CSS custom properties
- Mapeamento dos tokens para classes do Tailwind
- Animações personalizadas

### 4. Provider de Tema (`src/lib/theme-provider.tsx`)

Context Provider que gerencia:
- Estado do tema (light/dark/system)
- Aplicação automática baseada na preferência do sistema
- Persistência da escolha do usuário

## Como Usar

### 1. Envolver a Aplicação com o Provider

```tsx
import { ThemeProvider } from '@/lib/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* Sua aplicação */}
    </ThemeProvider>
  )
}
```

### 2. Usar o Hook de Tema

```tsx
import { useTheme } from '@/lib/theme-provider'

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme('dark')}>
      Modo Escuro
    </button>
  )
}
```

### 3. Aplicar Cores Semânticas

Use as classes do Tailwind que referenciam os tokens:

```tsx
// Cores de texto
<p className="text-text-primary">Texto principal</p>
<p className="text-text-secondary">Texto secundário</p>
<p className="text-text-brand-primary">Texto da marca</p>

// Cores de background
<div className="bg-background-primary">Background principal</div>
<div className="bg-background-brand-solid">Background da marca</div>

// Cores de borda
<div className="border border-border-primary">Borda principal</div>
```

### 4. Usar Cores Diretas dos Tokens

```tsx
// Cores da marca
<div className="bg-brand-600 text-white">Botão primário</div>

// Estados de feedback
<div className="bg-success-50 text-success-700">Sucesso</div>
<div className="bg-error-50 text-error-700">Erro</div>
<div className="bg-warning-50 text-warning-700">Aviso</div>
```

## Vantagens do Sistema

1. **Consistência**: Cores e espaçamentos padronizados em toda a aplicação
2. **Acessibilidade**: Suporte automático a modo escuro e claro
3. **Manutenibilidade**: Alterações centralizadas nos tokens
4. **Escalabilidade**: Fácil adição de novos tokens e temas
5. **Performance**: CSS custom properties são altamente performáticas
6. **Flexibilidade**: Suporte a temas personalizados e múltiplos esquemas de cores

## Melhores Práticas

1. **Use cores semânticas** sempre que possível (text-primary ao invés de gray-900)
2. **Teste em ambos os temas** (claro e escuro) durante o desenvolvimento
3. **Mantenha contraste adequado** seguindo as diretrizes WCAG
4. **Evite cores hardcoded** - sempre use os tokens
5. **Documente novos tokens** quando adicioná-los ao sistema

## Componentes Incluídos

- **ThemeToggle**: Botão para alternar entre temas
- **Button**: Sistema de botões com variantes seguindo o design system
- **ColorShowcase**: Demonstração das cores disponíveis

Este sistema fornece uma base sólida e escalável para o desenvolvimento da interface da aplicação We Move, garantindo consistência visual e uma excelente experiência do usuário.
