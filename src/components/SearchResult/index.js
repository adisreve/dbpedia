import React, { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const SearchResult = props => {
    const [ wikiData, setWikiData ] = useState({
        name: null,
        thumbnail: null,
        description: null
    });
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);

    // Manipulate the query parameter for api usage
    const validateQuery = queryParam => {
        let query = queryParam.split(' ');
        return query.map(q => q[0].toUpperCase() + q.substring(1).toLowerCase()).join('_');
    }

    useEffect(() => {
        loading ? setLoading(true) : setLoading(false);
        setError(false);

        (async () => {
            if(props.query) {
                let queryParam = validateQuery(props.query);

                try {
                    const data = await fetch(`http://dbpedia.org/data/${queryParam}.json`);
                    const response = await data.json();
    
                    const currentData = response[`http://dbpedia.org/resource/${queryParam}`];
    
                    // Filter out the english abstract/description
                    const [ description ] = currentData['http://dbpedia.org/ontology/abstract']?.filter(v => v.lang === 'en' && v);
                    
                    setWikiData({
                        name: queryParam.split('_').join(' '),
                        thumbnail: currentData['http://dbpedia.org/ontology/thumbnail'][0].value,
                        description: description.value
                    })

                    setLoading(false);
                } catch (err) {
                    console.log(`Couldn't get data for ${props.query}`);
                    setError(true);
                }
            }
        })();
    }, [props.query, loading]);

    return (
        loading ? 
        <div>
            <ClipLoader size={150} color={'#2ca35e'} loading={loading}></ClipLoader>
        </div>
        :
        <div className="query-result">
        {error ?
            <>
            <div className="query-data">
                <p>No results for {props.query}</p>
            </div>
            </>
        :
            <>
            <h1>{wikiData.name}</h1>
            <div className="query-data">
                <img src={wikiData.thumbnail} alt={'Test'}></img>
                <p>{wikiData.description}</p>
            </div>
            </>
        }
        </div>
    )
}

export default SearchResult;
