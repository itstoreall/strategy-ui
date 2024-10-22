import { RxExclamationTriangle } from "react-icons/rx";

const config = {
  formHeadingMsg: "Oops, something went wrong.",
  formBottomMsg: "To go back to the sign in page, ",
};

const AuthErrorPage: React.FC = () => {
  return (
    <div className="auth-error-page">
      <div className="auth-error-card">
        <div className="form-heading-info-error">
          <RxExclamationTriangle className="icon" />
          <p>{config.formHeadingMsg}</p>
        </div>

        <div className="form-bottom-info-success">
          <p>
            {config.formBottomMsg}
            <a href="/api/auth/signin">click here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
