'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
)


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

// export async function addMaterial(formData: FormData) {
// 	console.log("Got here")
// 	console.log(formData)
// 	const nombre = formData.get('nombre') as string
// 	const precio = parseFloat(formData.get('precio') as string)
// 	const descripcion = formData.get('descripcion') as string

// 	if (!nombre || isNaN(precio)) {
// 		return { error: 'Invalid input' }
// 	}

// 	const { data, error } = await supabase
// 		.from('materiales')
// 		.insert({ nombre, descripcion, precio })
// 		.select()

// 	if (error) {
// 		console.error('Error adding material:', error)
// 		return { error: error.message }
// 	}

// 	console.log(error)
// 	console.log(data)
// 	revalidatePath('/materiales')
// 	return { success: true, data }
// }
