import { useState, useEffect, useContext } from "react";
import finnHub from "../api/finnHub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const { addStock } = useContext(WatchListContext);

    const renderDropdown = () => {
        const dropDownClass = search ? "show" : "null"
        return (
            <ul className={`dropdown-menu ${dropDownClass}`}
                style={{
                    height: '500px',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    cursor: 'pointer'
                }}>
                {results.map((result) => {
                    return (
                        <li onClick={() => { addStock(result.symbol); setSearch(""); }} className="dropdown-item" key={result.symbol}>{result.description}({result.symbol})</li>
                    )
                })}
            </ul>
        )
    }

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                });
                console.log('my response', response);
                if (isMounted) {
                    setResults(response.data.result)
                }
            } catch (err) {
            }
        }
        if (search.length > 0) {
            fetchData()
        } else {
            setResults([]);
        }
        return () => (isMounted = false)
    }, [search])

    return <div className="w-50 p-5 rounded mx-auto">
        <div className="form-floating dropdown">
            <input style={{ backgroundColor: 'rgba(145,158,171, 0.04)' }} id="search"
                type="text" className="form-control" placeholder="Search" autoComplete="off" value={search}
                onChange={(e) => setSearch(e.target.value)}>

            </input>
            <label htmlFor="search">Search Stocks</label>
            {renderDropdown()}
        </div>
    </div>
}