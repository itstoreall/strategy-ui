'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GoChevronUp } from 'react-icons/go';
import { ChildrenProps } from '@/src/types';
import Button from '@/src/components/Button/Button';

const PageWrapperContainer = ({ children }: ChildrenProps) => {
  const [showButton, setShowButton] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const path = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);

    const currentRef = ref.current;
    const isDashboardPage = path === '/dashboard';
    const isAllowed = isDashboardPage && currentRef;

    const handleScroll = () => {
      if (isAllowed) {
        const scrollPosition = currentRef.scrollTop;
        setShowButton(scrollPosition >= 600);
      }
    };

    if (isAllowed) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (isAllowed) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [path]);

  const goToTop = () => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="page-wrapper-container" ref={ref}>
      {children}
      {showButton && (
        <Button className="go-to-top-button" clickContent={goToTop}>
          <span className="go-to-top-button-bg" />
          <GoChevronUp size={30} />
        </Button>
      )}
    </div>
  );
};

export default PageWrapperContainer;
