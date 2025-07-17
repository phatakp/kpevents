import { getAllTempleRequirements } from '@/server/actions/temple.actions';
import { queryOptions } from '@tanstack/react-query';

export const templeKeys = {
  all: ['temple'] as const,
  getReq: () => [...templeKeys.all, 'requirements'] as const,
};

export const allTempleReqOptions = () =>
  queryOptions({
    queryKey: templeKeys.getReq(),
    queryFn: () => getAllTempleRequirements().then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
  });
