import Pet from "./Pet";

const Results = ({ pets }) => {
    return (
        <div className="search">
            {
                // using conditional rendering
                // condition ? trueExpression : falseExpression
                !pets.length ? (
                    <h1>No Pets Found</h1>
                ) : (
                    pets.map((pet) => {
                        return (
                            <Pet
                                name={pet.name}
                                animal={pet.animal}
                                breed={pet.breed}
                                images={pet.images}
                                location={`${pet.city}, ${pet.state}`}
                                key={pet.id}
                                /* instead of passing all these attributes we can also do:
                                <Pet {...pet} key={pet.id} /> 
                                this uses spread operator (the three dots), it will work the same
                                but it's not a good approach as it is unclear about what you're passing*/
                            />
                        );
                    })
                )
            }
        </div>
    );
};

export default Results;
