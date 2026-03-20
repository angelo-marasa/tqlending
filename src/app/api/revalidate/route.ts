import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad request", { status: 400 });
    }

    switch (body._type) {
      case "settings":
        revalidateTag("settings", "page");
        break;
      case "homepage":
        revalidateTag("homepage", "page");
        break;
      case "productPage":
        revalidateTag("products", "page");
        if (body.slug?.current) {
          revalidateTag(`product-${body.slug.current}`, "page");
        }
        break;
      case "blogPost":
        revalidateTag("blog", "page");
        if (body.slug?.current) {
          revalidateTag(`blog-${body.slug.current}`, "page");
        }
        break;
      case "teamMember":
        revalidateTag("team", "page");
        break;
      case "guide":
        revalidateTag("guides", "page");
        break;
      case "landingPage":
        if (body.slug?.current) {
          revalidateTag(`landing-${body.slug.current}`, "page");
        }
        break;
      case "about":
        revalidateTag("about", "page");
        break;
      default:
        revalidateTag("settings", "page");
        revalidateTag("homepage", "page");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
