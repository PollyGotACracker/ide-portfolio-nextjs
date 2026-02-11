'use client';

import { useSyncExternalStore } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function TimeAgo({ date }: { date: string; }) {
  /**
   * [Issue] SSR 빌드 시점으로 텍스트가 고정되는 문제
   * 클라이언트에서 한번 더 렌더링 필요
   */
  const timeAgo = useSyncExternalStore(
    () => () => { }, // empty subscribe
    () => dayjs(date).fromNow(), // client
    () => '' // server (empty string)
  );

  return <span>{timeAgo}</span>;
}