import React from 'react'
import Navbar from '../navbar/Navbar'
import Product from '../product-list/components/ProductList'
import { Footer } from '../common/Footer'

const Home = () => {
    return (
        <div>
            <Navbar>
                <Product></Product>
            </Navbar>
            <Footer></Footer>
        </div>
    )
}

export default Home
