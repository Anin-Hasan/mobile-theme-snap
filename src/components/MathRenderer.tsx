import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  text: string;
}

// This component splits a string by the '$' delimiter and renders
// the parts inside the delimiters as math, and the rest as text.
export const MathRenderer: React.FC<MathRendererProps> = ({ text }) => {
  const parts = text.split('$');

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          // This part is inside $$ and should be rendered as math
          return <InlineMath key={index} math={part} />;
        } else {
          // This is a regular text part
          return <span key={index}>{part}</span>;
        }
      })}
    </>
  );
};