import React, { Component } from 'react'
import { Section } from '../../Utils/Utils'
import './Search.css'
import TypeSearch from '../TypeSearch/TypeSearch'
import config from '../../config'

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: ""
		};
    }
    setSearchTerm = term => {
        this.setState({
            searchTerm: term,
        })
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
				{types.map(type => (
					<TypeSearch
						key={type.product_type}
						type={type.product_type}
						setType={this.props.setType}
					/>
				))}
                
			</div>
		);
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const params = [];
        let baseUrl = `${config.API_ENDPOINT}/products`
        
        if(this.state.searchTerm) {
            params.push(`name=${this.state.searchTerm}`);
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
            console.log('helooooo')
            return res.json();
        })
        .then(data => {
            console.log(data)
            this.props.saveSearchResults(data);
            
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