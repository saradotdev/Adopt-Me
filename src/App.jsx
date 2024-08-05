import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";

const App = () => {
    return (
        <div>
            <h1>Adopt Me!</h1>
            <SearchParams />
        </div>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// If you don't use JSX:

// import React from "react";

// const App = () => {
//     return React.createElement("div", {}, [
//         React.createElement("h1", {}, "Adopt Me!"),
//         React.createElement(Pet, {
//             name: "Luna",
//             animal: "Dog",
//             breed: "Havanese",
//         }),
//         React.createElement(Pet, {
//             name: "Roomie",
//             animal: "Cat",
//             breed: "Persian",
//         }),
//         React.createElement(Pet, {
//             name: "Maggie",
//             animal: "Bird",
//             breed: "Cockatiel",
//         }),
//     ]);
// };

// root.render(React.createElement(App));
