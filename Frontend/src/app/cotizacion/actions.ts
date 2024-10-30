'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
)

interface Material {
    id: number
    quantity: number
}

interface ExtraItem {
    nombre: string
    descripcion: string
    precio: string
    m2?: number
}

interface QuotationData {
    nombre: string
    descripcion: string
    materials: Material[]
    extraItems: ExtraItem[]
}

export async function getMaterials() {
    const { data, error } = await supabase
        .from('materiales')
        .select('*')
        .order('nombre')
    if (error) {
        console.error('Error fetching materials:', error)
        return { error: error.message }
    }
    return { data }
}

export async function createQuotation(quotationData: QuotationData) {
    // Insert into cotizacion table
    const { data: cotizacion, error: cotizacionError } = await supabase
        .from('cotizacion')
        .insert({ proyecto_id: 2 })
        .select()
        .single()

    if (cotizacionError) {
        console.error('Error creating quotation:', cotizacionError)
        return { error: cotizacionError.message }
    }

    // Insert materials into cotizacion_materiales table
    if (quotationData.materials.length > 0) {
        const cotizacionMateriales = quotationData.materials.map((item) => ({
            cotizacion_id: cotizacion.id,
            material_id: item.id,
            cantidad: item.quantity
        }))

        const { error: materialesError } = await supabase
            .from('cotizacion_materiales')
            .insert(cotizacionMateriales)

        if (materialesError) {
            console.error('Error inserting quotation materials:', materialesError)
            return { error: materialesError.message }
        }
    }

    // Insert extra items into personalizados table
    if (quotationData.extraItems.length > 0) {
        const personalizados = quotationData.extraItems.map((item) => ({
            cotizacion_id: cotizacion.id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            precio: parseFloat(item.precio),
            metros: item.m2
        }))

        const { error: personalizadosError } = await supabase
            .from('personalizados')
            .insert(personalizados)

        if (personalizadosError) {
            console.error('Error inserting custom items:', personalizadosError)
            return { error: personalizadosError.message }
        }
    }

    return { success: true, quotationId: cotizacion.id }
}