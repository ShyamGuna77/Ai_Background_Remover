

import Replicate from "replicate";
import { NextResponse } from "next/server";


export  async function POST(request:Request) {
    const req = await request.json()
    console.log(req)

    const replicate = new Replicate({
      auth: process.env.REPLICATE_TOKEN as string
    });

    const model =
      "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1";
    const input = {
        image:req.image
    }

    const output = await replicate.run(model,{input})

    if(!output) {
        console.log("Output went wrong")
        return NextResponse.json({
            error:"Something went wrong"
        },{
            status:500
        })
    }

    console.log("Output",output)
    return NextResponse.json({output},{status:201})

}