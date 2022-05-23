const CateringProduct = require('./models/cateringProduct.js')
const CateringOrder = require('./models/cateringOrder.js');

let socket
const openOrders = []

function initEvents(_socket) {
    socket = _socket
    socket.on('create-new-order', createNewOrder)
}

function createNewOrder(data) {
    const orderId = Math.floor(100000 + Math.random() * 900000)

    const parsedOrderedProducts = []

    data.addedProducts.forEach(jsonString => {
        const product = JSON.parse(jsonString)
        parsedOrderedProducts.push(new CateringProduct(product.id, product.title, product.price, product.image, product.productType, product.amount))
    });

    openOrders.push(new CateringOrder(orderId, data.totalPrice, parsedOrderedProducts))

    socket.emit('succesfully-created-order', openOrders)
}

module.exports = {
    initEvents: initEvents,
}