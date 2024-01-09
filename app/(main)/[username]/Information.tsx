"use client";

import { useFollowMutation } from "@/apis/user/useFollowMutation";
import { useProfileQuery } from "@/apis/user/useProfileQuery";
import { useUnfollowMutation } from "@/apis/user/useUnfollowMutation";
import Button from "@/components/Button";
import ProfileLoading from "@/components/Loading/ProfileLoading";
import Content from "@/components/Post/Content";
import { ROUTES } from "@/constants/routes";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setProfile } from "@/redux/profile/profileSlice";
import { Profile } from "@/types/user.types";
import classNames from "classnames";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Information = ({ params }: { params: { username: string } }) => {
  const { data, isLoading } = useProfileQuery(params.username);
  const { mutate: follow } = useFollowMutation();
  const { mutate: unfollow } = useUnfollowMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [following, setFollowing] = useState<boolean>(false);

  const user = data?.data.data as Profile;
  const me = useAppSelector((state) => state.profile.user);

  const myAccount = user?.username === me?.username;

  const handleFollow = () => {
    if (myAccount) {
      router.push(ROUTES.EDIT_PROFILE);
      return;
    }

    if (following) {
      unfollow(user._id);
    } else {
      follow(user._id);
    }
    setFollowing((prev) => !prev);
  };

  useEffect(() => {
    if (!isEmpty(user)) {
      setFollowing(user.isFollowing);
      dispatch(setProfile(user));
    }
  }, [user, dispatch]);

  return isLoading ? (
    <ProfileLoading />
  ) : (
    <header className="w-content h-[200px] flex mb-11">
      <div className="w-1/3 flex items-center justify-center">
        <div className="h-[150px] w-[150px]">
          <Image
            src={user.avatar}
            alt={user.name}
            priority
            width={2000}
            height={2000}
            className="h-full w-full rounded-full"
          />
        </div>
      </div>
      <div className="w-2/3">
        <div className="flex items-center gap-5 h-12 mb-4">
          <h2 className="text-2xl">{user.username}</h2>
          <div className="flex items-center gap-2">
            <Button
              className={classNames(
                following && "transition-all bg-gray-700 hover:bg-gray-700/80"
              )}
              variant="contained"
              onClick={handleFollow}
            >
              {myAccount
                ? "Edit Profile"
                : following
                ? "Unfollow"
                : "Following"}
            </Button>
            {!myAccount && <Button variant="contained">Message</Button>}
          </div>
        </div>
        <ul className="flex items-center gap-10 mb-4">
          <li>
            <span className="font-semibold mr-1">{user.posts.length}</span>posts
          </li>
          <li>
            <span className="font-semibold mr-1">{user.followers}</span>
            followers
          </li>
          <li>
            <span className="font-semibold mr-1">{user.following}</span>
            following
          </li>
        </ul>
        <div className="mb-4">
          <span className="font-semibold text-sm">{user.name}</span>
        </div>
        <Content
          content={user.bio}
          className="max-h-[100px] w-full overflow-y-auto no-scrollbar"
        />
      </div>
    </header>
  );
};

export default Information;
