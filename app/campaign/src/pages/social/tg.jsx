import { authTgCallback } from '@/api/incentive';
import AuthSocial from '.';

export default function () {
  return <AuthSocial authCallback={authTgCallback} type='telegram' />;
}
