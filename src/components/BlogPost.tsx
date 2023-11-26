import React from 'react';
import { Post } from '@/db/models';
import SectionHeader from '@/components/SectionHeader';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import Section from '@/components/Section';

interface Props {
  post: Post;
}

const BlogPost = ({ post }: Props) => {
  return (
    <Section className='mb-6 md:px-12'>
      <SectionHeader>{post.title}</SectionHeader>
      <div className='mb-4 flex flex-col text-gray-600'>
        <span>
          Published:{' '}
          {post.date.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <span>Author: {post.author}</span>
      </div>
      <MarkdownContent>{post.text}</MarkdownContent>
    </Section>
  );
};

export default BlogPost;
