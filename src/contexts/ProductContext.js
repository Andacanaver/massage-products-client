import React, { Component } from 'react'

export const nullProduct = {
    one_product: {}
}

const ProductContext = React.createContext({
    product: {},
    setError: () => {},
    clearError: () => {},
    setProduct: () => {},
    clearProduct: () => {},
})
export default ProductContext

export class ProductProvider extends Component{
    state = {
        product: {},
        error: null
    };
    setError = error => {
        this.setState({ error })
    }
    clearError = () => {
        this.setState({ error: null })
    }
    setProduct = product => {
        this.setState( product )
    }
    clearProduct = product => {
        this.setProduct(product)
    }

    render() {
        const value = {
            product: this.state.product,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setProduct: this.setProduct,
            clearProduct: this.clearProduct
        }
        return (
            <ProductContext.Provider value={value}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
