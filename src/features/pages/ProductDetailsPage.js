import React from 'react'
import ProductDetails from '../product-list/components/ProductDetails'
import Navbar from '../navbar/Navbar'
import { Footer } from '../common/Footer'

const ProductDetailsPage = () => {
    return (
        <div>
            <Navbar>
                <ProductDetails></ProductDetails>
            </Navbar>
            <Footer></Footer>
        </div>
    )
}

export default ProductDetailsPage
