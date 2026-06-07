import { useCallback, useEffect, useState } from 'react';
import {
  getReadCount,
  isRead as checkIsRead,
  READ_CHANGE_EVENT,
  type ProfileCategory,
} from '../utils/readProfiles';

export function useReadProfiles(category?: ProfileCategory) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const refresh = () => setVersion(v => v + 1);
    window.addEventListener(READ_CHANGE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(READ_CHANGE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const isRead = useCallback(
    (id: string, itemCategory: ProfileCategory) => checkIsRead(id, itemCategory),
    [version]
  );

  const readCount = category ? getReadCount(category) : 0;

  return { isRead, readCount, version };
}