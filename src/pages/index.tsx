import { Box, Button } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

type ImagesQueryResponse = {
  after?: string;
  data: {
    title: string;
    description: string;
    url: string;
    ts: number;
    id: string;
  }[];
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({ pageParam = 1 }) =>
      api
        .get<ImagesQueryResponse>('/api/images', {
          params: { after: pageParam },
        })
        .then(res => res.data),
    {
      getNextPageParam: (lastPage, allPages) => lastPage.after,
    }
  );

  const formattedData = useMemo(() => {
    if (!data) return null;
    const { pages } = data;

    return pages.reduce((acc, page) => [...acc, ...page.data], []);
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {formattedData && <CardList cards={formattedData} />}
        {hasNextPage && (
          <Button
            isLoading={isFetchingNextPage}
            my={8}
            onClick={() => fetchNextPage()}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
