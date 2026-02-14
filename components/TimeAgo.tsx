'use client';

import { useEffect, useSyncExternalStore } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import "dayjs/locale/ko";

// dayjs.locale("ko");
dayjs.extend(relativeTime);

const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export default function TimeAgo({ date, locale = "ko" }: { date: string; locale?: string; }) {
  /**
   * [Issue] SSR 빌드 시점으로 'n분 전' 텍스트가 고정되는 문제
   * 클라이언트에서 한번 더 렌더링 필요
   */
  const timeAgo = useSyncExternalStore(
    subscribe,
    () => dayjs(date).locale(locale).fromNow(), // client
    () => '' // server (empty string)
  );

  useEffect(() => {
    const id = setInterval(() => {
      listeners.forEach(listener => listener());
    }, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{timeAgo}</span>;
}