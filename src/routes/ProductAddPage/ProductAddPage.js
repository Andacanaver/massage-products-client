import React, { Component } from 'react'
import ProductListContext from '../../contexts/ProductListContext'
import ProductAddForm from '../../components/ProductAddForm/ProductAddForm'
import ProductApiService from '../../services/product-api-service'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import {Section} from '../../Utils/Utils'
import '../../components/ProductAddForm/ProductAddForm.css'
export default class ProductAddPage extends Component {
    static contextType = ProductListContext

    componentDidMount() {
        this.context.clearError();
		ProductApiService.getType()
			.then(data => this.context.setTypes(data))
			.catch(this.context.setError);
    }

    render() {
        const { error } = this.context
        console.log(this.context.types)
        return (
            <ErrorBoundary>
                <Section className='ProductAdd'>
                    {error ? (
						<p className="red">There was an error, try again</p>
					) : (
                        <ProductAddForm types={this.context.types}/>
                    )}
                </Section>
            </ErrorBoundary>
        )
    }
}