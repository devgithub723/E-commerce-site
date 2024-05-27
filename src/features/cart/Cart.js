import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromCartAsync, selectCartLoaded, selectCartStatus, selectedItem, updateCartAsync,
} from './cartSlice';
// import itemList from '../item-list/components/itemList'
// import { Dialog, Transition } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate } from 'react-router-dom';

import { Grid } from 'react-loader-spinner';
import Modal from '../common/Modal';

export default function Cart() {
  const [open, setOpen] = useState(true)
  const items = useSelector(selectedItem)
  const totalAmount = items.reduce((amount, item) => item.product.discountPrice * item.quantity + amount, 0)
  const totalItems = items.reduce((total, item) => item.quantity + total, 0)
  const status = useSelector(selectCartStatus)
  const cartLoaded = useSelector(selectCartLoaded)
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(-1)
  const handleUpdate = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }))
  }
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id))
  }
  return (
    <>
      {!items.length && cartLoaded && <Navigate to='/'></Navigate>}

      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-7 font-bold tracking-tight text-gray-900">Cart</h1>

          <div className="flow-root">
            {status === 'loading' ? <Grid
              visible={true}
              height="80"
              width="80"
              color="rgba(79,70,229)"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            /> : null}
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.href}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">{item.product.discountPrice}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                          Qty
                        </label>
                        <select className="text-sm font-medium" onChange={(e) => handleUpdate(e, item)} value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modal
                          title={`Delete ${item.product.title} from the cart`}
                          message="Are you sure you want to delete this item from your cart"
                          deactivate="Delete"
                          cancleOption="Cancle"
                          deactivateAction = {(e)=> handleRemove(e, item.id)}
                          cancleAction = {() => setOpenModal(-1)}
                          showModal = {openModal === item.id}
                        >
                        </Modal>
                        <button
                          onClick={() => setOpenModal(item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between  my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items in cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or {' '}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
