function getMostSoldProducts(products) {
    var mostSoldProducts = []

    // TODO implement me
    var max = 0

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        if (product.quantity > max) { 
            max = product.quantity
        }
       
    }
    
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        if (product.quantity === max) {
            mostSoldProducts.push(product.name) 
        }
        
    }


    

    return mostSoldProducts
}