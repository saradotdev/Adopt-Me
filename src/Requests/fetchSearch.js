async function fetchSearch({ queryKey }) {
    const { animal, location, breed, page } = queryKey[1]; // can pass an object too as a queryKey
    const response = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${page}`
    );

    if (!response.ok) {
        throw new Error(
            `${animal}, ${location}, ${breed}, ${page} fetch not ok`
        );
    }

    return response.json();
}

export default fetchSearch;
