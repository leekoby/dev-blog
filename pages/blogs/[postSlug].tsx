import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useRouter } from 'next/router';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/** 2023/06/03 - 상세 페이지 - by leekoby */
const SinglePage: NextPage<Props> = ({ post }) => {
  const router = useRouter();

  //fallback 상태일때 처리
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const { content, title } = post;
  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='font-semibold text-2xl py-5'>{title}</h1>
      <div className='prose pb-20'>
        <MDXRemote {...content} />
      </div>
    </div>
  );
};
/** 2023/06/03 - 상세페이지 경로 - by leekoby */
export const getStaticPaths: GetStaticPaths = () => {
  // 경로
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);
  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
    //encoding으로 타입 지정 안하면 버퍼로 출력됨. 인코딩 타입 형식 지정
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    return {
      params: {
        postSlug: matter(fileContent).data.slug,
      },
    };
  });

  return {
    paths,
    //https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths

    // TODO: fallback options에 대해 자세히 알아보자
    fallback: 'blocking',
  };
};

interface StaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};

/** 2023/06/03 - getStaticProps - by leekoby */
export const getStaticProps: GetStaticProps<Post> = async (context) => {
  try {
    const { params } = context;
    const { postSlug } = params as StaticProps;
    const filePathToRead = path.join(process.cwd(), 'posts/' + postSlug + '.md');
    //encoding으로 타입 지정 안하면 버퍼로 출력됨. 인코딩 타입 형식 지정
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    // const { content, data } = matter(fileContent);
    const source: any = await serialize(fileContent, {
      parseFrontmatter: true,
    });

    return {
      props: {
        post: {
          content: source,
          title: source.frontmatter.title,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default SinglePage;
