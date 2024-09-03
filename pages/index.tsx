import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './Home.module.css';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await res.json();

    if (res.status === 201 || res.status === 200) {
      setShortUrl(`${window.location.origin}/${data.shortUrl}`);
    } else {
      alert(data.error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
  };

  return (
    
    <div className={styles.container}>
      <h1 className={styles.header}>URL Shortener</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="url"
          value={originalUrl}
          onChange={handleChange}
          placeholder="Enter URL"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Shorten</button>
        {!shortUrl && (
            <img 
            style={{
              maxWidth: '300px',
              borderRadius: '10px',
            }} 
            src="lookUp.gif" 
            alt="Please Enter Your Link" 
          />
        )}
      </form>
      {shortUrl && (
        <div className={styles.result}>
          <div>
            <h2 className={styles.subHeader}>Shortened URL:</h2>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {shortUrl}
            </a>
          </div>
          {shortUrl && (
            <img
            style={{
              maxWidth: '300px',
              borderRadius: '10px',
            }}
            src="dance.gif"
            alt="Yayy link Converted"
          />
          )}
        </div>
      )}
    </div>
  );
}
