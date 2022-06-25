const CateringProduct = require('./models/cateringProduct.js')
const CateringOrder = require('./models/cateringOrder.js');

let socket
let io
const openOrders = []

function initEvents(_socket, _io) {
    socket = _socket
    io = _io

    socket.on('create-new-order', (data, callback) =>{
        createNewOrder(data)

        if(typeof callback === 'function'){
            callback(openOrders)
        }
    })

    socket.on('request-all-orders', (agr, callback) =>{
        if(typeof callback === 'function'){
            callback(openOrders)
        }
    })

    socket.on('set-order-to-done', completeOrder)
    socket.on('set-order-to-scanned', archiveOrder)
}

function getOrderById(id) {
    for (let i = 0; i < openOrders.length; i++) {
        if (openOrders[i] === id) {
            return openOrders[i]
        }
    }
}

function getOrderIndexById(id) {
    for (let i = 0; i < openOrders.length; i++) {
        if (openOrders[i] === id) {
            return i
        }
    }
}

function createNewOrder(data) {
    const orderId = Math.floor(100000 + Math.random() * 900000)
    const parsedOrderedProducts = []

    data.addedProducts.forEach(jsonString => {
        const product = JSON.parse(jsonString)
        parsedOrderedProducts.push(new CateringProduct(product.id, product.title, product.price, product.image, product.productType, product.amount))
    });

    openOrders.push(new CateringOrder(orderId, data.totalPrice, parsedOrderedProducts, false, false))

    socket.broadcast.emit('update-orders', openOrders)
}

function completeOrder(order) {
    order.done = true
    socket.broadcast.emit('update-orders', openOrders)
}

function archiveOrder(order) {
    openOrders.splice(getOrderIndexById(order.id), 1)
    socket.broadcast.emit('update-orders', openOrders)
}

module.exports = {
    initEvents: initEvents,
}