import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice'
import { useForm } from 'react-hook-form';

export default function Counter() {
  const userInfo = useSelector(selectUserInfo)
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
  const [showAddAddressFrom, setShowAddAddressFrom] = useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1, addressUpdate)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
  }
  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }

  const handleEditForm = (index) => {
    setSelectedEditIndex(index)
    const address = userInfo.addresses[index]
    setValue('name', address.name)
    setValue('email', address.email)
    setValue('phone', address.phone)
    setValue('street', address.street)
    setValue('city', address.city)
    setValue('state', address.state)
    setValue('pinCode', address.pinCode)
  }

  const handleAddAddress = (addressData) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses,, addressData] }
    dispatch(updateUserAsync(newUser))
    setShowAddAddressFrom(false)
  }
  return (
    <div>
      <div className='bg-white'>
        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-7 font-bold tracking-tight text-gray-900">
                Name: {userInfo.name ? userInfo.name : "New Gust User"}
              </h1>
              <h3 className="text-xl my-7 font-bold tracking-tight text-red-900">
                email address: {userInfo.email}
              </h3>
              {userInfo.role === "admin" && <h3 className="text-xl my-7 font-bold tracking-tight text-red-900">
                role: {userInfo.role}
              </h3>}
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <button
                onClick={e =>{setShowAddAddressFrom(true); setSelectedEditIndex(-1)}}
                type="submit"
                className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add New Address
              </button>


              {showAddAddressFrom ? <form className="bg-white px-5 py-12" noValidate onSubmit={handleSubmit((data) => {
                // dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
                handleAddAddress(data)
                reset()
              })}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", { required: "name is required" })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                              pattern: {
                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                message: "email is not valied"
                              }
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", { required: "phone in required" })}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", { required: "street is required" })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", { required: "city is required" })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", { required: "state is required" })}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                          PinCode
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", { required: "pinCode is required" })}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      onClick={(e) => setShowAddAddressFrom(false)}
                      type="submit"
                      className="rounded-md px-3 py-2 text-sm font-semibold  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      Cancle
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit Address
                    </button>
                  </div>
                </div>
              </form> : null}


              <div><p className="mt-0.5 text-sm text-gray-500">Your Address : </p>
                {userInfo.addresses && userInfo.addresses.map((address, index) =>
                  <div>
                    {selectedEditIndex === index ? <form className="bg-white px-5 py-12" noValidate onSubmit={handleSubmit((data) => {
                      handleEdit(data, index)
                      reset()
                    })}>
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("name", { required: "name is required" })}
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "email is required",
                                    pattern: {
                                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                      message: "email is not valied"
                                    }
                                  })}
                                  type="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                              </label>
                              <div className="mt-2">
                                <input
                                  id="phone"
                                  {...register("phone", { required: "phone in required" })}
                                  type="tel"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("street", { required: "street is required" })}
                                  id="street"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("city", { required: "city is required" })}
                                  id="city"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("state", { required: "state is required" })}
                                  id="state"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                PinCode
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("pinCode", { required: "pinCode is required" })}
                                  id="pinCode"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            onClick={(e) => setSelectedEditIndex(-1)}
                            type="submit"
                            className="rounded-md px-3 py-2 text-sm font-semibold  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          >
                            Cancle
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>
                      </div>
                    </form> : null}
                    { address && <div className="flex justify-between my-4 gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                        <p className="text-sm leading-6 text-gray-500">{address.city}</p>
                      </div>
                      {/* edit and remove section */}
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <button
                          onClick={(e) => handleEditForm(index)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleRemove(e, index)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
