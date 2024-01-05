import { ROUTES } from "@/constants/routes";
import { getAccessToken } from "@/utils/token";
import { isEmpty } from "lodash";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const isLogin = isEmpty(getAccessToken());
    useEffect(() => {
      if (isLogin) {
        redirect(ROUTES.SIGN_IN);
      }
    }, []);

    if (isLogin) {
      return <Component />;
    }
    return <Component {...props} />;
  };
};
export default withAuth;
