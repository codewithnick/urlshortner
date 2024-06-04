import { useState } from 'react';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
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

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>URL Shortener</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Shorten</button>
      </form>
      {shortUrl && (
        <div style={styles.result}>
          <h2 style={styles.subHeader}>Shortened URL:</h2>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f9fc',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    padding: '2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#005bb5',
  },
  result: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  link: {
    fontSize: '1.25rem',
    color: '#0070f3',
    textDecoration: 'none',
  },
};
