import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';


export async function POST(request) {
    const data = await request.json()
    try{
        const comentarios = JSON.parse(readFileSync("data/comentarios.txt"))
        writeFileSync("data/comentarios.txt", JSON.stringify([ data ,  ...comentarios ]))
    } catch(e){  
        writeFileSync("data/comentarios.txt", JSON.stringify([data]))
    }
    return NextResponse.json({message: "Guardando datos..."})
}


export async function GET() {
    try{
        const comentarios = JSON.parse(readFileSync("data/comentarios.txt"))
        //console.log(comentarios)
        return NextResponse.json({comentarios})
    } catch(e){  
        return NextResponse.json({message: "Comentarios no existen...", status: 400})
    }
}