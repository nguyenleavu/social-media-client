import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

const THRESHOLD = 0.6;

const useScrollToPlayVideo = (videoRef: RefObject<HTMLVideoElement>) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const handleClickVideo = () => {
    if (!videoRef.current) return;
    if (isPlay) {
      videoRef.current.pause();
      setIsPlay(false);
    } else {
      videoRef.current.play();
      setIsPlay(true);
    }
  };

  const handleViewChange = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.intersectionRatio > THRESHOLD) {
          if (videoRef.current) {
            videoRef.current.play();
            setIsPlay(true);
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlay(false);
          }
        }
      }
    },
    [videoRef]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleViewChange, {
      root: null,
      rootMargin: "0px",
      threshold: THRESHOLD,
    });
    setObserver(observer);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [handleViewChange, videoRef]);

  return {
    isPlay,
    handleClickVideo,
  };
};

export default useScrollToPlayVideo;
