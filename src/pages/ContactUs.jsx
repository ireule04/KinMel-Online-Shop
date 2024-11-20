import React from 'react';

const ContactUs = () => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>KinMel</h1>
        <p style={styles.contact}>☎️ 9825461969</p>
        <p style={styles.subtitle}>🚚All Nepal Delivery.</p>
        <p style={styles.tagline}>Shopping at Your Pocket.🛒🛒</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  box: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '300px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  contact: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '5px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '5px',
  },
  tagline: {
    fontSize: '16px',
    color: '#666',
    fontStyle: 'italic',
  },
};

export default ContactUs;
