import { authDcCallback } from '@/api/incentive';
import AuthSocial from '.';

export default function () {
  return <AuthSocial authCallback={authDcCallback} type='discord' />;
}
