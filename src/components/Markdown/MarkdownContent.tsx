import './markdown.css';
import React from 'react';
import Markdown from 'react-markdown';
import Section from '@/components/Section';

interface Props {
  children: string | null;
}

const MarkdownContent = ({ children }: Props) => {
  return (
    <Section className="md:px-12 markdown">
      <Markdown>{children}</Markdown>
    </Section>
  );
};

export default MarkdownContent;
