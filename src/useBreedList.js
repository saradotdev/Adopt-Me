// useBreedList is a custom hook. Custom hooks are nothing but a bunch of hooks package together. Goal is to have cleaner code.
import { useState, useEffect } from "react";

const localCache = {}; // maintaining a map to store requested breed lists of animals, this is useful incase a previously selected animal gets reselected again, so you won't have to request the API for the breeds again, instead just use the local cache

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded"); // for unloaded, loading, loaded

    useEffect(() => {
        if (!animal) {
            setBreedList([]); // if there's no animal selected, set breed list to an empty array
        } else if (localCache[animal]) {
            setBreedList(localCache[animal]); // if the local cache has the animal's breeds, use them
        } else {
            requestBreedList();
        }

        async function requestBreedList() {
            setBreedList([]);
            setStatus("loading");

            const response = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            );
            const json = await response.json();
            localCache[animal] = json.breeds || [];
            setBreedList(localCache[animal]);
            setStatus("loaded");
        }
    }, [animal]); // we want this effect to run whenever animal changes, so specify animal in dependency array

    return [breedList, status];
}
