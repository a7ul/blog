import React from 'react';

import AnyfinIcon from '../../icons/anyfin.svg';
import './jobAd.scss';

export default function JobAd() {
  return (
    <a
      className="job-ad-link"
      href="https://career.anyfin.com/jobs/882970-full-stack-javascript-developer-multiple-openings?promotion=191666-trackable-share-link-atul"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="job-ad-container">
        <img className="job-company-icon" src={AnyfinIcon} alt="anyfin-logo" />
        <div className="job-text-container">
          <h3>Looking for a kickass place to work?</h3>
          <p>
            We are hiring Fullstack developers{' '}
            <span aria-label="rocket" role="img">
              🚀
            </span>
          </p>
        </div>
      </div>
    </a>
  );
}
