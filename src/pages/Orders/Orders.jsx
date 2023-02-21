import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { Card } from '../../components/Card/Card';

import AppContext from '../../context';

import styles from './Orders.module.scss';

export const Orders = () => {
  const { orders } = useContext(AppContext);

  return (
    <section className={styles.orders}>
      <h1>My Orders</h1>

      {orders.length > 0 ? (
        <>
          {orders.map((order) => (
            <>
              <h2>Order #{order.id}</h2>

              <ul className={styles.grid}>
                {order.items.map((item) => (
                  <Card key={item.sku} item={item} areItemsLoading={false} />
                ))}
              </ul>

              <div className={styles.separator}></div>
            </>
          ))}
        </>
      ) : (
        <ul className={styles.grid}>
          <li className={styles.empty}>
            <img
              src="/img/utils/no-orders.jpg"
              alt="You have no favorites yet"
            />

            <p>Unfortunately, you have no orders yet...</p>

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
        </ul>
      )}
    </section>
  );
};
