import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormWrapper } from '../../components/Form/FormWrapper';
import { OTPInput } from '../../components/OtpInput/OtpInput';
import { useApiMethodCsrf } from '../../hooks/useApiMethodCsrf';
import { accountsApiDeclaration, ConfirmBody } from '../../apiDeclarations';
import { pathnames } from '../../constants';
import { Timer } from '../../components/Timer/Timer';
import { useRemainingTime } from '../../hooks/useRemainingTime';
import { OtpResend } from '../../components/OtpResend/OtpResend';

import './SignUpConfirm.css';

const optLength = 6;

const otpExpiredTimeLocalStorageKey = 'otpExpiredTime';

export const SignUpConfirm: FunctionComponent = () => {
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [otpExpired, setOtpExpired] = useState<Date | null>(null);
  const { remainingTimeMs } = useRemainingTime(otpExpired);
  const { apiMethodState, fetchData } = useApiMethodCsrf<unknown, ConfirmBody>(accountsApiDeclaration.confirm);
  const { process: { error }, data } = apiMethodState;

  useEffect(() => {
    const otpExpiredTime = localStorage.getItem(otpExpiredTimeLocalStorageKey);
    if (!otpExpiredTime) {
      throw new Error('TODO: Handle this error');
    }
    const otpExpiredTimeDate = new Date(otpExpiredTime);
    setOtpExpired(otpExpiredTimeDate);
  }, []);

  useEffect(() => {
    if (otpValue.length === optLength) {
      fetchData({ code: otpValue });
    }
  }, [otpValue, fetchData]);

  useEffect(() => {
    if (!data) {
      return;
    }
    navigate(pathnames.signIn);
  }, [data, navigate]);

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
        <div className='sign-up-confirm-otp-info-messages'>
          {(!!otpExpired && !showError) && (
            <Timer
              remainingTimeMs={remainingTimeMs}
            />
          )}
          {(error && showError) && <div className='sign-up-confirm-otp-info-error'>Invalid token</div>}
        </div>
        <div className='sign-up-confirm-otp-info-messages'>
          {remainingTimeMs <= 0 && (
            <OtpResend />
          )}
        </div>
      </FormWrapper>
    </div>
  );
};
