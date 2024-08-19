import Weather from "./Weather";

const Country = ({ country }) => {
    if (!country) {
        return <p>No country data available.</p>;
    }
    return (
        <>
            <h2><strong>{country.name.common}</strong></h2>
            <p>Capital: {country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'}</p>
            <p>Area: {country.area} km²</p>
            <p>Languages:</p>
            <ul>
                {country.languages ? (
                    Object.values(country.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                    ))
                ) : (
                    <li>No languages available</li>
                )}
            </ul>
            <img 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`} 
                height="100px" 
                width="100px" 
            />
            <Weather city={country.name.common} />

        </>
    );
}

export default Country;
