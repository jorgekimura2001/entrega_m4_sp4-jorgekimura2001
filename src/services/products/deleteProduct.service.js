import database from "../../database"

const deleteProductService = async (id) => {
    try {
        const res = await database.query(
            `DELETE FROM products WHERE id = $1;`, [id]
        )
    
        if(res.rowCount === 0){
            throw new Error('Product not found')
        }

    } catch (error) {
        throw new Error(error)
    }
}

export default deleteProductService