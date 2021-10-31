import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { doc, onSnapshot } from '@firebase/firestore';
import { auth, db } from '../firebase';
import { getPokemonByGen } from '../api';

const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [genNumber, setGenNumber] = useState(9);
    const [genValue, setGenValue] = useState('');
    const [genList, setGenList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokeList, setPokeList] = useState([]);
    const [filteredPokeList, setFilteredPokeList] = useState([]);
    const [filter, setFilter] = useState('');
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const fetchPokemonList = async () => {
        try {
            const pokemon = await getPokemonByGen(0, 12);
            setPokeList(pokemon.results);
            setFilteredPokeList(pokemon.results);   
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPokemonList();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (user) {
            const pokeRef = doc(db, 'favorites', user?.uid);
            var unsubscribe = onSnapshot(pokeRef, (pokemon) => {
                if (pokemon.exists()) {
                    setFavorites(pokemon.data().pokemons);
                } else {
                    console.log('No Pokémon in Favorites');
                }
            });
            return () => {
                unsubscribe();
            };
        }
    }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, [user]);

    const values = {
        genNumber, setGenNumber,
        genValue, setGenValue,
        genList, setGenList,
        isLoading, setIsLoading,
        pokeList, setPokeList,
        filteredPokeList, setFilteredPokeList,
        filter, setFilter,
        favorites, user,
    };

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);