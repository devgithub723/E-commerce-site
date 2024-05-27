import React from 'react'
import Navbar from '../navbar/Navbar'
import AdminProductDetails from '../admin/components/AdminProductDetails'
import AdminProductForm from '../admin/components/AdminProductForm'
const AdminProductFormPage = () => {
    return (
        <div>
            <Navbar>
                <AdminProductForm></AdminProductForm>
            </Navbar>

        </div>
    )
}

export default AdminProductFormPage
