/*
 * Validar tipos de requisições para teste e produção
 * 'Dev' para local e 'Prod' para produção
 * Defina variaveis para chamar na config do modulo
 * TODO::Criar dados falsos para teste sem API
 */
const TYPE_SYSTEM = 'Prod';

let urlApi;

if (TYPE_SYSTEM == 'Dev') {
  urlApi = 'http://odontoteste.odontosystem.com.br/api-rede-credenciada-teste';
} else {
  urlApi = 'https://api-empresas.odontosystem.com.br';
}

module.exports = {
  api_url: urlApi,
  app_path: '/api',
  app_vs: '/v1',
};
