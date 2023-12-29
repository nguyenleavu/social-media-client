import useInViewport from "@/hooks/useInViewport";
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  index: number;
  lastVideoIndex: number;
  handleGetVideos: () => void;
  className?: string;
}

const InfiniteSnapScroll = ({
  children,
  index,
  handleGetVideos,
  lastVideoIndex,
  className,
}: Props) => {
  const [loadNewVidsAt, setloadNewVidsAt] = useState<number>(lastVideoIndex);

  const ref = useRef<HTMLDivElement>(null);

  const inViewport = useInViewport(ref);

  useEffect(() => {
    if (inViewport && ref.current) {
      if (loadNewVidsAt === Number(ref.current.id)) {
        setloadNewVidsAt((prev) => prev + 2);
        handleGetVideos();
      }
    }
  }, [handleGetVideos, inViewport, loadNewVidsAt]);

  return (
    <div ref={ref} id={index.toString()} className={className}>
      {children}
    </div>
  );
};

export default InfiniteSnapScroll;
