import Button from "@/components/Button";
import { getGoogleAuthUrl } from "@/utils/googleAuth";
import Link from "next/link";

const LoginWithGoogle = () => {
  const googleOAuthUrl = getGoogleAuthUrl();

  return (
    <Button
      variant="outlined"
      size="fullWidth"
      className="my-4"
      component={Link}
      href={googleOAuthUrl}
    >
      <span className="mr-2">
        <i className="fa-brands fa-google"></i>
      </span>
      <span>Login with Google</span>
    </Button>
  );
};

export default LoginWithGoogle;
