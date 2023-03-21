# Kanban TypeScript | Backend

## Configuração

### Arquivo .env | ⚠️ IMPORTANTE ⚠️

Crie um arquivo na raiz chamado `.env`, seguindo o conteúdo dentro de `.env.example`. Você pode ajustar as variáveis ​​`JWT_SECRET` e `PORT` - e as variáveis ​​`ADMIN_USER` e `ADMIN_PASS` correspondem aos pré-requisitos do desafio.

### Construindo e executando a aplicação

#### Com Docker

Para iniciar a aplicação com Docker, você deve primeiro construir a imagem:

```console
$ docker build -t kanban-ts-backend .
```

Em seguida, execute-a com:

```console
docker run -p 5000:5000 kanban-ts-backend
```

> Obs: se você escolher uma porta diferente para utilizar no `.env`, lembre-se de expor aqui também no trecho `-p <PORT>:<PORT>`

#### Manualmente

Para construir manualmente a aplicação, primeiro instale todas as dependências:

```console
$ npm install
```

Em seguida, você pode usar o script `build`, descrito em `package.json`, que vai utilizar o compilador oficial do TypeScript para gerar os arquivos `.js` na pasta `dist/`:

```console
$ npm run build
```

Após os arquivos `.js` estarem dentro do diretório `dist/`, você deve ser capaz de executar a API rodando:

```console
$ npm start
```

> Note que você também pode usar `npm run dev` para iniciar um ambiente de desenvolvimento que recarrega toda vez que você atualiza um arquivo.

### Linting e testes

Para fazer isso, você pode usar esses scripts:

```console
$ npm run lint
$ npm run test
```

## Decisões

### Linguagem

Sobre a linguagem: primeiro, escolhi o Typescript porque é uma linguagem de tipagem estática que fornece verificação de tipos no tempo de compilação, o que ajuda a detectar erros cedo no processo de desenvolvimento e reduz a probabilidade de exceções em tempo de execução.

Em segundo lugar, o Typescript tem suporte embutido para sintaxe com async/await e Promises, o que pode tornar o código assíncrono mais fácil de escrever e ler - como no `controller` de banco de dados que escrevi.

Em terceiro lugar, o Typescript tem um excelente suporte para recursos modernos do ECMAScript, como classes, módulos e arrow functions, o que ajuda a escrever um código mais conciso e expressivo.

Finalmente, o Typescript é um superset do Javascript, o que significa que o código Javascript existente pode ser facilmente convertido para o Typescript sem grandes alterações, permitindo uma fácil integração com códigos existentes.

### Arquitetura

Acho que não há certo ou errado quando se trata de arquitetura: isso dependerá das necessidades do produto, da equipe envolvida e de uma soma de outros fatores.

Escolhi fazer este projeto com uma arquitetura Model-View-Controller (MVC) com algumas coisas em mente:

1. **Separação de Responsabilidades**: o MVC promove uma clara separação de responsabilidades entre componentes, tornando a aplicação mais fácil de desenvolver, manter e testar.

2. **Escalabilidade**: A arquitetura MVC permite um design modular, facilitando a adição de novos recursos e a escalabilidade da aplicação.

3. **Reutilização**: A natureza modular do MVC torna os componentes mais reutilizáveis, economizando tempo e esforço de desenvolvimento.

4. **Flexibilidade**: A arquitetura MVC permite um alto grau de flexibilidade em termos de tecnologias e frameworks usados.

5. **Depuração fácil e tratamento de exceções**: A clara separação de responsabilidades e modularidade do MVC tornam mais fácil a depuração e o tratamento de exceções, localizar erros e resolvê-los rapidamente.

#### Explicação da estrutura de pastas

Escolhi fazer os `adapters` com uma lógica simples que transforma a solicitação/resposta externa em uma entidade que a aplicação realmente conhece. Neste caso, escolhi seguir assim porque não gosto de misturar o Português e Inglês no código-fonte - e já que os requisitos (`titulo`, `conteudo` e `lista`) estão assim, acredito que é uma separação válida.

O controlador de banco de dados usa `Promises` para manipular a entidade de cartão, e também poderia extender facilmente para funcinoar com um banco de dados local, em vez de na memória, devido ao método `start(path?: string)`.

Separei o sistema de `exceptions` em sua própria pasta, para que pudesse ser compartilhado pela aplicação e extensível.

As `middlewares` são separadas por responsabilidade.

A pasta `models` contém apenas as interfaces de Card, que seriam as entidades de fato.

A pasta `routes` contém apenas os routers e alguma lógica. Escolhi não fazer um controlador para o `authRouter` porque é um arquivo simples e provavelmente nunca seria extendido (se fosse uma aplicação real).

Também separei o conceito de `App`, classe que gerencia o servidor, do `server` em si - que tem como responsabilidade apenas injetar as rotas e abrir um `.listen()`.

### Dependências

Escolhi algumas delas, mas as separei em alguns tópicos para diferenciar melhor os **porquês**:

#### Dependências de configuração

- body-parser
- cors
- dotenv
- express

Essas dependências eram leves e me permitiram criar a primeira estrutura da API realmente rápido - mas com a quantidade certa de poder e funcionalidade.

#### Dependências de pré-requisito

- joi
- jsonwebtoken
- uuid

Essas dependências me ajudaram a cumprir os requisitos do desafio com facilidade: validando o esquema de entrada com `joi`, gerando e verificando JWTs com `jsonwebtoken` e gerando UUIDs com `uuid`.

#### Dependência de banco de dados

- sqlite3

O SQLite3 é uma biblioteca leve e fácil de usar, tornando simples o início da interação com o banco de dados. Também é sem servidor (que podemos usar `in-memory` muito rápido), multiplataforma, amplamente usado e tem um alto desempenho por design.

#### Dependências de desenvolvimento

Todas as dependências em `devDependencies` no `package.json` serviram apenas para que o projeto realmente funcionasse como eu esperava, mas quero destacar a decisão de escolher `tslint` para um lint - o que ajuda muito a manter a mesma estratégia e padrão ao codificar.