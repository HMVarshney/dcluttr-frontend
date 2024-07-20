import { getCookie } from './utils';
import cube from '@cubejs-client/core';



const cubeJsInterceptorInstance = cube(
    `Bearer ${getCookie("accessToken")}`,
    { apiUrl: process.env.NEXT_PUBLIC_CUBEJS_API_URL }
);


export default cubeJsInterceptorInstance;