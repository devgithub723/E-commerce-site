export function addtoCart(item) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/cart",{
      method: 'POST',
      body: JSON.stringify(item),
      headers: {'content-type': 'application/json'}
    })
    const data = await responce.json()
    resolve({ data })
    console.log(data)
  }
  )
}

// fetch cart data
export function fecthItemsByUserId() {
  return new Promise(async (resolve) => {
    const responce = await fetch("/cart")
    const data = await responce.json()
    resolve({ data })
  }
  )
}

// update cart items
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/cart/"+update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {'content-type': 'application/json'}
    })
    const data = await responce.json()
    resolve({ data })
  }
  )
}

// cart remove item
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/cart/"+itemId,{
      method: 'DELETE',
      headers: {'content-type': 'application/json'}
    })
    const data = await responce.json()
    resolve({ data:{id:itemId} })
  }
  )
}

// reset cart
export function resetCart() {
  return new Promise(async (resolve) => {
    const responce = await fecthItemsByUserId()
    const items = responce.data
    for(let item of items){
      await deleteItemFromCart(item.id)
    }
    resolve({ status: "success" })
  }
  )
}