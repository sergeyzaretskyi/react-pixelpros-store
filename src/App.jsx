import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { Favorites } from './pages/Favorites/Favorites';
import { Header } from './components/Header/Header';
import { Orders } from './pages/Orders/Orders';

import AppContext from './context';

import { fetchData } from './utilities/api';
import { toggleOverflowY } from './utilities/dom';

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [areItemsLoading, setAreItemsLoading] = useState(true);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    fetchData().then(({ cartItems, favorites, items, orders, error }) => {
      setAreItemsLoading(false);

      if (!error) {
        setCartItems(cartItems);
        setFavorites(favorites);
        setItems(items);
        setOrders(orders);
      }
    });
  }, []);

  const toggleDrawer = () => {
    toggleOverflowY('body', !isOpen);
    setIsOpen((prev) => !prev);

    isOrderPlaced && setIsOrderPlaced(false);
  };

  const handleAddToCartClick = async (item) => {
    try {
      const itemInCart = cartItems.find(
        (cartItem) => cartItem.sku === item.sku
      );

      if (itemInCart) {
        const { id } = itemInCart;

        setCartItems((prev) =>
          prev.filter((cartItem) => cartItem.sku !== item.sku)
        );

        await axios.delete(
          `https://63ef71134d5eb64db0c96235.mockapi.io/cart/${id}`
        );
      } else {
        const res = await axios.post(
          'https://63ef71134d5eb64db0c96235.mockapi.io/cart',
          item
        );

        setCartItems((prev) => [...prev, res.data]);
      }
    } catch (error) {
      console.error('Failed to fetch /cart endpoint: ', error);
    }
  };

  const handleFavClick = async (item) => {
    const isItemInFavorites = favorites.some((fav) => fav.sku === item.sku);

    try {
      if (isItemInFavorites) {
        const obj = favorites.find((fav) => fav.sku === item.sku);

        setFavorites((prev) => prev.filter((fav) => fav.sku !== item.sku));

        await axios.delete(
          `https://63ef71134d5eb64db0c96235.mockapi.io/favs/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          'https://63ef71134d5eb64db0c96235.mockapi.io/favs',
          item
        );

        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(
        `Failed to ${isItemInFavorites ? 'remove' : 'add'} an item ${
          isItemInFavorites ? 'from' : 'to'
        } the favorites: `,
        error
      );
    }
  };

  const isInCart = (sku) => {
    return cartItems.some((cartItem) => cartItem.sku === sku);
  };

  const isOnFavoritesPage = (sku) => {
    return favorites.some((fav) => fav.sku === sku);
  };

  const homeProps = {
    items,
    setCartItems,
    handleAddToCartClick,
    handleFavClick,
    isOpen,
    toggleDrawer,
    favorites,
    areItemsLoading,
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        setCartItems,
        favorites,
        isInCart,
        isOnFavoritesPage,
        handleAddToCartClick,
        handleFavClick,
        toggleDrawer,
        orders,
        setOrders,
        isOrderPlaced,
        setIsOrderPlaced,
      }}
    >
      <div className="container">
        <Header {...{ toggleDrawer, isOpen }} />
        <main>
          <Routes>
            <Route path="/" element={<Home {...homeProps} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );
};
