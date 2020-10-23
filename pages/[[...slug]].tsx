import { getEntriesByContentType, getPageBySlug } from '../lib/api';
import { useUniformTracker } from '@uniformdev/optimize-tracker-react';
import Head from 'next/head';
import { IPageFields, ITalkFields } from '../lib/contentful';
import { createElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Entry } from 'contentful';
import { TalksContext } from '../components/TalksContext';

interface PageProps {
  page: IPageFields;
  talks: Entry<ITalkFields>[];
}

export default function Home({ page, talks }: PageProps) {
  const { componentMapping } = useUniformTracker();

  return (
    <TalksContext.Provider value={talks}>
      <Head>
        <title>{page?.title} | UniformConf</title>
      </Head>
      {page?.components &&
        page.components.map((component, index) =>
          createElement(componentMapping[component.sys.contentType.sys.id] ?? (() => null), {
            key: index,
            ...component,
          })
        )}
    </TalksContext.Provider>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const slug = context.params?.slug ? `/${(context.params.slug as string[]).join('/')}` : '/';

  const page = getPageBySlug(context.preview, slug);

  const talks = getEntriesByContentType<ITalkFields>(context.preview, 'talk');

  return {
    props: {
      page: await page,
      talks: (await talks) ?? [],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/', '/developers', '/marketers', '/registration'],
    fallback: false,
  };
};
