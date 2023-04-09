import { menuArray } from "./data.js";
/* Todo
 Reset form, .reset() does not work for some reason. 
 Order button shows after all orders are deleted. If statement.
 should not be able to click order button if there are no orders.
 Remake in react?
*/


const orderArray = []
const orderMenu = document.getElementById("unordered-list-orders")
document.addEventListener("click", function(e){
    if(e.target.dataset.dish){
        handleOrder(e.target.dataset.dish) 
    }
    else if(e.target.id === "order-btn"){
        handleModal(e.target.id)        
    }
    else if(e.target.id === "pay-btn"){
        e.preventDefault()
        handlePayment(e.target.id)
    }
    else if(e.target.id === "delete-btn"){
        console.log(e.target.dataset.id)
        deleteOrderItem(e.target.dataset.id)
        //needs to be fixed. 
    }
})
function deleteOrderItem(orderId){
    orderArray.splice(orderId,1)
    renderOrder()
}
function handleModal(){
    document.getElementById("modal").classList.toggle("hidden")
}

function handlePayment(){
    const customerName = document.getElementById("firstname").value
    let completedOrder = `<div class="darkgreen completed">Thanks ${customerName}! Your order is on its way!</div>`
    orderMenu.innerHTML = completedOrder
    orderArray.length = 0 
    //document.getElementById("order-form").reset()  does not work? why..
    handleModal()
}
function handleOrder(order){
    let orderForm = document.getElementById("currentOrder")
    const newOrderItemObj = menuArray.filter(function(dish){
        return dish.id == order
    })[0]
    orderArray.push(newOrderItemObj)
    renderOrder()

}

function renderOrder(){
    let orderList = '<h2 class="orderHeadline">Your Order</h2>'
    let totalPrice = 0
    orderArray.forEach(function(order){
        totalPrice += order.price
        orderList += `<div class="order-container">
                        <div class="order-name")>${order.name}</div>
                        <button id="delete-btn" class="delete-btn" data-id=${orderArray.indexOf(order)} >remove</button>
                        <div>$${order.price}</div>
                    </div> 
                    `
    })
    orderMenu.innerHTML = orderList
    orderMenu.innerHTML+= `  <div class="order-container overline">  
                                <div class="summary">Total Price:</div>
                                <div>$${totalPrice}</div>
                                
                             </div>
                             <button id="order-btn"class="order-btn">Complete order</button>`
    orderList = ''
}
function renderMenu(){
    const menuItems = document.getElementById("menu-items")
    let resturantMenu = ''
    menuArray.forEach(function(dish){
    
        let ingredients = ''
        dish.ingredients.forEach(function(item){
            ingredients += item + ", "
            
        })
        resturantMenu += `
        <div class="menuflex">
            <img class="emoji"src="${dish.emoji}">
            <div class="innermenu">
                <p class="dishname">${dish.name}</p>
                <p class="ingredient">${ingredients}</p>
                <p class="price">$${dish.price}</p>
            </div>
            <button class="order" data-dish=${dish.id}>+</button>
        </div>
        `
        
    })

    menuItems.innerHTML = resturantMenu
}
renderMenu()