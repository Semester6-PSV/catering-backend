class CateringOrder{
    constructor(id, totalPrice, addedProducts, done, scanned) {
        this.id = id
        this.totalPrice = totalPrice
        this.addedProducts = addedProducts
        this.done = done
        this.scanned = scanned
    }
}

module.exports = CateringOrder;