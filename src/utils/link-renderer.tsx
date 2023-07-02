/** 2023/07/02 - <a></a> 태그 처리를 위한 렌더러 함수 interface - by leekoby */
interface LinkRendererProps {
  node: { tagName: string; parent?: { tagName: string; parent?: { tagName: string } } };
  children: React.ReactNode;
  href?: string | undefined;
}

/** 2023/07/02 - <a></a> 태그 처리를 위한 렌더러 함수 - by leekoby */

export const LinkRenderer = ({ node, children, ...props }: LinkRendererProps) => {
  const isChildOfBlockquote =
    node.parent?.tagName === 'p' && node.parent.parent?.tagName === 'blockquote';
  const isEmail = props.href ? /^\S+@\S+\.\S+$/.test(props.href) : false;
  if (isChildOfBlockquote || isEmail) {
    return <>{children}</>;
  } else {
    return (
      <a
        style={{
          color: 'blue',
          textDecoration: 'underline',
          fontWeight: 'inherit',
        }}
        {...props}
        target='_blank'
        rel='noreferrer'>
        {children}
      </a>
    );
  }
};
