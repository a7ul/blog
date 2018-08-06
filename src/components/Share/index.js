import React from 'react';
import './shareStyle.scss';
import coffeeImg from '../../icons/coffee.gif';
import { rhythm } from '../../utils/typography';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: rhythm(1),
  },
  shareText: {
    textAlign: 'center',
    display: 'inline-box',
    fontSize: 'small',
    fontWeight: 'bold',
    color: '#007acc',
  },
  social: {
    display: 'inline-block',
    position: 'relative',
    textAlign: 'center',
    marginLeft: '-0.5rem',
  },
  donate: {
    display: 'inline-block',
    textAlign: 'center',
  },
  coffee: {
    marginTop: rhythm(-1),
    marginBottom: 0,
  },
  donateText: {
    textAlign: 'center',
    fontSize: 'small',
    fontWeight: 'bold',
    marginTop: rhythm(-0.5),
  },
  commentText: {
    textAlign: 'center',
  },
};


const Share = ({ text, url }) => ([
  <p key="top-comment" style={styles.commentText}>
    <strong>Like what you read?</strong><br />
    <small>Please do let me know by commenting below.
      If you feel like treating, you can also buy me a coffee ;)
    </small>
  </p>,
  <aside key="container" style={styles.container}>
    <div style={styles.social}>
      <a className="resp-sharing-button__link" href={`https://facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" aria-label="">
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small">
          <div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg>
          </div>
        </div>
      </a>


      <a className="resp-sharing-button__link" href={`https://twitter.com/intent/tweet/?text=${text}&amp;url=${url}`} target="_blank" rel="noopener noreferrer" aria-label="">
        <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small">
          <div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" /></svg>
          </div>
        </div>
      </a>


      <a className="resp-sharing-button__link" href={`https://news.ycombinator.com/submitlink?u=${url}&t=${text}`} target="_blank" rel="noopener noreferrer" aria-label="">
        <div className="resp-sharing-button resp-sharing-button--hackernews resp-sharing-button--small">
          <div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><path fillRule="evenodd" d="M60.94 82.314L17 0h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L103.49 0h18.69L77.84 83.308v53.087h-16.9v-54.08z" /></svg>
          </div>
        </div>
      </a>


      <a className="resp-sharing-button__link" href={`whatsapp://send?text=${text}%20${url}`} target="_blank" rel="noopener noreferrer" aria-label="">
        <div className="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--small">
          <div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z" /></svg>
          </div>
        </div>
      </a>
      <div style={styles.shareText}>
        Share this post
      </div>
    </div>
    <a href="https://paypal.me/payatul" target="_blank" rel="noopener noreferrer" style={styles.donate}>
      <img style={styles.coffee} src={coffeeImg} alt="coffee" />
      <div style={styles.donateText}>Buy me coffee </div>
    </a>
  </aside>,
]);


export default Share;
