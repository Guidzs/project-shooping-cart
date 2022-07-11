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

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const appendCardItens = async (item) => {
  const cardItems = document.querySelector('.cart__items');
  const idItem = getSkuFromProductItem(item);
  const { id: sku, title: name, price: salePrice } = await fetchItem(idItem);
  const itemCart = createCartItemElement({ sku, name, salePrice });
  cardItems.appendChild(itemCart);
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
};
