# artillery-demo

## Sumário

- [artillery-demo](#artillery-demo)
  - [Sumário](#sumário)
  - [Motivação](#motivação)
  - [Pilha de tecnologia](#pilha-de-tecnologia)
  - [Exemplos de saída em um shell de comando](#exemplos-de-saída-em-um-shell-de-comando)
  - [Como rodar](#como-rodar)
    - [Pré-requisitos](#pré-requisitos)
    - [Passo a passo](#passo-a-passo)

## Motivação

Este repositório de código consiste em uma demonstração da ferramenta de teste de carga [Artillery](https://www.artillery.io/). O professor decidiu utilizar um antigo [repositório de código](https://github.com/mdccg/contact-book-api) da unidade curricular Linguagem de Programação III para demonstrar o funcionamento dela. Para isso, ele adicionou um novo arquivo chamado [`populate.ts`](./src/populate.ts), que é responsável por popular o banco de dados com 100.000 contatos. Em seguida, foi programado o Artillery com o arquivo [`find_contacts.yaml`](./load_tests/find_contacts.yaml).

Esse arquivo tem como objetivo "bombardear" a API com requisições para avaliar sua otimização. No retalho de código-fonte abaixo, são configuradas as informações básicas do teste. A propriedade `target` indica a URL alvo do teste, neste caso, http://localhost:3001, que é o endereço local da aplicação em teste. Em seguida, temos a propriedade `phases`, que especifica as fases do teste de carga. Neste exemplo, há apenas uma fase com duração de 10 segundos e uma taxa de chegada (_arrival rate_) de uma solicitação por segundo.

```yaml
config:
  target: 'http://localhost:3001'
  phases:
    - duration: 10
      arrivalRate: 1
```

Já no retalho de código-fonte abaixo, são definidos os cenários de teste. Aqui, tem-se um único cenário chamado `Find all contacts`. O cenário consiste em uma sequência de etapas representadas pelo campo `flow`. Neste caso, temos apenas uma etapa que envolve uma requisição HTTP GET para a rota `/contacts`. A seção `expect` lista as expectativas do teste. Aqui, espera-se que a resposta da requisição tenha um código de status 200, indicando que a solicitação foi bem-sucedida.

```yaml
scenarios:
  - name: 'Find all contacts'
    flow:
      - get:
          url: '/contacts'
    expect:
      - statusCode: 200
```

Este foi o primeiro repositório de código apresentado no [Curso Superior de TSI do IFMS](https://www.ifms.edu.br/campi/campus-aquidauana/cursos/graduacao/sistemas-para-internet/sistemas-para-internet) como requisito para obtenção da nota parcial das atividades da unidade curricular Web Services. É digno de nota que nesta unidade curricular, teremos a oportunidade de aprender sobre a otimização de APIs e reforçar boas convenções de desenvolvimento.

| [Próximo repositório &rarr;](#) |
|-|

## Pilha de tecnologia

| Papel | Tecnologia |
|-|-|
| Linguagem de programação | [TypeScript](https://www.typescriptlang.org/) |
| Framework back-end | [Express.js](https://expressjs.com/pt-br/) |
| Banco de dados | [MongoDB](https://www.mongodb.com/pt-br) |
| Mapeamento Objeto-Documento | [Mongoose](https://mongoosejs.com/) |
| Virtualização do banco de dados | [Docker](https://docker.io/) |
| Ferramenta de teste de carga | [Artillery](https://www.artillery.io/) |

<details>
  <summary>
  
  ## Exemplos de saída em um shell de comando
  </summary>
  
  ```console
  $ artillery run ./load_tests/find_contacts.yaml 
  Test run id: txpxr_qqyk4458kdmcj394cegyzpr7ydmyg_4ecc
  Phase started: unnamed (index: 0, duration: 10s) 19:01:13(-0400)

  Phase completed: unnamed (index: 0, duration: 10s) 19:01:23(-0400)

  --------------------------------------
  Metrics for period to: 19:01:20(-0400) (width: 4.998s)
  --------------------------------------

  http.request_rate: ............................................................. 1/sec
  http.requests: ................................................................. 6
  vusers.created: ................................................................ 6
  vusers.created_by_name.Find all contacts: ...................................... 6


  Warning: multiple batches of metrics for period 1690844470000 2023-07-31T23:01:10.000Z
  --------------------------------------
  Metrics for period to: 19:01:30(-0400) (width: 9.005s)
  --------------------------------------

  errors.ETIMEDOUT: .............................................................. 5
  http.codes.200: ................................................................ 1
  http.downloaded_bytes: ......................................................... 16594367
  http.request_rate: ............................................................. 1/sec
  http.requests: ................................................................. 4
  http.response_time:
    min: ......................................................................... 6454
    max: ......................................................................... 6454
    median: ...................................................................... 6439.7
    p95: ......................................................................... 6439.7
    p99: ......................................................................... 6439.7
  http.responses: ................................................................ 1
  vusers.completed: .............................................................. 1
  vusers.created: ................................................................ 4
  vusers.created_by_name.Find all contacts: ...................................... 4
  vusers.failed: ................................................................. 5
  vusers.session_length:
    min: ......................................................................... 6636.3
    max: ......................................................................... 6636.3
    median: ...................................................................... 6702.6
    p95: ......................................................................... 6702.6
    p99: ......................................................................... 6702.6


  --------------------------------------
  Metrics for period to: 19:01:40(-0400) (width: 3.011s)
  --------------------------------------

  errors.ETIMEDOUT: .............................................................. 4
  vusers.failed: ................................................................. 4


  All VUs finished. Total time: 20 seconds

  --------------------------------
  Summary report @ 19:01:35(-0400)
  --------------------------------

  errors.ETIMEDOUT: .............................................................. 9
  http.codes.200: ................................................................ 1
  http.downloaded_bytes: ......................................................... 16594367
  http.request_rate: ............................................................. 1/sec
  http.requests: ................................................................. 10
  http.response_time:
    min: ......................................................................... 6454
    max: ......................................................................... 6454
    median: ...................................................................... 6439.7
    p95: ......................................................................... 6439.7
    p99: ......................................................................... 6439.7
  http.responses: ................................................................ 1
  vusers.completed: .............................................................. 1
  vusers.created: ................................................................ 10
  vusers.created_by_name.Find all contacts: ...................................... 10
  vusers.failed: ................................................................. 9
  vusers.session_length:
    min: ......................................................................... 6636.3
    max: ......................................................................... 6636.3
    median: ...................................................................... 6702.6
    p95: ......................................................................... 6702.6
    p99: ......................................................................... 6702.6
  ```

  ```console
  $ ts-node src/server.ts
  Opening connection to database...
  App running on port 3001
  App connected to db contactbook_dev
  GET /contacts 200 6444.762 ms - 16594367
  GET /contacts - - ms - -
  GET /contacts - - ms - -
  GET /contacts - - ms - -
  GET /contacts - - ms - -
  GET /contacts - - ms - -
  GET /contacts - - ms - -
  GET /contacts - - ms - -
  GET /contacts - - ms - -
  GET /contacts - - ms - -
  ```
</details>



## Como rodar

### Pré-requisitos

- [Node](https://nodejs.org/en/download/);
- [Yarn](https://yarnpkg.com/) (opcional);
- [Docker](https://docs.docker.com/engine/install/);
- [Artillery](https://www.artillery.io/).

### Passo a passo

1. Clone o repositório de código em sua máquina;
   
2. Abra um shell de comando de sua preferência (prompt de comando, PowerShell, terminal _etc_.);

3. Instale as dependências do projeto através do seguinte comando:

```console
$ npm install
```

Caso esteja utilizando o gerenciador de pacotes Yarn, execute o seguinte comando como alternativa:

```console
$ yarn
```

4. Com o Docker instalado, execute o comando abaixo para levantar o _container_ Docker com o respectivo banco de dados virtualizado. Certifique-se de estar no diretório do arquivo `docker-compose.yml`;

```console
$ docker-compose up -d
```

O parâmetro `-d` serve para desocupar o shell de comando logo após a execução do comando. É uma boa convenção, ao encerrar a execução do app, derrubar o _container_ levantado através do comando:

```console
$ docker-compose down
```

Mas, não se preocupe. As tuplas inseridas no banco de dados não serão deletadas com a derrubada do _container_.

5. Execute o seguinte comando para executar o app:

Para npm:

```console
$ npm run start
```

Para Yarn:

```console
$ yarn start
```

6. Execute o script `populate` para popular o banco de dados. Urgente: é altamente recomendado que você tenha preparado, no mínimo, um litro de café para esta etapa; visto que ela pode levar um bocado de tempo e isso depende diretamente da capacidade da sua máquina.

7. Instale o Artillery em sua máquina através do seguinte comando:

```console
$ npm i -g artillery@latest
```

8. Com o _container_ levantado e o app em execução, "bombardeie" a API com requisições através do seguinte comando:

```console
$ artillery run ./load_tests/find_contacts.yaml
```

Certifique-se de estar na raiz do projeto para executar o comando acima.