import { getCookie } from './utils';
import cube from '@cubejs-client/core';

const cubeJsApi = () => {
    const accessToken = getCookie("accessToken"); // This needs the client-side check
    return cube(
        `Bearer ${accessToken}`,
        { apiUrl: process.env.NEXT_PUBLIC_CUBEJS_API_URL }
    );
};
export default cubeJsApi