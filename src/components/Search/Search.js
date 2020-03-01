import React, { Component } from 'react'
import { Section } from '../../Utils/Utils'
import './Search.css'
import TypeSearch from '../TypeSearch/TypeSearch'
import config from '../../config'

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",
            type: ''
		};
    }
    setSearchTerm = term => {
        this.setState({
            searchTerm: term,
        })
    }
    setTypeOption = type => {
        this.setState({
            type: type
        })
    }
    filterProducts = () => {
        return (
            this.props.productList.filter(product => product.product_type === this.state.type)
        )
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
					onChange={e => this.setTypeOption(e.target.value)}
				/>
				<label htmlFor="type-none">None</label>
				{types.map(type => (
					<TypeSearch
						key={type.product_type}
						type={type.product_type}
						setType={this.setTypeOption}
					/>
				))}
                
			</div>
		);
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const params = [];
        let baseUrl = `${config.API_ENDPOINT}/products/search`
        if (this.state.searchTerm === '' && this.state.type === '') {
            baseUrl = `${config.API_ENDPOINT}/products`
        } else {
            params.push(`name=${this.state.searchTerm}`);
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
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            this.props.saveSearchResults(data)
        })
        .catch(error => {
            console.error(error)
        })
    }
    
    render() {
        return (
            <>
			<Section className="SearchSection">
				<form className="search__form" onSubmit={e => this.handleSubmit(e)}>
					<label htmlFor="search">Search: </label>
					<input type="text" id="search" name="search" onChange={e => this.setSearchTerm(e.target.value)}/>
					<button type="submit">Search</button>
                    <br/>
                    {this.renderTypeOptions()}
				</form>
			</Section>
            
            </>
		);
    }
}