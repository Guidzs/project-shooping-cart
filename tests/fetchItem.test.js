require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('se fetchItem é uma função', () => {
    expect(typeof(fetchItem)).toEqual('function');
  })

  it('se ao chamar fetchItem com o parametro "MLB1615760527" fetch sera chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('se ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza a url certa', () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })

  it('se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  })
});
