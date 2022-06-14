import React from 'react';
import './tableOfContents.scss';
type Heading = {
  value: string;
  depth: number;
};
type TOCProps = {
  headings: Heading[];
};

type TOCTreeItem = Heading & {
  children?: TOCTreeItem[];
};

function tocTree(allHeadings: Heading[]) {
  const headings = [...allHeadings];
  const tree: TOCTreeItem[] = [];
  let currentHeading: TOCTreeItem | null = null;
  for (const rawHeading of headings) {
    const heading = { ...rawHeading };
    if (heading.depth === 1) {
      tree.push(heading);
      currentHeading = heading;
    }
    if (heading.depth === 2 && currentHeading) {
      currentHeading.children = currentHeading.children || [];
      currentHeading.children.push(heading);
    }
  }
  return tree;
}

function ContentLink({ h }: { h: TOCTreeItem }) {
  return (
    <li key={h.value}>
      <a href={`#${h.value.replace(/\s+/g, '-').toLowerCase()}`}>{h.value}</a>
      {h.children && (
        <ul>
          {h.children.map((c) => (
            <ContentLink h={c}></ContentLink>
          ))}
        </ul>
      )}
    </li>
  );
}

export function TableOfContents(props: TOCProps) {
  const headings = tocTree(props.headings ?? []);
  if (headings.length === 0) {
    return null;
  }
  return (
    <ol className="toc-container">
      <h4 className="toc-header">Table of contents</h4>
      {headings.map((h) => {
        return <ContentLink h={h} />;
      })}
    </ol>
  );
}
