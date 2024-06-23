const jwt = require('jsonwebtoken');



export async function GET(request) {

    // const cubejsToken = jwt.sign(
    //     {}, process.env.NEXT_PUBLIC_CUBEJS_API_SECRET, { expiresIn: '30d' }
    // );

    // console.log(cubejsToken);
    return new Response("OK", { status: 200 });
}