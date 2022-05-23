class CateringOrder{
    constructor(id, totalPrice, addedProducts) {
        this.id = id
        this.totalPrice = totalPrice
        this.addedProducts = addedProducts
        this.scanned = false
    }
}

module.exports = CateringOrder;