
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const cleanedBase64 = image.replace(/^data:image\/\w+;base64,/, "");

    const removeBgResponse = await fetch(
      "https://api.remove.bg/v1.0/removebg",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.REMOVE_BG_API_KEY as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_file_b64: cleanedBase64,
          size: "auto",
        }),
      }
    );

    if (!removeBgResponse.ok) {
      const errorData = await removeBgResponse.json();
      console.error("Remove.bg error:", errorData);
      return NextResponse.json(
        { error: errorData?.errors?.[0]?.title || "Remove.bg API error" },
        { status: 500 }
      );
    }

    const arrayBuffer = await removeBgResponse.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    return NextResponse.json(
      {
        output: `data:image/png;base64,${base64Image}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
