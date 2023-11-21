import RequestPasswordResetForm from "./RequestPasswordResetForm";
import SetNewPasswordForm from "./SetNewPasswordForm";

import "./ResetPassword.css";

const ResetPassword = () => {
  const resetToken = location.hash ? location.hash.substr(1) : false;

  return (
    <div className="reset-password-page">
      {resetToken ? (
        <SetNewPasswordForm resetToken={resetToken} />
      ) : (
        <RequestPasswordResetForm />
      )}
    </div>
  );
};

export default ResetPassword;
