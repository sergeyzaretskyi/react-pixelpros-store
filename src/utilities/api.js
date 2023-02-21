import axios from 'axios';

export const fetchData = async () => {
  try {
    const [cartRes, favoritesRes, itemsRes, ordersRes] = await Promise.all([
      axios.get('https://63ef71134d5eb64db0c96235.mockapi.io/cart'),
      axios.get('https://63ef71134d5eb64db0c96235.mockapi.io/favs'),
      axios.get('https://apimocha.com/pixelpros/items'),
      axios.get('https://63f3378cde3a0b242b3d5969.mockapi.io/orders'),
    ]);

    return {
      cartItems: cartRes.data,
      favorites: favoritesRes.data,
      items: itemsRes.data,
      orders: ordersRes.data,
    };
  } catch (error) {
    console.error('Failed to fetch data: ', error);
    return { error };
  }
};
