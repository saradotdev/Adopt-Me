const fetchPet = async ({ queryKey }) => {
    const id = queryKey[1];
    /* id will the second index of queryKey prop
    see in Details.jsx where we do useQuery(["details", id], fetchPet) */
    const response = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

    if (!response.ok) {
        throw new Error(`/details/${id} fetch not ok`);
    }

    return response.json(); // no need to do the second await here as we are returning the promise
};

export default fetchPet;
