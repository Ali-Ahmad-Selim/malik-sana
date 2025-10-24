import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { v2 as cloudinary } from "cloudinary";
import { Connect } from "@/database/connection";
import Posting from "@/model/post";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const ALLOWED_OPTIONS = ["home", "waist coat", "casual coat", "shairwani"] as const;
type AllowedOption = (typeof ALLOWED_OPTIONS)[number];

// GET all photos
export async function GET() {
  try {
    await Connect();
    const items = await Posting.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ postings: items });
  } catch (err: any) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

// POST new photo
export async function POST(req: NextRequest) {
  try {
    await Connect();
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      
      // Get form data
      const title = form.get("title")?.toString().trim() || "";
      const description = form.get("description")?.toString() || "";
      const alt = form.get("alt")?.toString() || "";
      const option = form.get("option")?.toString().trim() as AllowedOption;
      const file = form.get("file") as File | null;

      // Validate inputs
      if (!file) return NextResponse.json({ error: "File is required" }, { status: 400 });
      if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
      if (!option) return NextResponse.json({ error: "Option is required" }, { status: 400 });
      if (!ALLOWED_OPTIONS.includes(option)) {
        return NextResponse.json(
          { error: `Option must be one of: ${ALLOWED_OPTIONS.join(", ")}` },
          { status: 400 }
        );
      }

      // Upload to Cloudinary
      const buffer = Buffer.from(await file.arrayBuffer());
      const uniqueIdentifier = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
      
      const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "postings",
            resource_type: "image",
            public_id: uniqueIdentifier,
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Upload failed"));
              return;
            }
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );
        uploadStream.end(buffer);
      });

      // Save to database
      const doc = await Posting.create({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        title,
        description,
        alt,
        option,
      });

      return NextResponse.json(
        {
          success: true,
          posting: {
            id: doc._id.toString(),
            url: doc.url,
            publicId: doc.publicId,
            title: doc.title,
            description: doc.description,
            alt: doc.alt,
            option: doc.option,
            createdAt: doc.createdAt,
          },
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "Unsupported content type" },
      { status: 415 }
    );

  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// DELETE photo
export async function DELETE(req: NextRequest) {
  try {
    await Connect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const doc = await Posting.findById(id);
    if (!doc) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete from Cloudinary
    if (doc.publicId) {
      await cloudinary.uploader.destroy(doc.publicId);
    }

    // Delete from database
    await Posting.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}