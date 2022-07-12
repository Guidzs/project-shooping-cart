const getSavedCartItems = () => {
  const memoria = localStorage.getItem('cartItems');
  return memoria;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
