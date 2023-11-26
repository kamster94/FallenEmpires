import './markdown.css';
import React from 'react';
import Markdown from 'react-markdown';
import Section from '@/components/Section';
import classnames from 'classnames';

interface Props {
  children: string | null;
  className?: string;
}

const MarkdownContent = ({ children, className }: Props) => {
  return (
    <Section className={classnames('markdown', className)}>
      <Markdown>{children}</Markdown>
    </Section>
  );
};

export default MarkdownContent;
