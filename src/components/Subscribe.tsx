import React, { FormEvent } from 'react';
import { useState } from 'react';

const style = {
  container: {
    alignSelf: 'center',
    display: 'flex',
    padding: '20px 30px',
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxWidth: 400,
    border: '2px solid #000',
    borderRadius: 5,
    margin: '0 auto',
    background: '#fff',
  },
  header: {
    margin: 0,
    paddingBottom: 10,
    fontSize: '1.1rem',
  },
  inputContainer: {
    display: 'flex',
    margin: 0,
  },

  email: {
    width: '100%',
    padding: 5,
    fontSize: '0.9rem',
    fontWeight: 'bold',
    borderRadius: 5,
    border: '1px solid black',
  },
  subtext: {
    margin: 0,
    paddingTop: 10,
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
  subtitle: {
    margin: 0,
    paddingBottom: 10,
    fontSize: '0.9rem',
  },
  error: {
    color: 'red',
  },
};
export function Subscribe() {
  const CLIENT_ID = '2ea02faa-fe2f-4fd0-8726-621e381ebd4c';
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    try {
      await fetch(
        `https://blogtools.herokuapp.com/app/${CLIENT_ID}/subscribe?email=${email}`
      );
      setSuccess(true);
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };
  return (
    <div style={style.container}>
      <strong style={style.header}>💌 Learn with me 🚀</strong>
      {!success ? (
        <>
          <p style={style.subtitle}>
            I spend a lot of time learning and thinking about building better
            software. Subscribe and I'll drop a mail when I share something new.
          </p>

          <form style={style.inputContainer} onSubmit={onSubmit}>
            <input
              style={style.email}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setError(false);
                setEmail(e.target.value);
              }}
            />
            <input
              id="subscribe-button"
              type="submit"
              value="Subscribe"
              disabled={!Boolean(email)}
            />
          </form>
          <p style={style.subtext}>No spam. Promise 🙏</p>
          {error ? (
            <p style={style.error}>Failed to subscribe {email}</p>
          ) : null}
        </>
      ) : (
        <p>Thank you for subscribing 🔥</p>
      )}
    </div>
  );
}
