import { useCropVideoMutation } from "@/apis/user/useCropVideoMutation";
import { MediaType } from "@/constants/enum";
import { radios } from "@/constants/image";
import useOnClickOutside from "@/hooks/useOutsideClick";
import { CroppedMediaState, MediaState } from "@/types/user.types";
import { getCropVideo, getCroppedImg } from "@/utils/file";
import { Dialog } from "@headlessui/react";
import classNames from "classnames";
import { map } from "lodash";
import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";

interface Props {
  goBack: () => void;
  goNext: () => void;
  handleSetCroppedMedia: (value: CroppedMediaState) => void;
  handleSetAspectEdit: (value: number) => void;
  media: MediaState;
}

interface Crop {
  x: number;
  y: number;
}

interface CroppedAreaPixels extends Crop {
  height: number;
  width: number;
}

const initialCroppedAreaPixels = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
};

const CropFile = ({
  goBack,
  media,
  handleSetCroppedMedia,
  goNext,
  handleSetAspectEdit,
}: Props) => {
  const [image, setImage] = useState<string>("");
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [aspect, setAspect] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [showAspect, setShowAspect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels>(
    initialCroppedAreaPixels
  );

  const aspectRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(aspectRef, () => {
    setShowAspect(false);
  });

  const handleAspect = (e: any) => {
    setAspect(Number(e.target.value));
  };

  const onCropComplete = (_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropImage = async () => {
    try {
      setLoading(true);
      if (media.type === MediaType.Image) {
        const file = await getCroppedImg(image, croppedAreaPixels, rotation);
        handleSetCroppedMedia({ file: file as Blob, type: MediaType.Image });
        setLoading(false);
      }
      if (media.type === MediaType.Video) {
        const file = await getCropVideo(media.file, croppedAreaPixels);
        handleSetCroppedMedia({
          file: file,
          type: MediaType.Video,
        });
        setLoading(false);
      }
      goNext();
      handleSetAspectEdit(aspect);
      setAspect(1);
      setZoom(1);
      setRotation(0);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (media) {
      setImage(URL.createObjectURL(media.file));
    }
  }, [media]);

  return (
    <div className="h-full">
      <Dialog.Title
        as="div"
        className="h-11 text-white flex items-center justify-between border-b border-grayF14 font-semibold"
      >
        <button className="px-4" onClick={goBack}>
          <i className="text-white fa-light fa-arrow-left-long text-lg"></i>
        </button>
        <h3 className="text-sm semibold">Crop</h3>
        <button
          className="px-4 text-primary text-sm font-semibold"
          onClick={handleCropImage}
        >
          Next
        </button>
      </Dialog.Title>
      <div className="flex items-center h-full flex-col">
        <div className="bg-[#121212] relative h-post w-full flex justify-center">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
              <i className="animate-spin fa-solid fa-circle-notch text-white"></i>
            </div>
          )}
          {media.type === MediaType.Image ? (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          ) : (
            <Cropper
              video={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>

        <div className="absolute left-5 bottom-5" ref={aspectRef}>
          <button
            className="text-white bg-gray1A hover:bg-[#666666cc] transition-all rounded-full h-10 w-10"
            onClick={() => setShowAspect(true)}
          >
            <span>
              <i className="fa-regular fa-expand"></i>
            </span>
          </button>
          {showAspect && (
            <div
              className="animate-jump flex justify-between absolute bottom-11 left-0 flex-col w-28 rounded-lg bg-gray1A"
              onChange={handleAspect}
            >
              {map(radios, (radio) => (
                <div
                  key={radio.id}
                  className="w-full px-4 h-12  flex items-center border-b border-gray26 last:border-none hover:bg-[#424242cc]  rounded-lg"
                >
                  <label
                    htmlFor={radio.label}
                    className={classNames(
                      "w-full cursor-pointer hover:text-white",
                      aspect === radio.value ? "text-white" : "text-grayA8"
                    )}
                  >
                    <span className="mr-2">{radio.label}</span>
                    <i className={radio.icon}></i>
                  </label>
                  <input
                    id={radio.label}
                    defaultChecked={radio.defaultChecked}
                    type="radio"
                    className="hidden"
                    key={radio.id}
                    name="aspect"
                    value={radio.value}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropFile;
