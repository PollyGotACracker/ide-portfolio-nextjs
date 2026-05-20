import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


/*
IntersectionObserver
1. rootMargin (감지 영역)
뷰포트 경계를 늘리거나 줄이는 설정 (상-우-하-좌)
  양수 (+): 영역 확장. 화면에 보이기 전 미리 로딩 (Lazy Load)
  음수 (-): 영역 수축. 특정 지점 진입 시 인식 (목차/섹션 감지)
2. threshold (실행 기준)
요소가 화면에 보이는 비율 (0.0 ~ 1.0)
  단일 값: 해당 비율 도달 시 1회 실행
  배열 [ ]: 지정한 비율마다 반복 실행 (긴 섹션 상태 업데이트 필수)
 */
export default function useObserver(selectors: string) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.getAttribute('data-id'));
        }
      });
    }, {
      rootMargin: "-10% 0px -50% 0px",
      threshold: 0
    });

    const elements = document.querySelectorAll(selectors);
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      setActiveId(null);
    };
  }, [selectors, pathname]);

  return activeId;
}