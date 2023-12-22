import { useLogOutMutation } from "@/apis/auth/useLogOutMutation";
import { useFollowMutation } from "@/apis/user/useFollowMutation";
import { useUnfollowMutation } from "@/apis/user/useUnfollowMutation";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { SizesAvatar, TypeAvatar } from "@/constants/enum";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id?: string;
  name: string;
  subTitle: string;
  src: string;
  suggested?: boolean;
  contained?: boolean;
}

const UserBox = ({
  id,
  name,
  subTitle,
  src,
  suggested = false,
  contained = false,
}: Props) => {
  const [following, setFollowing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const { mutate: unfollow } = useUnfollowMutation();
  const { mutate: follow } = useFollowMutation();
  const { mutate: logOut } = useLogOutMutation(router);

  const handleFollow = (id: string) => () => {
    if (!following) {
      follow(id);
      setFollowing((prev) => !prev);
    } else {
      setIsOpen(true);
    }
  };

  const handleUnFollow = () => {
    unfollow(id as string);
    setFollowing(false);
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleLogout = () => {
    logOut();
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} handleCloseModal={handleCloseModal}>
        {suggested ? (
          <div className="bg-gray26 text-white w-[430px] rounded-lg flex flex-col">
            <div className="p-8 flex items-center justify-center flex-col gap-8">
              <div className="h-[90px] w-[90px]">
                <Image
                  src={src}
                  alt={src}
                  width={2000}
                  height={2000}
                  className="object-cover rounded-full"
                />
              </div>
              <p>Unfollow {name}?</p>
            </div>
            <div className="h-12 flex items-center justify-center border-t border-grayF14">
              <button
                onClick={handleUnFollow}
                className="font-bold text-red-500"
              >
                Unfollow
              </button>
            </div>
            <div className="h-12 flex items-center justify-center border-t border-grayF14">
              <button onClick={handleCloseModal} className="font-medium">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray26 text-white h-[160px] w-[430px] rounded-lg flex flex-col justify-between">
            <div className="flex-1 flex items-center justify-center flex-col gap-1">
              <span className="text-xl font-medium">Logging Out</span>
              <p className="text-grayA8">You need to log back in.</p>
            </div>
            <div className="h-12 flex items-center justify-center border-t border-grayF14">
              <button onClick={handleLogout} className="font-medium">
                Log in
              </button>
            </div>
          </div>
        )}
      </Modal>
      <div className="flex items-center justify-between px-4">
        <Avatar
          name={name}
          truncate
          size={SizesAvatar.Medium}
          subTitle={subTitle}
          src={src}
          type={TypeAvatar.Normal}
        />
        <Button
          variant={contained ? "contained" : "transparent"}
          className="text-xs text-primary py-1 hover:text-white transition-all font-semibold"
          onClick={suggested ? handleFollow(id as string) : handleOpenModal}
        >
          <span className={classNames(following && "text-white")}>
            {suggested ? (following ? "Following" : "Follow") : "Log out"}
          </span>
        </Button>
      </div>
    </>
  );
};

export default UserBox;
