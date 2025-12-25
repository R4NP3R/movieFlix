# MovieFlix 🎬

O MovieFlix é uma API REST desenvolvida em Java com Spring Boot para gerenciamento de um catálogo de filmes. O projeto permite organizar títulos por categorias e listar em quais serviços de streaming (Netflix, Prime Video, Disney+, etc.) eles estão disponíveis.

🚀 Funcionalidades
Catálogo de Filmes: Cadastro e listagem de filmes.

Categorização: Organização por gêneros (Ação, Drama, Sci-Fi, etc.).

Onde Assistir: Vinculação de filmes às plataformas de streaming.

Filtros: Busca por categoria ou disponibilidade em plataformas específicas.

🛠️ Tecnologias Utilizadas
Java 17 (ou a versão que você estiver usando)

Spring Boot 3

Spring Data JPA (Persistência de dados)

H2 Database (Banco de dados em memória para testes) ou PostgreSQL

Maven (Gerenciador de dependências)

🏗️ Estrutura do Projeto (Entidades Principais)
O banco de dados é estruturado em torno de três pilares:

Movie: Contém título, sinopse e ano de lançamento.

Category: Define o gênero do filme.

Streaming: Nome e link da plataforma onde o filme está hospedado.
