"use client";

import { useEditProfileMutation } from "@/apis/user/useEditProfileMutation";
import { useUploadImageMutation } from "@/apis/user/useUploadMediaMutation";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { SizesAvatar, TypeAvatar } from "@/constants/enum";
import { MESSAGES } from "@/constants/messages";
import usePlugin from "@/hooks/usePlugin";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { EditedMedia, User } from "@/types/user.types";
import { EditUserForm, userSchema } from "@/validation/user";
import Editor from "@draft-js-plugins/editor";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { isEmpty } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, UseFormSetError, useForm } from "react-hook-form";

interface EditorProps {
  value: any;
  onChange: any;
  setError: UseFormSetError<EditUserForm>;
}

const TextEditor = ({ value, onChange, setError }: EditorProps) => {
  const { plugins, CharCounter } = usePlugin();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(EditorState.moveFocusToEnd(editorState));
    const text = convertToRaw(editorState.getCurrentContent());
    if (isEmpty(text.blocks[0].text)) {
      setError("bio", { message: MESSAGES.BIO_IS_REQUIRED });
    } else {
      return onChange(JSON.stringify(text));
    }
  };

  useEffect(() => {
    if (value) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      );
    }
  }, [value]);

  return (
    <div className="p-4 border border-gray26 rounded-2xl relative">
      <div className="relative h-[200px] overflow-y-auto no-scrollbar">
        <Editor
          editorState={editorState}
          onChange={onEditorStateChange}
          plugins={plugins}
          placeholder="Bio"
        />
      </div>
      <div className="flex items-center absolute bottom-2 right-2 text-grayA8 text-sm">
        <CharCounter />
        /2000
      </div>
    </div>
  );
};

const EditProfile = () => {
  const user = useAppSelector((state) => state.profile.user) as User;

  const [media, setMedia] = useState<string>("");

  const dispatch = useAppDispatch();
  const handleSetEditedMedia = (value: EditedMedia) => {
    setMedia(value.url);
  };

  const { mutate: editProfile, isPending } = useEditProfileMutation(dispatch);
  const { mutate: uploadImage, isPending: isLoading } =
    useUploadImageMutation(handleSetEditedMedia);

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const user = {
      avatar: media,
      ...data,
    };
    console.log("user", user);
    editProfile(user);
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();
      data.append("image", e.target.files[0]);
      uploadImage(data);
    }
  };

  useEffect(() => {
    if (!isEmpty(user)) {
      setMedia(user.avatar);
      reset({ name: user.name, bio: user.bio });
    }
  }, [reset, user]);

  if (!user) return;
  return (
    <form
      action=""
      className="flex flex-col items-center py-10"
      onSubmit={onSubmit}
    >
      <div className="w-content px-20 flex flex-col gap-8">
        <h4 className="font-semibold text-xl">Edit Profile</h4>
        <div className="bg-gray26 rounded-2xl p-4 flex items-center justify-between">
          <div>
            {isLoading ? (
              <div className="h-14 w-14 rounded-full flex items-center justify-center">
                <span>
                  <i className="animate-spin fa-solid fa-circle-notch text-white"></i>
                </span>
              </div>
            ) : (
              <Avatar
                size={SizesAvatar.Large}
                type={TypeAvatar.Normal}
                src={media || user.avatar}
                subTitle={user.name}
                name={user.username}
              />
            )}
          </div>
          <div>
            <label
              htmlFor="upload_post"
              className="h-8 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-all rounded-lg text-sm font-semibold  cursor-pointer"
            >
              Change photo
            </label>
            <input
              onChange={handleFileChange}
              id="upload_post"
              type="file"
              className="hidden"
              accept="image/*,video/*"
            />
          </div>
        </div>
        <h4 className="font-semibold text-xl">Username</h4>
        <div className="flex flex-col w-full gap-2 relative">
          <div className="border border-gray26 rounded-2xl w-full">
            <input
              placeholder="Name"
              {...register("name")}
              className="outline-none border-none h-full bg-transparent p-4 w-full"
            />
          </div>
          {errors.name?.message && (
            <p className="text-red-500 font-medium absolute -bottom-8 left-0 text-xs">
              {errors.name.message}
            </p>
          )}
        </div>
        <h4 className="font-semibold text-xl mt-2">Bio</h4>
        <div className="flex flex-col w-full gap-2 relative">
          <Controller
            name="bio"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextEditor
                  value={field.value}
                  onChange={field.onChange}
                  setError={setError}
                />
              );
            }}
          />
          {errors.bio?.message && (
            <p className="text-red-500 font-medium absolute -bottom-8 left-0 text-xs">
              {errors.bio.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end">
          <Button type="submit" loading={isPending}>
            Update profile
          </Button>
        </div>
      </div>
      <Footer />
    </form>
  );
};

export default EditProfile;
