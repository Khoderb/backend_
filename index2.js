const fs = require('fs')
const Container = require('./index.js')

const container = new Container('products')

const fileReader = async () => {
    try {
        const data = await fs.promises.readFile('products.txt', 'utf-8')
        const products = JSON.parse(data)

        //Save 
        testSave(products);

        // getById
        testGetById(products[4].id);
        
        // deleteById
        testDeleteById(products[2].id);
        
        //get All
        const productsToWrite = container.getAll()
        await fileWriter(productsToWrite)

    } catch (error) {
        throw new Error(`Error writing file ${error}`)
    }
}

const testSave = products => {
    products.forEach(item =>
        container.save(item)
    );
    console.log("\nAll Products Has Been Saved Correctly With Their Respective ID ( save (item) )")
}
const testGetById = id => {
    console.log(`\nItem Has Been Retrieved Correctly ( getById(${id}) ):\n`)
    console.log(container.getById(id))
}
const testDeleteById = id => {
    container.deleteById(id)
    console.log(`\nItem Has Been Deleted Correctly ( deleteById(${id}) )`)
}

const testDeleteAll = () => {
    container.deleteAll()
    console.log("\nAll Items Have Been Deleted Correctly ( deleteAll() )")
    console.log(container.getAll())
    fileWriter([])
    console.log('\nProgram finished')
}

const fileWriter = async data => {
    try {
        await fs.promises.writeFile('products.txt', JSON.stringify(data, null, 2))
        console.log("\nFile Has Been Written correctly")
    } catch (error) {
        throw new Error(`Error writing file ${error}`)
    }
}

fileReader()
//All products will be deleted after 25 seconds
setTimeout(testDeleteAll, 25000)