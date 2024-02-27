import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json();
    try {
        const merchants = JSON.parse(readFileSync("data/merchants.txt"));
        // Inserta el nuevo comercio al principio de la lista
        const updatedMerchants = [data, ...merchants];
        writeFileSync("data/merchants.txt", JSON.stringify(updatedMerchants));
        return NextResponse.json({ message: "Guardando datos..." });
    } catch (e) {
        writeFileSync("data/merchants.txt", JSON.stringify([data]));
        return NextResponse.json({ message: "Guardando datos...", status: 400 });
    }
}

export async function GET() {
    try{
        const merchants = JSON.parse(readFileSync("data/merchants.txt"))
        //console.log(merchants)
        return NextResponse.json({merchants})
    } catch(e){  
        return NextResponse.json({message: "Usuarios no existen...", status: 400})
    }
}

export async function PUT(request) {
    const data = await request.json();
    try {
        const merchants = JSON.parse(readFileSync("data/merchants.txt"));
        const updatedMerchants = merchants.map(merchant => {
            if (merchant.id === data.id) {
                return { ...merchant, ...data };
            }
            return merchant;
        });
        writeFileSync("data/merchants.txt", JSON.stringify(updatedMerchants));
        return NextResponse.json({ message: "Actualizando datos..." });
    } catch (e) {
        return NextResponse.json({ message: "Error al actualizar los datos...", status: 400 });
    }
}

export async function DELETE(request) {
    const data = await request.json();
    try {
        const merchants = JSON.parse(readFileSync("data/merchants.txt"));
        const updatedMerchants = merchants.filter(merchant => merchant.id !== data.id);
        writeFileSync("data/merchants.txt", JSON.stringify(updatedMerchants));
        return NextResponse.json({ message: "Comercio eliminado con éxito" });
    } catch (e) {
        return NextResponse.json({ message: "Error al eliminar el comercio", status: 400 });
    }
}
