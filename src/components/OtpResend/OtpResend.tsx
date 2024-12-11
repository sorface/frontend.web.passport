import { FunctionComponent } from 'react';
import { useApiMethodCsrf } from '../../hooks/useApiMethodCsrf';
import { optApiDeclaration } from '../../apiDeclarations';
import { Loader } from '../Loader/Loader';

export const OtpResend: FunctionComponent = () => {
  const { apiMethodState, fetchData } = useApiMethodCsrf<unknown, undefined>(optApiDeclaration.resend);
  const { process: { loading } } = apiMethodState;

  const handleResend = () => {
    fetchData(undefined);
  };

  return (
    <div>
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      <button onClick={handleResend} className=''>Resend</button>
    </div>
  )
};
