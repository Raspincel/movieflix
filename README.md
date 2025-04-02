# MovieFlix

Movieflix é uma aplicação web que permite ao usuário visualizar informações sobre filmes dos mais diversos gêneros e categorias

![image](https://github.com/user-attachments/assets/5a8d657d-7927-4954-b038-a13c5eb6eaae)

![image](https://github.com/user-attachments/assets/bb4a7ab8-2b55-471d-84e5-9dcde37b143f)

## Executando o projeto

### Formas de executar:

1. [Modo de desenvolvimento sem Docker](#modo-de-desenvolvimento-sem-docker)
2. [Modo de produção sem Docker](#modo-de-produção-sem-docker)
3. [Modo de desenvolvimento com Docker](#modo-de-desenvolvimento-com-docker)
4. [Modo de produção com Docker](#modo-de-produção-com-docker)
5. [Modo de desenvolvimento com Docker compose](#modo-de-desenvolvimento-com-docker-compose)
6. [Modo de produção com Docker compose](#modo-de-produção-com-docker)

### Modo de desenvolvimento sem Docker

1. Clone o repositório
```bash
git clone https://github.com/raspincel/movieflix.git
```

2. Acesse a pasta do projeto
```bash
cd movieflix
```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente. Você pode escolher o valor de `VITE_TMDB_API_KEY` ou de `VITE_TMDB_TOKEN`.
- `VITE_TMDB_API_KEY`: Chave de acesso à API do TMDB. Você pode encontrá-la em https://www.themoviedb.org/settings/api, ao fim da página, sob "API Key".
- `VITE_TMDB_TOKEN`: O seu token de acesso que também permite acesso à API do TMDB. Você pode encontrá-lo em https://www.themoviedb.org/settings/api, logo acima de "API Key", sob "API Read Access Token".

```bash
VITE_TMDB_TOKEN=eyJ...
VITE_TMDB_API_KEY=d66...
```

> [!NOTE]
> Você precisa configurar apenas uma das duas variáveis de ambiente. Tanto configurando apenas `VITE_TMDB_API_KEY` quanto apenas ``VITE_TMDB_TOKEN`` retornará com sucesso os dados da API.

4. Instale as dependências utilizando o gerenciador de pacotes de Node.js de sua preferência, como npm, Yarn, dentre outros:

```bash
npm install
# ou
yarn
```

5. Rode o script `dev`:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse o endereço `http://localhost:5173` em seu navegador.

### Modo de produção sem Docker

1. Clone o repositório
```bash
git clone https://github.com/raspincel/movieflix.git
```

2. Acesse a pasta do projeto
```bash
cd movieflix
```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente. Você pode escolher o valor de `VITE_TMDB_API_KEY` ou de `VITE_TMDB_TOKEN`.
- `VITE_TMDB_API_KEY`: Chave de acesso à API do TMDB. Você pode encontrá-la em https://www.themoviedb.org/settings/api, ao fim da página, sob "API Key".
- `VITE_TMDB_TOKEN`: O seu token de acesso que também permite acesso à API do TMDB. Você pode encontrá-lo em https://www.themoviedb.org/settings/api, logo acima de "API Key", sob "API Read Access Token".

```bash
VITE_TMDB_TOKEN=eyJ...
VITE_TMDB_API_KEY=d66...
```

> [!NOTE]
> Você precisa configurar apenas uma das duas variáveis de ambiente. Tanto configurando apenas `VITE_TMDB_API_KEY` quanto apenas ``VITE_TMDB_TOKEN`` retornará com sucesso os dados da API.

4. Instale as dependências utilizando o gerenciador de pacotes de Node.js de sua preferência, como npm, Yarn, dentre outros:

```bash
npm install
# ou
yarn
```

5. Rode o script `build`:

```bash
npm run build
# ou
yarn build
```

6. Rode o script `preview` para pré-visualizar a aplicação em sua máquina local, na ausência de um servidor de produção:
```bash
npm run preview
# ou
yarn preview
```

7. Acesse o endereço `http://localhost:4173` para visualizar o projeto em seu navegador.

8. No servidor de produção, sirva o conteúdo da pasta `dist` com um servidor web como Apache ou Nginx.

### Modo de desenvolvimento com Docker

1. Clone o repositório
```bash
git clone https://github.com/raspincel/movieflix.git
```

2. Acesse a pasta do projeto
```bash
cd movieflix
```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente. Você pode escolher o valor de `VITE_TMDB_API_KEY` ou de `VITE_TMDB_TOKEN`.
- `VITE_TMDB_API_KEY`: Chave de acesso à API do TMDB. Você pode encontrá-la em https://www.themoviedb.org/settings/api, ao fim da página, sob "API Key".
- `VITE_TMDB_TOKEN`: O seu token de acesso que também permite acesso à API do TMDB. Você pode encontrá-lo em https://www.themoviedb.org/settings/api, logo acima de "API Key", sob "API Read Access Token".

```bash
VITE_TMDB_TOKEN=eyJ...
VITE_TMDB_API_KEY=d66...
```

> [!NOTE]
> Você precisa configurar apenas uma das duas variáveis de ambiente. Tanto configurando apenas `VITE_TMDB_API_KEY` quanto apenas ``VITE_TMDB_TOKEN`` retornará com sucesso os dados da API.

4. Faça o build da imagem Docker

```bash
docker build --target dev -t movieflix .
```

5. Rode o container expondo a porta pela qual deseja acessar a aplicação localmente, como a porta 5173, e defininido o arquivo de configuração `.env` como variável de ambiente:

```bash
docker run -p 5173:5173 --env-file .env movieflix
```

6. Acesse o endereço `http://localhost:5173` em seu navegador.

### Modo de produção com Docker

1. Clone o repositório
```bash
git clone https://github.com/raspincel/movieflix.git
```

2. Acesse a pasta do projeto
```bash
cd movieflix
```

3. Faça o build da imagem Docker. Durante a build, informe a variável de ambiente `VITE_TMDB_API_KEY` ou ``VITE_TMDB_TOKEN``:

```bash
docker build --target prod --build-arg VITE_TMDB_API_KEY=$sua_chave_aqui -t movieflix .
# ou
docker build --target prod --build-arg VITE_TMDB_TOKEN=$seu_token_aqui -t movieflix .
```

4. Rode o container expondo a porta pela qual deseja acessar a aplicação localmente, como a porta 80:

```bash
docker run -p 80:80 movieflix
```

5. Acesse o endereço `http://localhost` em seu navegador.

### Modo de desenvolvimento com Docker compose

1. Clone o repositório
```bash
git clone https://github.com/raspincel/movieflix.git
```

2. Acesse a pasta do projeto
```bash
cd movieflix
```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente. Você pode escolher o valor de `VITE_TMDB_API_KEY` ou de `VITE_TMDB_TOKEN`.
- `VITE_TMDB_API_KEY`: Chave de acesso à API do TMDB. Você pode encontrá-la em https://www.themoviedb.org/settings/api, ao fim da página, sob "API Key".
- `VITE_TMDB_TOKEN`: O seu token de acesso que também permite acesso à API do TMDB. Você pode encontrá-lo em https://www.themoviedb.org/settings/api, logo acima de "API Key", sob "API Read Access Token".

```bash
VITE_TMDB_TOKEN=eyJ...
VITE_TMDB_API_KEY=d66...
```

> [!NOTE]
> Você precisa configurar apenas uma das duas variáveis de ambiente. Tanto configurando apenas `VITE_TMDB_API_KEY` quanto apenas ``VITE_TMDB_TOKEN`` retornará com sucesso os dados da API.

4. Execute o comando para subir o container de desenvolvimento:

```bash
docker compose up movieflix-dev
```

5. Acesse o endereço `http://localhost:5173` em seu navegador.

### Modo de produção com Docker compose

1. Clone o repositório
```bash
git clone https://github.com/raspincel/movieflix.git
```

2. Acesse a pasta do projeto
```bash
cd movieflix
```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente. Você pode escolher o valor de `VITE_TMDB_API_KEY` ou de `VITE_TMDB_TOKEN`.
- `VITE_TMDB_API_KEY`: Chave de acesso à API do TMDB. Você pode encontrá-la em https://www.themoviedb.org/settings/api, ao fim da página, sob "API Key".
- `VITE_TMDB_TOKEN`: O seu token de acesso que também permite acesso à API do TMDB. Você pode encontrá-lo em https://www.themoviedb.org/settings/api, logo acima de "API Key", sob "API Read Access Token".

```bash
VITE_TMDB_TOKEN=eyJ...
VITE_TMDB_API_KEY=d66...
```

> [!NOTE]
> Você precisa configurar apenas uma das duas variáveis de ambiente. Tanto configurando apenas `VITE_TMDB_API_KEY` quanto apenas ``VITE_TMDB_TOKEN`` retornará com sucesso os dados da API.

4. Execute o comando para subir o container de produção:

```bash
docker compose up movieflix-prod
```

5. Acesse o endereço `http://localhost` em seu navegador.

