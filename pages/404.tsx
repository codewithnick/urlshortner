import React from 'react';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
      textAlign: 'center',
      padding: '20px',
    }}>
      <h1 style={{
        fontSize: '3rem',
        color: '#ff6f61',
        marginBottom: '10px',
        fontFamily: 'Arial, sans-serif',
      }}>
        404 - Page Not Found
      </h1>
      <h2 style={{
        fontSize: '1.5rem',
        color: '#333',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif',
      }}>
        Sorry Cutu, this page has expired
      </h2>
      <img 
        style={{
          maxWidth: '300px',
          borderRadius: '10px',
        }} 
        src="sad.gif" 
        alt="Sad face" 
      />
    </div>
  );
}
