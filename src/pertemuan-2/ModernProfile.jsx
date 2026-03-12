import React from 'react';
import ModernProfile from './ModernProfile';
import './HelloWorld.css'; // Import CSS khusus untuk HelloWorld

export default function HelloWorld(){
    // Data untuk UserCard pertama
    const userCardData = {
        nama: "Fatur Mokel",
        nim: "12345678",
        tanggal: "2025-03-12"
    };
    
    // Data untuk UserCard dengan props spread
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    };
    
    // Data lengkap untuk ModernProfile
    const profileData = {
        user: {
            name: 'Fatur Mokel',
            username: '@fatur_mokel',
            bio: 'Digital Creator & Content Specialist | React Developer | Photography Enthusiast 📸',
            avatar: 'https://i.pravatar.cc/150?u=fatur_mokel',
            coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600',
            location: 'Jakarta, Indonesia',
            joinDate: 'Joined Jan 2024',
            website: 'faturmokel.dev',
            skills: ['React.js', 'UI/UX Design', 'Photography', 'Content Creation', 'Node.js', 'Mobile Dev'],
            social: [
                { platform: 'Instagram', icon: '📷', url: '#' },
                { platform: 'Twitter', icon: '🐦', url: '#' },
                { platform: 'GitHub', icon: '💻', url: '#' },
                { platform: 'LinkedIn', icon: '🔗', url: '#' }
            ]
        },
        stats: [
            { label: 'Posts', value: '342', icon: '📝' },
            { label: 'Followers', value: '15.2K', icon: '👥' },
            { label: 'Following', value: '1.2K', icon: '👤' },
            { label: 'Projects', value: '28', icon: '🚀' }
        ]
    };
    
    return (
        <div className="hello-world-container">
            {/* Header Section */}
            <div className="hello-world-header">
                <h1>Hello World! 👋</h1>
                <p className="subtitle">Selamat Belajar ReactJs - Pemrograman Framework Lanjutan</p>
                <GreetingBinjai />
            </div>
            
            {/* Quote Section */}
            <QuoteText />
            
            {/* User Cards Section */}
            <div className="user-cards-section">
                <h2 className="section-title">
                    <span className="title-icon">👥</span>
                    User Cards
                </h2>
                <div className="user-cards-grid">
                    {/* UserCard dengan data langsung */}
                    <UserCard 
                        nama="Fatur Mokel" 
                        nim="12345678"
                        tanggal="2025-03-12"
                    />
                    
                    {/* UserCard dengan data dari object */}
                    <UserCard {...userCardData} />
                    
                    {/* UserCard dengan data dari propsUserCard */}
                    <UserCard {...propsUserCard} />
                    
                    {/* UserCard dengan data hardcoded */}
                    <UserCard 
                        nama="Ambatubas" 
                        nim="67676767"
                        tanggal={new Date().toLocaleDateString()}
                    />
                </div>
            </div>
            
            {/* Modern Profile Section */}
            <div className="modern-profile-section">
                <h2 className="section-title">
                    <span className="title-icon">🌟</span>
                    Modern Profile Card
                </h2>
                <ModernProfile {...profileData} />
            </div>
            
            {/* Additional Info */}
            <div className="info-footer">
                <p>© 2025 - Politeknik Caltex Riau</p>
            </div>
        </div>
    );
}

function GreetingBinjai() {
    return (
        <div className="greeting-binjai">
            <small>Salam dari Binjai 🌴</small>
        </div>
    );
}

function QuoteText() {
    const text = "Mulutmu Harimaumu";
    const text2 = "Aku ingin jadi macan";
    const text3 = "AAAUUUUUUUUUUUUUMMMMMMM";
    
    return (
        <div className="quote-container">
            <h2 className="section-title">
                <span className="title-icon">💬</span>
                Quotes of the Day
            </h2>
            <div className="quote-grid">
                <div className="quote-card">
                    <p className="quote-text">{text.toLowerCase()}</p>
                    <span className="quote-badge">lowercase</span>
                </div>
                <div className="quote-card">
                    <p className="quote-text">{text2.toUpperCase()}</p>
                    <span className="quote-badge">uppercase</span>
                </div>
                <div className="quote-card">
                    <p className="quote-text">{text3.toUpperCase()}</p>
                    <span className="quote-badge">roar! 🦁</span>
                </div>
            </div>
        </div>
    );
}

function UserCard(props) {
    return (
        <div className="user-card">
            <div className="user-card-header">
                <div className="user-avatar">
                    {props.nama ? props.nama.charAt(0).toUpperCase() : '?'}
                </div>
                <h3 className="user-name">{props.nama || 'Unknown'}</h3>
            </div>
            <div className="user-card-body">
                <div className="user-info">
                    <span className="info-label">NIM:</span>
                    <span className="info-value">{props.nim || '-'}</span>
                </div>
                <div className="user-info">
                    <span className="info-label">Tanggal:</span>
                    <span className="info-value">{props.tanggal || '-'}</span>
                </div>
            </div>
            <div className="user-card-footer">
                <span className="user-status">active</span>
            </div>
        </div>
    );
}