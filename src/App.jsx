import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [liked, setLiked] = useState({});
  const [activeTab, setActiveTab] = useState('games');

  const toggleLike = (id) => {
    setLiked(prev => ({ 
      ...prev, 
      [id]: !prev[id] 
    }));
  };

  const games = [
    { 
      id: 1, 
      title: 'Genshin Impact', 
      developer: 'HoYoverse', 
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600', 
      rating: 4.8, 
      downloads: '65M+',
      tags: ['RPG', 'Open World', 'Anime']
    },
    { 
      id: 2, 
      title: 'Honkai: Star Rail', 
      developer: 'HoYoverse', 
      img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600', 
      rating: 4.7, 
      downloads: '42M+',
      tags: ['RPG', 'Sci-Fi', 'Turn-based']
    },
    { 
      id: 3, 
      title: 'Honkai Impact 3rd', 
      developer: 'HoYoverse', 
      img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600', 
      rating: 4.6, 
      downloads: '58M+',
      tags: ['Action', 'RPG', 'Hack & Slash']
    },
    { 
      id: 4, 
      title: 'Tears of Themis', 
      developer: 'HoYoverse', 
      img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600', 
      rating: 4.5, 
      downloads: '12M+',
      tags: ['Romance', 'Detective', 'Otome']
    },
    { 
      id: 5, 
      title: 'Zenless Zone Zero', 
      developer: 'HoYoverse', 
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600', 
      rating: 4.9, 
      downloads: '28M+',
      tags: ['Urban', 'Action', 'Stylish']
    }
  ];

  const news = [
    { id: 1, title: 'Genshin Impact Version 4.6 Update', date: '2 days ago', img: 'https://images.unsplash.com/photo-1610419865466-f6d2d6ea8d96?w=600', type: 'Update' },
    { id: 2, title: 'Honkai: Star Rail - New Character Reveal', date: '5 days ago', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600', type: 'Announcement' },
    { id: 3, title: 'HoYoverse Anniversary Celebration', date: '1 week ago', img: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=600', type: 'Event' }
  ];

  const s = {
    app: { 
      maxWidth: '1200px', 
      margin: '0 auto', 
      backgroundColor: '#0B0E1F', 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#FFFFFF'
    },
    navbar: {
      position: 'sticky',
      top: 0,
      backgroundColor: 'rgba(11, 14, 31, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '16px 32px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: { 
      fontSize: '28px', 
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '2px'
    },
    navLinks: {
      display: 'flex',
      gap: '32px'
    },
    navLink: {
      color: '#FFFFFF',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      opacity: 0.7,
      transition: 'opacity 0.3s'
    },
    activeNavLink: {
      opacity: 1,
      borderBottom: '2px solid #667eea',
      paddingBottom: '4px'
    },
    heroSection: {
      background: 'linear-gradient(135deg, #1a1c2c 0%, #2d1f3a 100%)',
      padding: '60px 32px',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#B8B9C4',
      maxWidth: '600px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '40px 32px 20px',
      paddingBottom: '12px',
      borderBottom: '2px solid rgba(102, 126, 234, 0.3)'
    },
    gameGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      padding: '0 32px'
    },
    gameCard: {
      backgroundColor: '#1E2130',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    gameImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover'
    },
    gameInfo: {
      padding: '16px'
    },
    gameTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#FFFFFF'
    },
    gameDeveloper: {
      fontSize: '14px',
      color: '#B8B9C4',
      marginBottom: '8px'
    },
    gameStats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    downloads: {
      color: '#B8B9C4',
      fontSize: '14px'
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '16px'
    },
    tag: {
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      color: '#667eea',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px'
    },
    likeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '24px',
      color: '#667eea'
    },
    newsSection: {
      padding: '0 32px 40px'
    },
    newsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '20px'
    },
    newsCard: {
      backgroundColor: '#1E2130',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    newsImage: {
      width: '100%',
      height: '160px',
      objectFit: 'cover'
    },
    newsContent: {
      padding: '16px'
    },
    newsType: {
      display: 'inline-block',
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      color: '#667eea',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      marginBottom: '8px'
    },
    newsTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    newsDate: {
      fontSize: '12px',
      color: '#B8B9C4'
    },
    footer: {
      backgroundColor: '#1E2130',
      padding: '40px 32px',
      marginTop: '40px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },
    footerContent: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    footerSection: {
      color: '#FFFFFF'
    },
    footerTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#667eea'
    },
    footerLink: {
      display: 'block',
      color: '#B8B9C4',
      marginBottom: '8px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    copyright: {
      textAlign: 'center',
      color: '#B8B9C4',
      fontSize: '14px',
      marginTop: '40px',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }
  };

  return (
    <div style={s.app}>
      <nav style={s.navbar}>
        <div style={s.logo}>HoYoverse</div>
        <div style={s.navLinks}>
          <span 
            style={{...s.navLink, ...(activeTab === 'games' ? s.activeNavLink : {})}}
            onClick={() => setActiveTab('games')}
          >Games</span>
          <span 
            style={{...s.navLink, ...(activeTab === 'news' ? s.activeNavLink : {})}}
            onClick={() => setActiveTab('news')}
          >News</span>
          <span style={s.navLink}>Community</span>
          <span style={s.navLink}>Support</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ cursor: 'pointer', fontSize: '20px' }}>🔍</span>
          <span style={{ cursor: 'pointer', fontSize: '20px' }}>👤</span>
        </div>
      </nav>

      <div style={s.heroSection}>
        <h1 style={s.heroTitle}>Welcome to HoYoverse</h1>
        <p style={s.heroSubtitle}>Discover immersive worlds and unforgettable adventures across multiple dimensions</p>
      </div>

      <h2 style={s.sectionTitle}>Featured Games</h2>
      <div style={s.gameGrid}>
        {games.map(game => (
          <div key={game.id} style={s.gameCard}>
            <img src={game.img} style={s.gameImage} alt={game.title} />
            <div style={s.gameInfo}>
              <h3 style={s.gameTitle}>{game.title}</h3>
              <div style={s.gameDeveloper}>{game.developer}</div>
              
              <div style={s.gameStats}>
                <div style={s.rating}>
                  <span style={{color: '#FFD700'}}>⭐</span>
                  <span>{game.rating}</span>
                </div>
                <div style={s.downloads}>{game.downloads} downloads</div>
              </div>

              <div style={s.tags}>
                {game.tags.map((tag, index) => (
                  <span key={index} style={s.tag}>{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button style={{...s.likeButton, color: liked[game.id] ? '#FF4B4B' : '#667eea'}}>
                  {liked[game.id] ? '❤️' : '♡'}
                </button>
                <button style={{...s.likeButton, fontSize: '16px'}}>
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={s.sectionTitle}>Latest News</h2>
      <div style={s.newsSection}>
        <div style={s.newsGrid}>
          {news.map(item => (
            <div key={item.id} style={s.newsCard}>
              <img src={item.img} style={s.newsImage} alt={item.title} />
              <div style={s.newsContent}>
                <span style={s.newsType}>{item.type}</span>
                <h3 style={s.newsTitle}>{item.title}</h3>
                <span style={s.newsDate}>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={s.footer}>
        <div style={s.footerContent}>
          <div style={s.footerSection}>
            <h4 style={s.footerTitle}>About HoYoverse</h4>
            <span style={s.footerLink}>Company Info</span>
            <span style={s.footerLink}>Careers</span>
            <span style={s.footerLink}>Press Center</span>
          </div>
          <div style={s.footerSection}>
            <h4 style={s.footerTitle}>Games</h4>
            <span style={s.footerLink}>Genshin Impact</span>
            <span style={s.footerLink}>Honkai: Star Rail</span>
            <span style={s.footerLink}>Honkai Impact 3rd</span>
          </div>
          <div style={s.footerSection}>
            <h4 style={s.footerTitle}>Community</h4>
            <span style={s.footerLink}>Discord</span>
            <span style={s.footerLink}>Twitter</span>
            <span style={s.footerLink}>YouTube</span>
          </div>
          <div style={s.footerSection}>
            <h4 style={s.footerTitle}>Support</h4>
            <span style={s.footerLink}>Help Center</span>
            <span style={s.footerLink}>Privacy Policy</span>
            <span style={s.footerLink}>Terms of Service</span>
          </div>
        </div>
        <div style={s.copyright}>
          © 2024 HoYoverse. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;