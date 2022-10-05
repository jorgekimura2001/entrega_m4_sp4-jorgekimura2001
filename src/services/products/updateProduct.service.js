import database from "../../database"

const updateProductService = async (id, product) => {
    try {
        if(product.name || product.price || product.category_id){
            let query = `UPDATE products SET `
            const keys = Object.keys(product)
            const values = Object.values(product) 

            keys.forEach((key, index) => {
                query += `${key} = \$${index+=1}, `
            })

            query = query.slice(0, -2)

            query += ` WHERE id = \$${keys.length+=1} RETURNING *;` 
            console.log(query)

            const res = await database.query(
                query, [...values, id]
            )

            if (res.rowCount === 0){
                throw new Error('Product not found')
            }

            return {message: 'Product updated', product: res.rows[0]}
        }
        throw new Error('Just name, price or category_id can be update') 
    } catch (error) {
        throw new Error(error)
    }
}

export default updateProductService