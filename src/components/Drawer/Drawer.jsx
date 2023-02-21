import { useState } from 'react';
import axios from 'axios';

import { Info } from '../Info/Info';

import { useContext } from 'react';
import AppContext from '../../context';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const Drawer = ({ isOpen }) => {
  const {
    cartItems,
    setCartItems,
    setOrders,
    isOrderPlaced,
    setIsOrderPlaced,
    toggleDrawer,
    handleAddToCartClick,
  } = useContext(AppContext);

  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = Number(cartItems.reduce((a, c) => a + c.price, 0));
  const tax = totalPrice * 0.05;

  const handleOrderClick = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        'https://63f3378cde3a0b242b3d5969.mockapi.io/orders',
        { items: cartItems }
      );

      setOrders((prev) => [...prev, data]);

      await Promise.all(
        cartItems.map(async (item) => {
          await axios.delete(
            `https://63ef71134d5eb64db0c96235.mockapi.io/cart/${item.id}`
          );
          await delay(300);
        })
      );

      setOrderId(data.id);
      setIsOrderPlaced(true);
      setCartItems([]);
    } catch (error) {
      console.error('Failed to place an order: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={toggleDrawer}
      className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
    >
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drawerTop}>
          <h2>Shopping Cart</h2>

          <button onClick={toggleDrawer} className={styles.closeBtn}>
            <svg
              width={24}
              height={24}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
          </button>
        </div>

        {cartItems.length > 0 ? (
          <>
            <ul className={styles.cart}>
              {cartItems.map((item) => (
                <li key={item.sku} className={styles.item}>
                  <div className={styles.itemImg}>
                    <img src={item.imageUrl} alt={item.title} />
                  </div>

                  <div className={styles.itemText}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemPrice}>${item.price}</p>
                  </div>

                  <div>
                    <button
                      onClick={() => handleAddToCartClick(item)}
                      className={styles.removeBtn}
                    >
                      <svg
                        width={24}
                        height={24}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <ul className={styles.drawerBottom}>
              <li>
                <p>Total:</p>
                <div className={styles.separator}></div>
                <p>
                  <span>${totalPrice.toLocaleString()}</span>
                </p>
              </li>

              <li>
                <p>Tax:</p>
                <div className={styles.separator}></div>
                <p>${tax.toFixed(2).toLocaleString()}</p>
              </li>

              <li>
                <button
                  disabled={isLoading}
                  onClick={handleOrderClick}
                  className={styles.orderBtn}
                >
                  Submit order
                  <span className={isLoading ? styles.none : undefined}>
                    <svg
                      width={16}
                      height={16}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                  </span>
                </button>
              </li>
            </ul>
          </>
        ) : (
          <div className={styles.cart}>
            <Info
              title={
                isOrderPlaced
                  ? `Order #${orderId} has been placed!`
                  : 'Your cart is empty!'
              }
              image={
                isOrderPlaced
                  ? '/img/utils/order-placed.jpg'
                  : '/img/utils/empty-cart.jpg'
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
