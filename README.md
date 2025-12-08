# 🛒 Mini E-Commerce Angular - Projeto Final

[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com/)
[![Coverage](https://img.shields.io/badge/Coverage-86.84%25-brightgreen?style=for-the-badge)](https://angular.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**Funcionalidades principais:**
- ✅ CRUD completo de produtos com Reactive Forms
- ✅ Carrinho de compras com persistência em localStorage
- ✅ Contador dinâmico no navbar em tempo real
- ✅ Interface responsiva com Bootstrap 5
- ✅ 33 testes unitários com 86.84% de cobertura
- ✅ API REST completa com Spring Boot

## 🏗️ Arquitetura Full-Stack

### Frontend (Angular)
```text
src/
├── components/ # Componentes Angular
├── services/ # Serviços HTTP e estado
├── interfaces/ # Tipos TypeScript
└── environments/ # Configurações
```

## 🔗 Integração Backend-Frontend

### 1. Clone ambos os repositórios
```bash
# Frontend
git clone https://github.com/SamuelloranD/mini-e-commerce-front
cd mini-e-commerce-front

# Backend (em outra pasta)
git clone https://github.com/SamuelloranD/mini-e-commerce-backk
```

### 2. Execute o Backend
```bash
# API disponível em: http://localhost:8080
```

### 3. Execute o Frontend
```bash
cd mini-e-commerce-front
npm install
ng serve
# App disponível em: http://localhost:4200
```

### 4. Configure a conexão
O frontend já está configurado para consumir a API local:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/produtos'
};
```

## 🧪 Testes Unitários
Resultados:
✅ 33 testes unitários implementados
✅ 86.84% de cobertura de código
✅ 100% cobertura em branches (decisões lógicas)
✅ 83.78% cobertura em funções
✅ 86.95% cobertura em linhas
✅ TODOS os testes PASSANDO

## 🔧 Tecnologias Utilizadas

### Frontend
*   Framework: Angular 18
*   Linguagem: TypeScript 5.3
*   UI: Bootstrap 5.3 + Bootstrap Icons
*   Estado: RxJS + BehaviorSubject
*   Persistência: LocalStorage API
*   HTTP: Angular HttpClient
*   Forms: Reactive Forms
*   Testes: Jasmine + Karma

## 📚 Padrões e Boas Práticas

### Arquitetura Limpa
```typescript
// Frontend: Separação clara de responsabilidades
ProductService → Apenas chamadas HTTP (GET, POST, PUT, DELETE)
CartService → Apenas gerenciamento de estado (LocalStorage, cálculos)

// Backend: Arquitetura em camadas
Controller → Service → Repository → Database
```

### Tipagem Forte
*   TypeScript no frontend com zero uso de `any`
*   
## 🚀 Scripts Disponíveis

### Frontend

| Comando | Descrição |
| :--- | :--- |
| `ng serve` | Inicia servidor de desenvolvimento |
| `ng build` | Compila para produção |
| `ng test` | Executa testes unitários |
| `ng test --code-coverage` | Executa testes com relatório de coverage |

## 👨‍💻 Autor
Samuel Lorand

GitHub: https://github.com/SamuelloranD

LinkedIn: https://www.linkedin.com/in/samuellorand/

⭐ Gostou do projeto? Deixe uma estrela nos repositórios!

Frontend: https://github.com/SamuelloranD/mini-e-commerce-front
Backend: https://github.com/SamuelloranD/mini-e-commerce-backk
