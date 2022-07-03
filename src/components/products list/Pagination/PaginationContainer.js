import React, { useState, useEffect } from 'react'

function PaginationContainer({ page, setPage, totalPages }) {
    const [input, setInput] = useState(1);
    useEffect(() => {
        setInput(input);
    }, [page])


    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1)
            setInput(page - 1)
        }
    }
    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1)
            setInput(page + 1)
        }
    }

    const handleOnChange = (e) => {
        let inputValue = parseInt(e.target.value);
        setInput(inputValue);

        if (inputValue !== '') {
            if (inputValue > 1 || inputValue < totalPages) {
                setPage(inputValue)
            }
        }
    }

    return (
        <div>
            <div className="pagination-container">
                <div className="pagination-content">
                    <button onClick={prevPage}>&laquo;</button>
                    <input
                        type="number"
                        autoComplete='off'
                        name='current'
                        value={input}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <span> <b>/ {totalPages}</b></span>
                    <button onClick={nextPage}>&raquo;</button>
                </div>
            </div>
        </div>
    )
}

export default PaginationContainer