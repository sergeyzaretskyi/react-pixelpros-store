import { useState } from 'react';

import { Card } from '../../components/Card/Card';

import styles from './Home.module.scss';

export const Home = ({
  items,
  handleAddToCartClick,
  handleFavClick,
  areItemsLoading,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const renderCard = (item) => {
    return (
      <Card
        key={item.sku}
        {...{ item, handleAddToCartClick, handleFavClick }}
      />
    );
  };

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (areItemsLoading) {
      return [...Array(8)]
        .fill('')
        .map((_, i) => <Card key={i} areItemsLoading={areItemsLoading} />);
    } else {
      return filteredItems.map((item) => renderCard(item));
    }
  };

  return (
    <section className={styles.home}>
      <div className={styles.homeTop}>
        <h1>All Graphic Cards</h1>

        <div className={styles.search}>
          <svg
            className={styles.searchIcon}
            width={16}
            height={16}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>

          <input
            onChange={handleSearchInput}
            value={searchValue}
            type="text"
            placeholder="Search for a card..."
          />

          {searchValue && (
            <button onClick={() => setSearchValue('')}>
              <svg
                width={16}
                height={16}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <ul className={styles.grid}>{renderItems()}</ul>
    </section>
  );
};
