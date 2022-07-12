const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const emptyCart = () => {
  const elements = document.querySelectorAll('.cart__items > *');
  elements.forEach((item) => item.parentNode.removeChild(item));
};

const addEventButtonCart = () => {
  const btnCart = document.querySelector('.empty-cart');
  btnCart.addEventListener('click', emptyCart);
};

const cartItemClickListener = (event) => {
  const element = event.path[0];
  element.parentNode.removeChild(element);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const sumTotalValor = () => {
  // const childs = document.querySelectorAll('.cart__items > *');
  // childs.forEach((item) => {
  //   const price = item.innerText
  //     .split(' ')
  //     .reduce((totalPrice, e) => {
  //       if (e.includes('$')) {
  //         return totalPrice += parseFloat(e.replace('$', ''))
  //       }
  //       return totalPrice
  //     }, 0);
  //     console.log(price);
  // })
};

const appendCardItens = async (item) => {
  const cardItems = document.querySelector('.cart__items');
  const idItem = getSkuFromProductItem(item);
  const { id: sku, title: name, price: salePrice } = await fetchItem(idItem);
  const itemCart = createCartItemElement({ sku, name, salePrice });
  saveCartItems(itemCart);
  cardItems.appendChild(itemCart);
  sumTotalValor();
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => appendCardItens(section));
  section.appendChild(button);

  return section;
};

const appendItens = async () => {
  const data = await fetchProducts('computador');
  const sectionItems = document.querySelector('.items');
  await data.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const sectItem = createProductItemElement({ sku, name, image });
    sectionItems.appendChild(sectItem);
  });
};

window.onload = () => {
  appendItens();
  addEventButtonCart();
};
