"use client";

import { useSuggestedQuery } from "@/apis/user/useSuggestedQuery";
import Footer from "@/components/Footer";
import SuggestedLoading from "@/components/Loading/SuggestedLoading";
import UserBox from "@/components/UserBox";
import { SuggestedType } from "@/types/user.types";
import { isEmpty, map } from "lodash";

const LIMIT = 30;

const SuggestedPage = () => {
  const { data } = useSuggestedQuery(LIMIT);

  const users = map(data?.data, (item) => item);
  return (
    <div className="min-h-screen flex justify-center py-16">
      <div className="flex flex-col w-[600px]">
        <span className="font-semibold text-white text-xl">Suggested</span>
        <div className="py-2">
          {isEmpty(users) ? (
            <div className="pl-4">
              {map(Array(25).fill(0), (_, index) => (
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
                  contained
                  id={item.user._id}
                  name={item.user.username}
                  subTitle={item.user.name}
                  src={item.user.avatar}
                />
              </div>
            ))
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SuggestedPage;
