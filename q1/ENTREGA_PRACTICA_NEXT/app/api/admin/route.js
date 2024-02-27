import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json();
    try {
        const admins = JSON.parse(readFileSync("data/admins.txt"));
        writeFileSync("data/admins.txt", JSON.stringify([...admins, data]));
    } catch (e) {
        writeFileSync("data/admins.txt", JSON.stringify([data]));
    }
    return NextResponse.json({ message: "Guardando datos..." });
}

export async function GET() {
    try {
        const admins = JSON.parse(readFileSync("data/admins.txt"));
        return NextResponse.json({ admins });
    } catch (e) {
        return NextResponse.json({ message: "Admins no existen...", status: 400 });
    }
}
