// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      {/* 로고: 메인 페이지(홈)로 이동 */}
      <Link to="/" style={styles.logoLink}>
        <h1 style={styles.logoText}>🏠 아빠 점포 거래소</h1>
      </Link>
      
      {/* 메인 메뉴 */}
      <nav style={styles.nav}>
        <Link to="/search" style={styles.navItem}>점포 찾기</Link>
        <Link to="/sell" style={styles.navItem}>점포 팔기</Link>
        <Link to="/franchise" style={styles.navItem}>프랜차이즈</Link>
        <Link to="/guide" style={styles.navItem}>이용가이드</Link>
      </nav>

      {/* 로그인/회원가입 */}
      <div style={styles.auth}>
        <span style={styles.authItem}>로그인</span>
        <span style={styles.authItem}>|</span>
        <span style={styles.authItem}>회원가입</span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logoText: {
    fontSize: '1.4em',
    color: '#007bff',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '30px',
  },
  navItem: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '0.95em',
  },
  auth: {
    display: 'flex',
    gap: '10px',
    fontSize: '0.9em',
    color: '#666',
  },
  authItem: {
    cursor: 'pointer',
  }
};

export default Header;