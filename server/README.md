## Instalando Dependencias
```bash
npm i
```

## Subindo Servidor BackEnd
```bash
npm run dev
```

## Criando uma migration
```bash
npx prisma
```

## Rodando migrations Prisma
```bash
npx prisma migrate dev
```

## Subindo IDE Banco de Dados
```bash
npx prisma studio
```

## Criando Diagrama de Entidade do Banco de Dados
- Gera o Arquivo ERD.svg com a imagem do Diagrama do banco de Dados, dentro do diretorio ./prisma/ERD.svg
```bash
npx prisma generate
```

## Executar o Seed no Banco 
-Criação de registro ficticios para auxilio em teste de implementações, dentro do diretorio ./prisma/seed.ts
```bash
npx prisma db seed
```
