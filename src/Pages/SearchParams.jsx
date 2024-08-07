import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "../Hooks/useBreedList";
import fetchSearch from "../Requests/fetchSearch";
import Results from "../Components/Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    const [requestParams, setRequestParams] = useState({
        animal: "",
        breed: "",
        location: "",
    });

    const results = useQuery(["search", requestParams], fetchSearch); // the queryKey takes the object
    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form
                onSubmit={(e) => {
                    e.preventDefault(); /* prevents the default form submission behaviour, i.e. stops the browser from reloading the page on submitting the form */
                    const formData = new FormData(e.target); // FormData pulls the data from the form
                    const obj = {
                        animal: formData.get("animal") ?? "",
                        breed: formData.get("breed") ?? "",
                        location: formData.get("location") ?? "",
                    };
                    setRequestParams(obj);
                }}
            >
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        name="location"
                        placeholder="Location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        name="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                        }}
                    >
                        <option />
                        {/* an empty option selected for prompting the user to make a selection */}
                        {
                            ANIMALS.map((animal) => (
                                <option key={animal}>{animal}</option>
                            ))
                            /* maps over the ANIMALS array to create an option element for each animal */
                        }
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        name="breed"
                        disabled={
                            breeds.length === 0
                        } /* disables the dropdown when you don't have any breeds, we'll use the API to request breeds based on the animal selected */
                    >
                        <option />
                        {/* an empty option selected for prompting the user to make a selection */}
                        {breeds.map((breed) => (
                            <option key={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>

            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;

/*  If you use useEffect instead of react-query:

import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [pets, setPets] = useState([]);
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [breeds] = useBreedList(animal);

    useEffect(() => {
        requestPets();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
        const response = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await response.json();

        setPets(json.pets);
    }

    return (
        <div className="search-params">
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // prevents the default form submission behaviour, i.e. stops the browser from reloading the page on submitting the form
                    requestPets();
                }}
            >
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                            setBreed("");
                            // for setting the breed back to "nothing" if animal gets reselected 
                        }}
                    >
                        <option />
                        {// an empty option selected for prompting the user to make a selection }
                        {
                            ANIMALS.map((animal) => (
                                <option key={animal}>{animal}</option>
                            ))
                            // maps over the ANIMALS array to create an option element for each animal 
                        }
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        disabled={
                            breeds.length === 0
                        } // disables the dropdown when you don't have any breeds, we'll use the API to request breeds based on the animal selected 
                        onChange={(e) => setBreed(e.target.value)}
                    >
                        <option />
                        {// an empty option selected for prompting the user to make a selection }
                        {breeds.map((breed) => (
                            <option key={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>

            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;
*/
