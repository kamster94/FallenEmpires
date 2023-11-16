import './markdown.css';
import React from 'react';
import Markdown from 'react-markdown';
import Section from '@/components/Section';

interface Props {
  children: string | null;
}

const MarkdownContent = ({ children }: Props) => {
  return (
    <Section className='markdown md:px-12'>
      <Markdown>{children}</Markdown>
    </Section>
  );
};

export default MarkdownContent;
