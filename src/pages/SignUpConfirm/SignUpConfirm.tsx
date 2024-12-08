import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormWrapper } from '../../components/Form/FormWrapper';
import { OTPInput } from '../../components/OtpInput/OtpInput';
import { useApiMethodCsrf } from '../../hooks/useApiMethodCsrf';
import { accountsApiDeclaration, ConfirmBody } from '../../apiDeclarations';
import { pathnames } from '../../constants';

import './SignUpConfirm.css';

const optLength = 6;

export const SignUpConfirm: FunctionComponent = () => {
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState('');
  const [showError, setShowError] = useState(false);
  const { apiMethodState, fetchData } = useApiMethodCsrf<unknown, ConfirmBody>(accountsApiDeclaration.confirm);
  const { process: { error }, data } = apiMethodState;

  useEffect(() => {
    if (otpValue.length === optLength) {
      fetchData({ code: otpValue });
    }
  }, [otpValue]);

  useEffect(() => {
    if (!data) {
      return;
    }
    navigate(pathnames.signIn);
  }, [data]);

  useEffect(() => {
    if (!error) {
      return;
    }
    setShowError(true);
  }, [error]);

  const handleChange = (otp: string) => {
    setShowError(false);
    setOtpValue(otp);
  };

  return (
    <div className='sign-up-confirm'>
      <FormWrapper>
        <h2>OTP Verification</h2>
        <div className='sign-up-confirm-enter-message'>Enter the OTP you received</div>
        <div className='sign-up-confirm-otp-container'>
          <OTPInput
            length={optLength}
            value={otpValue}
            error={showError}
            onChange={handleChange}
          />
        </div>
        <div>

        </div>
        {(error && showError) && <div>Invalid token</div>}
      </FormWrapper>
    </div>
  );
};
