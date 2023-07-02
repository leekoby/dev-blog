import { Blog } from '@/types/blog';
import { Portfolio } from '@/types/portfolio';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, dracula, prism, materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { LinkRenderer } from '@/utils/link-renderer';

interface Props {
  data: Portfolio | Blog;
}

/** 2023/07/02 - 마크다운 적용 및 디자인을 위한 커스텀리액트마크다운 컴포넌트 - by leekoby */
const CustomReactMarkdown: React.FC<Props> = ({ data }): JSX.Element => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[gfm]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter style={dracula} language={match[1]} PreTag='div' {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={inline ? 'inline-code' : className} {...props}>
              {children}
            </code>
          );
        },
        table: ({ children, ...props }) => (
          <div className='table-responsive-sm'>
            <table className='table' {...props}>
              {children}
            </table>
          </div>
        ),
        a: LinkRenderer,
        // a: ({ node, children, ...props }) => (
        //   <a
        //     style={{
        //       color: 'blue',
        //       textDecoration: 'underline',
        //       fontWeight: 'inherit',
        //     }}
        //     target='_blank'
        //     rel='noreferrer'
        //     {...props}>
        //     {children}
        //   </a>
        // ),
        blockquote: (props) => <blockquote className='blockquote'>{props.children}</blockquote>,
      }}>
      {data.content}
    </ReactMarkdown>
  );
};

export default CustomReactMarkdown;
