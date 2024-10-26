
import { KindeClient } from '@kinde-oss/kinde-auth';
const kinde = new KindeClient({
  clientId: process.env.REACT_APP_KINDE_CLIENT_ID,
  clientSecret: process.env.REACT_APP_KINDE_CLIENT_SECRET,
  issuer: process.env.REACT_APP_KINDE_ISSUER_URL,
});

export default kinde;
