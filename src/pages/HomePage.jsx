// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom'; 

// 서비스 카드 데이터 (요청하신 이미지 기반)
const serviceCards = [
  { title: "점포 찾기", subtitle: "사장님께 딱 맞는 다양한 점포들!", link: "/search" },
  { title: "점포 팔기", subtitle: "많은 예비창업자들께서 기다리는", link: "/sell" },
  { title: "간판 의뢰하기", subtitle: "다양한 전문가들이 기다리고 있어요", link: "/service/sign" },
  { title: "프랜차이즈", subtitle: "모든 프랜차이즈의 정보를 확인하세요!", link: "/franchise" },
  { title: "인테리어 의뢰하기", subtitle: "다양한 전문가들이 기다리고 있어요", link: "/service/interior" },
  { title: "청소 의뢰하기", subtitle: "다양한 전문가들이 기다리고 있어요", link: "/service/clean" },
  { title: "점포찾기 의뢰하기", subtitle: "대신 찾아주세요", link: "/request/search" },
  { title: "철거 의뢰하기", subtitle: "다양한 전문가들이 기다리고 있어요", link: "/service/demolition" },
];

const ServiceCard = ({ title, subtitle, link }) => (
  <Link to={link} style={cardStyles.link}>
    <div style={cardStyles.card}>
      <div style={cardStyles.iconPlaceholder}></div> {/* 아이콘 자리 */}
      <div style={cardStyles.textContainer}>
        <p style={cardStyles.subtitle}>{subtitle}</p>
        <h3 style={cardStyles.title}>{title}</h3>
      </div>
    </div>
  </Link>
);

const HomePage = () => {
  return (
    <div style={homeStyles.container}>
      <div style={homeStyles.welcomeSection}>
        <h2 style={{fontSize: '1.8em'}}>아싸점포거래소를 방문한 고객님, **43,742개**의 점포들을 구경해보세요!</h2>
      </div>

      <h3 style={homeStyles.heading}>서비스를 선택해주세요.</h3>
      
      <div style={homeStyles.grid}>
        {serviceCards.map((card, index) => (
          <ServiceCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

const homeStyles = {
  container: {
    padding: '50px 100px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  welcomeSection: {
    padding: '30px',
    marginBottom: '40px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.6em',
    marginBottom: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  }
};

const cardStyles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'box-shadow 0.3s',
    height: '100px',
  },
  iconPlaceholder: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#e9ecef', // 아이콘 배경색
    marginRight: '20px',
  },
  textContainer: {
    flexGrow: 1,
  },
  subtitle: {
    margin: '0 0 5px 0',
    fontSize: '0.9em',
    color: '#666',
  },
  title: {
    margin: 0,
    fontSize: '1.2em',
    color: '#333',
    fontWeight: 'bold',
  }
};

export default HomePage;