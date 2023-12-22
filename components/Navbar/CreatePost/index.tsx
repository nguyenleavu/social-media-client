import Modal from "@/components/Modal";
import { MediaType, ModalStep } from "@/constants/enum";
import { CroppedMediaState, EditedMedia, MediaState } from "@/types/user.types";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import CropFile from "./CropFile";
import EditFile from "./EditFile";
import UploadFile from "./UploadFile";
import UploadPost from "./UploadPost";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const CreatePost = ({ isOpen, closeModal }: Props) => {
  const [step, setStep] = useState<ModalStep>(ModalStep.UploadFile);
  const [media, setMedia] = useState<MediaState>();
  const [croppedMedia, setCroppedMedia] = useState<CroppedMediaState>();
  const [editedMedia, setEditedMedia] = useState<EditedMedia>();
  const [aspect, setAspect] = useState<number>(1);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].type.includes("image")) {
        setMedia({ file: e.target.files[0], type: MediaType.Image });
      } else {
        setMedia({ file: e.target.files[0], type: MediaType.Video });
      }
    }
    setStep(ModalStep.CropFile);
  };

  const handleSetCroppedMedia = (value: CroppedMediaState) => {
    setCroppedMedia(value);
  };

  const handleSetEditedMedia = (value: EditedMedia) => {
    setEditedMedia(value);
  };

  const handleSetAspectEdit = (value: number) => {
    setAspect(value);
  };

  const handleCloseModal = () => {
    closeModal();
    setStep(ModalStep.UploadFile);
  };

  const handleGoToUploadFile = () => {
    setStep(ModalStep.UploadFile);
  };
  const handleGoToCropFile = () => {
    setStep(ModalStep.CropFile);
  };
  const handleGoToUpEditFile = () => {
    setStep(ModalStep.EditFile);
  };
  const handleGoToUploadPost = () => {
    setStep(ModalStep.UploadPost);
  };

  const modalStep = {
    UploadFile: <UploadFile handleFileChange={handleFileChange} />,
    CropFile: (
      <CropFile
        goBack={handleGoToUploadFile}
        goNext={handleGoToUpEditFile}
        handleSetCroppedMedia={handleSetCroppedMedia}
        handleSetAspectEdit={handleSetAspectEdit}
        media={media as MediaState}
      />
    ),
    EditFile: (
      <EditFile
        aspect={aspect}
        goBack={handleGoToCropFile}
        goNext={handleGoToUploadPost}
        handleSetEditedMedia={handleSetEditedMedia}
        croppedMedia={croppedMedia as CroppedMediaState}
      />
    ),
    UploadPost: (
      <UploadPost
        aspect={aspect}
        editedMedia={editedMedia as EditedMedia}
        goBack={handleGoToUpEditFile}
      />
    ),
  };

  useEffect(() => {
    if (!isEmpty(media?.file)) {
      setStep(ModalStep.UploadFile);
    }
    if (!isEmpty(croppedMedia?.file)) {
      setStep(ModalStep.CropFile);
    }
    // if (!isEmpty(editedMedia?.url)) {
    //   setStep(ModalStep.EditFile);
    // }
  }, [media, croppedMedia, editedMedia]);

  return (
    <Modal
      isOpen={isOpen}
      handleOnOpenChangeModal={handleCloseModal}
      handleCloseModal={handleCloseModal}
    >
      <div
        className={classNames(
          `h-[812px] transform overflow-hidden rounded-2xl bg-gray26  text-left align-middle shadow-xl duration-500 transition-all`,
          (step === ModalStep.EditFile &&
            croppedMedia?.type === MediaType.Image) ||
            step === ModalStep.UploadPost
            ? "w-maxPost"
            : "w-post"
        )}
      >
        {modalStep[step]}
      </div>
    </Modal>
  );
};

export default CreatePost;
