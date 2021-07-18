import React from 'react';
import './tableOfContents.scss';
type Heading = {
  value: string;
  depth: number;
};
type TOCProps = {
  headings: Heading[];
};

export function TableOfContents(props: TOCProps) {
  const headings = props.headings.filter((h) => h.depth <= 2);
  if (headings.length === 0) {
    return null;
  }
  return (
    <ol className="toc-container">
      <h4 className="toc-header">Table of contents</h4>
      {headings.map((h) => {
        return (
          <li key={h.value}>
            <a href={`#${h.value.replace(/\s+/g, '-').toLowerCase()}`}>
              {h.value}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
