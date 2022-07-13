const cartItems = document.querySelector('.cart__items');
const getCartItems = () => document.querySelectorAll('.cart__item');

const getValors = () => {
  const valor = [];
  getCartItems().forEach((e) => {
     const price = e.innerText.split('$');
     valor.push(parseFloat(price[1]));
  });
  return valor;
};

const sumTotalValor = () => {
  const allPrices = getValors();
  const totalPrice = allPrices.reduce((total, price) => total + price, 0);
  console.log(totalPrice);
  const spanTotalPrice = document.querySelector('.total-price');
  spanTotalPrice.innerText = totalPrice;
};

const saveAndSum = () => {
  saveCartItems(cartItems.innerHTML);
  sumTotalValor();
};

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
  getCartItems().forEach((item) => item.parentNode.removeChild(item));
  saveAndSum();
};

const addEventButtonCart = () => {
  const btnCart = document.querySelector('.empty-cart');
  btnCart.addEventListener('click', emptyCart);
};

const cartItemClickListener = (event) => {
  const element = event.path[0];
  element.parentNode.removeChild(element);
  saveAndSum();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const appendCardItens = async (item) => {
  const idItem = getSkuFromProductItem(item);
  const { id: sku, title: name, price: salePrice } = await fetchItem(idItem);
  const itemCart = createCartItemElement({ sku, name, salePrice });
  cartItems.appendChild(itemCart);
  saveAndSum();
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

const addEventItemCard = () => {
  getCartItems().forEach((item) => item.addEventListener('click', cartItemClickListener));
};

const addCartItemsOfStorage = () => {
  const memoria = getSavedCartItems();
  cartItems.innerHTML = memoria;
  addEventItemCard();
};

const loading = () => {
  const loadingSpan = createCustomElement('span', 'loading', 'carregando...');
  const sec = document.querySelector('.items');
  sec.appendChild(loadingSpan);
  setTimeout(() => {
    sec.removeChild(loadingSpan);
  }, 500);
};

window.onload = () => {
  loading();
  appendItens();
  addEventButtonCart();
  addCartItemsOfStorage();
  addEventItemCard();
  sumTotalValor();
};
