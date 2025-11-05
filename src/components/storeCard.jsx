// src/components/StoreCard.jsx (누락 파일)

import React from 'react';

const formatPrice = (price) => {
  if (price >= 10000) {
    return `${(price / 10000).toFixed(1).replace(/\.0$/, '')}억`;
  }
  return `${price}만`;
};

const StoreCard = ({ store }) => {
  return (
    <div style={styles.card}>
      {/* 이미지 영역 (Mockup) */}
      <div style={styles.imagePlaceholder}></div> 
      
      <div style={styles.content}>
        <div style={styles.tagContainer}>
          {store.tags && store.tags.map(tag => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>
        <h4 style={styles.title}>{store.title}</h4>
        <p style={styles.meta}>{store.type} | {store.location}</p>
        
        <div style={styles.priceGrid}>
          <div style={styles.priceItem}>
            <span style={styles.priceLabel}>보증금</span>
            <span style={styles.priceValue}>{formatPrice(store.deposit)}</span>
          </div>
          <div style={styles.priceItem}>
            <span style={styles.priceLabel}>월세</span>
            <span style={styles.priceValue}>{formatPrice(store.monthlyRent)}</span>
          </div>
          <div style={styles.priceItem}>
            <span style={styles.priceLabel}>권리금</span>
            <span style={styles.priceValue}>{formatPrice(store.premium)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    border: '1px solid #eee',
    borderRadius: '8px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    cursor: 'pointer',
  },
  imagePlaceholder: {
    width: '100px',
    height: '100px',
    minWidth: '100px',
    backgroundColor: '#e0e0e0',
    // 이미지 URL은 임시로 비워둡니다.
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  content: {
    padding: '10px 15px',
    flexGrow: 1,
  },
  tagContainer: {
    marginBottom: '5px',
  },
  tag: {
    display: 'inline-block',
    backgroundColor: '#f0f0f0',
    color: '#555',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.7em',
    marginRight: '4px',
  },
  title: {
    fontSize: '1em',
    margin: '0 0 3px 0',
    color: '#333',
  },
  meta: {
    fontSize: '0.8em',
    color: '#777',
    marginBottom: '8px',
  },
  priceGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px dashed #eee',
    paddingTop: '8px',
    fontSize: '0.9em',
  },
  priceItem: {
    textAlign: 'center',
    flex: 1,
  },
  priceLabel: {
    display: 'block',
    fontSize: '0.7em',
    color: '#999',
  },
  priceValue: {
    display: 'block',
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: '2px',
  }
};

export default StoreCard;