import { Dialog, Tab } from "@headlessui/react";
import classNames from "classnames";
import * as htmlToImage from "html-to-image";
import { map } from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CustomFilter from "./CustomFilter";
import Filters from "./Filters";
import {
  useUploadImageMutation,
  useUploadVideoMutation,
} from "@/apis/user/useUploadMediaMutation";
import { CroppedMediaState, EditedMedia } from "@/types/user.types";
import { MediaType } from "@/constants/enum";
import { blobToFile, getImagesByVideo } from "@/utils/file";

interface Props {
  goBack: () => void;
  goNext: () => void;
  handleSetEditedMedia: (value: EditedMedia) => void;
  croppedMedia: CroppedMediaState;
  aspect: number;
}

const EditFile = ({
  goBack,
  goNext,
  croppedMedia,
  aspect,
  handleSetEditedMedia,
}: Props) => {
  const [media, setMedia] = useState<string>("");
  const [filterClass, setFilterClass] = useState<string>("filter-normal");
  const imgRef = useRef<HTMLImageElement>(null);

  const handleSetFilter = (filter: string) => {
    setFilterClass(filter);
  };

  const { mutate: UploadImage, isPending } = useUploadImageMutation(
    handleSetEditedMedia,
    goNext
  );
  const { mutate: UploadVideo, isPending: isLoading } = useUploadVideoMutation(
    handleSetEditedMedia,
    goNext
  );

  const loading = isPending || isLoading;

  const handleNext = async () => {
    const data = new FormData();
    if (croppedMedia.type === MediaType.Image) {
      if (imgRef.current) {
        htmlToImage.toBlob(imgRef.current).then(function (blob) {
          if (blob) {
            const myFile = blobToFile(blob, "my-image.png");
            data.append("image", myFile);
            UploadImage(data);
          }
        });
      }
    }

    if (croppedMedia.type === MediaType.Video) {
      data.append("video", croppedMedia.file);
      UploadVideo(data);
    }
  };

  useEffect(() => {
    if (croppedMedia) {
      setMedia(URL.createObjectURL(croppedMedia.file));
    }
  }, [croppedMedia]);

  return (
    <div className="h-full flex flex-col">
      <Dialog.Title
        as="div"
        className="h-11 text-white flex items-center justify-between border-b border-grayF14 font-semibold"
      >
        <button className="px-4" onClick={goBack}>
          <i className="text-white fa-light fa-arrow-left-long text-lg"></i>
        </button>
        <h3 className="text-sm font-semibold">Edit</h3>
        <button
          className="px-4 text-primary text-sm font-semibold"
          onClick={handleNext}
        >
          Next
        </button>
      </Dialog.Title>
      <div className="flex justify-between h-full w-full relative flex-1">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <i className="animate-spin fa-solid fa-circle-notch text-white"></i>
          </div>
        )}
        <div
          className={classNames(
            "h-full",
            croppedMedia.type === MediaType.Image ? "w-2/3" : "w-full"
          )}
        >
          <div className="h-full flex items-center justify-center bg-black">
            {media &&
              (croppedMedia.type === MediaType.Image ? (
                <Image
                  ref={imgRef}
                  className={classNames(
                    `object-contain ${filterClass}`,
                    aspect === 1 && "h-full w-full",
                    aspect === 16 / 9 && "w-full h-fit",
                    aspect === 9 / 16 && "h-full w-fit"
                  )}
                  src={media}
                  alt="edit-image"
                  width={2000}
                  height={2000}
                />
              ) : (
                <video
                  src={media}
                  className="h-full max-h-post"
                  loop
                  autoPlay
                ></video>
              ))}
          </div>
        </div>
        {croppedMedia.type === MediaType.Image && (
          <div className="w-1/3">
            <Tab.Group>
              <Tab.List className="w-full h-10 flex items-center font-semibold text-sm border-b border-grayF14">
                {map(["Filters", "Adjustments"], (tab) => (
                  <Tab
                    key={tab}
                    className={({ selected }) =>
                      classNames(
                        "flex-1 flex items-center justify-center border-b h-full ",
                        selected
                          ? "border-white text-white"
                          : "border-transparent text-grayA8/70"
                      )
                    }
                  >
                    {tab}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <Filters
                    filterClass={filterClass}
                    handleSetFilter={handleSetFilter}
                    imgRef={imgRef}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <CustomFilter imgRef={imgRef} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditFile;
