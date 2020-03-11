import React, { Component } from 'react'
import { Section } from '../../Utils/Utils'
import './Search.css'
import TypeSearch from '../TypeSearch/TypeSearch'
import config from '../../config'
import ProductListContext from '../../contexts/ProductListContext'
export default class Search extends Component {
    static contextType = ProductListContext
    state = {
        error: null
    }

    componentWillUnmount() {
        this.context.clearSearchTerm()
        this.context.clearSearchResults()
    }
    renderTypeOptions() {
        const types = this.props.types
        return (
			//todo how to remove button click for search by radio button?
			<div className="type_options">
				<input
					type="radio"
					id="type-none"
					name="type"
					value=""
					onChange={e => this.props.setType(e.target.value)}
				/>
				<label htmlFor="type-none">None</label>
				{types.map((type, index) => (
					<TypeSearch
						type={type.product_type}
						setType={this.props.setType}
						key={index}
					/>
				))}
			</div>
		);
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const params = [];
        let baseUrl = `${config.API_ENDPOINT}/products`
        
        if(this.context.searchTerm) {
            params.push(`name=${this.context.searchTerm}`);
        }
        if(this.props.type){
            params.push(`type=${this.props.type}`);
        }
        const query = params.join("&");
        const url = `${baseUrl}?${query}`
        fetch(url,{
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                res.json().then(responseJson =>
                    this.props.setError({error: responseJson.error})
					
				);
            }
            return res.json();
        })
        .then(data => {
            this.context.clearSearchTerm()
            this.props.saveSearchResults(data)
        })
        .catch(error => {
            console.error(error)
        })
    }
    
    render() {
        const { error } = this.state
        return (
            <>
			<Section className="SearchSection">
                
				<form className="search__form" onSubmit={e => this.handleSubmit(e)}>
                    <div role="alert">
					    {error && <p className="red">{error}</p>}
                    </div>
					<label htmlFor="search">Search: </label>
					<input type="text" id="search" name="search" onChange={e => this.context.setSearchTerm(e.target.value)}
                    value={this.context.searchTerm}
                    />
					<button type="submit">Search</button>
                    <br/>
                    {this.renderTypeOptions()}
				</form>
			</Section>
            
            </>
		);
    }
}