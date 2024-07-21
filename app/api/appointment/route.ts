import clientPromise from "@/mondoDB/mongo/clientPromise";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const data = await req.json();
    const MongodbClient = await clientPromise;
    const db = MongodbClient.db("Anantya");
    const collection = db.collection("appointment");

    // const result = await collection.insertOne(data);
    try {
        const result = await collection.insertOne(data);
        return NextResponse.json({ success: true, result, status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error, status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const MongodbClient = await clientPromise;
    const db = MongodbClient.db("Anantya");
    const collection = db.collection("appointment");
    const data = await collection.find().toArray();
    return NextResponse.json(data);
}