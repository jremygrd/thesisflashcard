import React, { useState, Component } from 'react';
import CatInputs from './CatInput.tsx';

    const Form = (cardsData : any,number : any) => {
        
        const [ownerState, setOwnerState] = useState({
            owner: cardsData ? cardsData.children[1].question:"loading",
            description: cardsData ? cardsData.children[1].tip:"loading",
        });

    const handleOwnerChange = (e : any) => setOwnerState({
        ...ownerState,
        [e.target.name]: [e.target.value],
    });

    const blankCat = { name: '', age: '' };
    const [catState, setCatState] = useState([
        { ...blankCat },
    ]);

    const addCat = () => {
        setCatState([...catState, { ...blankCat }]);
    };

    const handleCatChange = (e) => {
        const updatedCats = [...catState];
        updatedCats[e.target.dataset.idx][e.target.className] = e.target.value;
        setCatState(updatedCats);
    };
    console.log(cardsData);
    return (
        <form key = {cardsData}>
            <label htmlFor="owner">Owner</label>
            <input
                type="text"
                name="owner"
                id="owner"
                value={cardsData.children[number] ? cardsData.children[number].question : "loading"}
                onChange={handleOwnerChange}
            />
            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
                //value={ownerState.description}
                onChange={handleOwnerChange}
            />
            <input
                type="button"
                value="Add New Cat"
                onClick={addCat}
            />
            {
                catState.map((val, idx) => (
                    <CatInputs
                        key={`cat-${idx}`}
                        idx={idx}
                        catState={catState}
                        handleCatChange={handleCatChange}
                        
                    />
                ))
            }
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Form;