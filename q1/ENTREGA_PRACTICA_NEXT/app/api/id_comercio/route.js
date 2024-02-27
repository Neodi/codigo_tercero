import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()
    try{
        const id_comercios = JSON.parse(readFileSync("data/id_comercios.txt"))
        writeFileSync("data/id_comercios.txt", JSON.stringify([...id_comercios, data]))
    } catch(e){  
        writeFileSync("data/id_comercios.txt", JSON.stringify([data]))
    }
    return NextResponse.json({message: "Guardando datos..."})
}

export async function GET() {
    try{
        const id_comercios = JSON.parse(readFileSync("data/id_comercios.txt"))
        //console.log(id_comercios)
        return NextResponse.json({id_comercios})
    } catch(e){  
        return NextResponse.json({message: "Usuarios no existen...", status: 400})
    }
}

export async function PUT(request) {
    const data = await request.json();
    try {
        const id_comercios = JSON.parse(readFileSync("data/id_comercios.txt"));
        const updated_Id_comercios = id_comercios.map(merchant => {
            if (merchant.id === data.id) {
                return { ...merchant, ...data };
            }
            return merchant;
        });
        writeFileSync("data/id_comercios.txt", JSON.stringify(updated_Id_comercios));
        return NextResponse.json({ message: "Actualizando datos..." });
    } catch (e) {
        return NextResponse.json({ message: "Error al actualizar los datos...", status: 400 });
    }
}


export async function DELETE(request) {
    const data = await request.json();

    try {
        // Eliminar en merchants.txt
        const merchants = JSON.parse(readFileSync("data/merchants.txt"));
        const updatedMerchants = merchants.filter(merchant => merchant.id !== data.id);
        writeFileSync("data/merchants.txt", JSON.stringify(updatedMerchants));

        // Eliminar en comentarios.txt
        const comentarios = JSON.parse(readFileSync("data/comentarios.txt"));
        const updatedComentarios = comentarios.filter(comentario => comentario.comercioId !== data.id);
        writeFileSync("data/comentarios.txt", JSON.stringify(updatedComentarios));

        // Eliminar en id_comercios.txt
        const comercios = JSON.parse(readFileSync("data/id_comercios.txt"));
        const updatedComercios = comercios.filter(comercio => comercio.id !== data.id);
        writeFileSync("data/id_comercios.txt", JSON.stringify(updatedComercios));

        return NextResponse.json({ message: "Comercio eliminado con éxito en todos los archivos" });
    } catch (e) {
        console.error('Error al eliminar el comercio:', e);
        return NextResponse.json({ message: "Error al eliminar el comercio", status: 400 });
    }
}
