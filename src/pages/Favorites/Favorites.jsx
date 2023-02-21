import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { Card } from '../../components/Card/Card';

import AppContext from '../../context';

import styles from './Favorites.module.scss';

export const Favorites = () => {
  const { favorites, cartItems, handleAddToCartClick, handleFavClick } =
    useContext(AppContext);

  return (
    <section className={styles.favorites}>
      <h1>My Favorite GPUs</h1>

      <ul className={styles.grid}>
        {favorites.length > 0 ? (
          <>
            {favorites.map((item) => (
              <Card
                key={item.sku}
                isOnFavoritesPage={true}
                isInCart={cartItems.some(
                  (cartItem) => cartItem.sku === item.sku
                )}
                {...{ item, handleAddToCartClick, handleFavClick }}
              />
            ))}
          </>
        ) : (
          <li className={styles.empty}>
            <img
              src="/img/utils/empty-favorites.jpg"
              alt="You have no favorites yet"
            />

            <p>Unfortunately, you have no favorites yet...</p>

            <Link to="/">
              <button>
                Let me add something!
                <span>
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
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
};
