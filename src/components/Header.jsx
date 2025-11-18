// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const navLinkStyle = {
    color: '#333',
    textDecoration: 'none',
    padding: '0 15px',
    fontWeight: '500',
    fontSize: '16px',
};

const Header = () => {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 30px',
            borderBottom: '1px solid #eee',
            backgroundColor: 'white',
            color: '#333'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '20px', fontWeight: 'bold' }}>
                홍한규 점포거래소
                </Link>
                <nav style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/search" style={navLinkStyle}>점포 찾기</Link>
                    <Link to="/commercial-analysis" style={navLinkStyle}>상권 분석</Link> {/* 🚨 상권 분석 메뉴 추가 */}
                    <Link to="/" style={navLinkStyle}>프랜차이즈</Link>
                    <Link to="/" style={navLinkStyle}>이용가이드</Link>
                </nav>
            </div>
            <div>
                <Link to="/" style={navLinkStyle}>로그인</Link>
                <span style={{ color: '#ccc' }}> | </span>
                <Link to="/" style={navLinkStyle}>회원가입</Link>
            </div>
        </header>
    );
};

export default Header;