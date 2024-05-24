import React from 'react'
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = React.useState('')

    const handleSearch = (event) => {
        event.preventDefault()
        onSearch(query)
    }

    return (
        <Form inline onSubmit={handleSearch} className='d-flex'>
            <InputGroup>
                <InputGroup.Text id="basic-addon1">
                    <i className="bi bi-search"></i>
                </InputGroup.Text>
                <FormControl
                type="text"
                placeholder="Search"
                className="mr-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
            </InputGroup>
            <Button type="submit" style={{marginLeft: '10px'}}>Search</Button>
        </Form>
    )
}

export default SearchBar
