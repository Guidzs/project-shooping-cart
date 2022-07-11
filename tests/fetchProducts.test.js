require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const item = require('../mocks/item');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('se fetchProducts é uma função', () => {
    expect(typeof(fetchProducts)).toEqual('function');
  })

  it('se ao chamar fetchProducts com o parametro "computador" fetch sera chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('se ao chamar fetchProducts com o parametro "computador" fetch usa a url certa', () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url)
  })

  it('se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch)
  })

  it('se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'))
  })
});
