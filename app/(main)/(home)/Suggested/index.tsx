"use client";

import { useSuggestedQuery } from "@/apis/user/useSuggestedQuery";
import SuggestedLoading from "@/components/Loading/SuggestedLoading";
import { SuggestedType } from "@/types/user.types";
import { isEmpty, map } from "lodash";
import Footer from "./Footer";
import SuggestTitle from "./SuggestTitle";
import UserBox from "@/components/UserBox";

const LIMIT = 5;

const Suggested = () => {
  const { data } = useSuggestedQuery(LIMIT);

  const users = map(data?.data, (item) => item);

  return (
    <div className="w-[384px] hidden xl:block pl-16 mt-7">
      <UserBox
        name="nguyenleavu"
        subTitle="Followed by justinbieber"
        src="https://social-media-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/images/1e2f62b656b5d7218284f9603.jpg"
      />
      <div className="mt-6 mb-2">
        <SuggestTitle />
        <div className="py-2">
          {isEmpty(users) ? (
            <div className="pl-4">
              {map(Array(5).fill(0), (_, index) => (
                <div key={index} className="py-2">
                  <SuggestedLoading />
                </div>
              ))}
            </div>
          ) : (
            map(users, (item: SuggestedType) => (
              <div key={item._id} className="py-2">
                <UserBox
                  suggested
                  id={item.user._id}
                  name={item.user.username}
                  subTitle={item.user.name}
                  src={item.user.avatar}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Suggested;
