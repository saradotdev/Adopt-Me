async function fetchBreedList({ queryKey }) {
    const animal = queryKey[1]; // animal will be at index 1

    if (!animal) return []; // if there's no animal, return an empty array

    const response = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );

    if (!response.ok) {
        throw new Error(`/breeds/${animal} fetch not ok`);
    }

    return response.json();
}

export default fetchBreedList;
