import type { TBuilding, TEventType } from '@/app/types';
import {
  getAllCollectionsbyBuilding,
  getTotalCollectionsBySlug,
} from '@/server/actions/booking.actions';
import { queryOptions } from '@tanstack/react-query';

export const collectionsKeys = {
  all: ['collections'] as const,
  collectionsByBuilding: (building: TBuilding, type: TEventType) =>
    [...collectionsKeys.all, building, type] as const,
  collectionsBySlug: (slug: string) => [...collectionsKeys.all, slug] as const,
};

export const collectionsByBuildingOptions = (
  building: TBuilding,
  type: TEventType
) =>
  queryOptions({
    queryKey: collectionsKeys.collectionsByBuilding(building, type),
    queryFn: () =>
      getAllCollectionsbyBuilding({
        building,
        slug: `${type}-${new Date().getFullYear()}`,
      }).then((res) => res.data),
    enabled: !!building && !!type,
    staleTime: 1000 * 60 * 60,
  });

export const collectionsBySlugOptions = (slug: string) =>
  queryOptions({
    queryKey: collectionsKeys.collectionsBySlug(slug),
    queryFn: () =>
      getTotalCollectionsBySlug({
        slug,
      }).then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });
