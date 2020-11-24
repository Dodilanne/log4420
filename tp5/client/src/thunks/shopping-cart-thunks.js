const getItemsFromAPI = () =>
  fetch('http://localhost:4000/api/shopping-cart').then((res) => res.json());
