import React from "react";
import Button from "../../../../components/Button";

const LoginWithGoogle = () => {
  return (
    <Button variant="outlined" size="fullWidth" className="my-4">
      <span className="mr-2">
        <i className="fa-brands fa-google"></i>
      </span>
      Login with Google
    </Button>
  );
};

export default LoginWithGoogle;
