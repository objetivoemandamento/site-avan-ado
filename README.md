# VÉRTICE — Site Avançado (R$ 2.000)

Modelo reutilizável para negócios que precisam de catálogo e fluxo de compra com pagamento on-line. Este repositório é uma base de projeto, não um site publicado e ainda não está conectado a um provedor de pagamentos.

## Escopo planejado
- Site responsivo e páginas de produtos/serviços.
- Catálogo e carrinho/solicitação de pedido conforme o negócio.
- Checkout integrado a provedor de pagamentos aprovado para a conta do titular.
- Página de retorno e estados de pedido; confirmação real de pagamento deve ser validada no servidor/webhook do provedor.
- Nunca armazenar dados de cartão no frontend ou no repositório.

## Stack planejada
Vite + React no frontend. Uma integração segura de pagamento pode exigir backend/API ou funções serverless, variáveis de ambiente e webhooks.

## Regras de segurança
- Não inserir CPF completo, senhas, tokens, chaves secretas ou credenciais no GitHub.
- Não considerar um redirecionamento do navegador como prova de pagamento.
- Confirmar que o provedor aceita a modalidade de conta e o titular antes da contratação.

## Publicação
A publicação exige configuração e testes do provedor de pagamento, ambiente seguro, termos, política de privacidade e informações comerciais adequadas.

## Status
Especificação inicial; integração de pagamento ainda não configurada.

## Executar localmente

1. Instale Node.js LTS.
2. Execute `npm install`.
3. Execute `npm run dev` para desenvolvimento.
4. Execute `npm run build` para gerar a versão de produção em `dist/`.

## Antes de publicar
- Troque todos os dados de demonstração em `src/config.js`.
- Teste o WhatsApp em celular e computador.
- Use apenas fotos e textos autorizados e informações verdadeiras.
- Confira acessibilidade, responsividade e links.
- Não publique segredos, tokens ou credenciais no frontend ou no GitHub.
