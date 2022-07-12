// const local = [];
const saveCartItems = (param) => {
  // local.push(param);
  // const localString = JSON.stringify(local);
  // localStorage.setItem('cartItems', localString);
  localStorage.setItem('cartItems', param);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
