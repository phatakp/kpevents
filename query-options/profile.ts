import { isLoggedInProfile } from '@/server/actions/auth.actions';
import { queryOptions } from '@tanstack/react-query';

export const profileKeys = {
  all: ['profile'] as const,
};

export const profileOptions = () =>
  queryOptions({
    queryKey: profileKeys.all,
    queryFn: () => isLoggedInProfile().then((res) => res.data),
    staleTime: Number.POSITIVE_INFINITY,
  });
