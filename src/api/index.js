import axios from 'axios';
import { PokemonByLimit, PokemonById, PokemonGens } from '../config/endpoints';
import { formatGen, formatDesc, isEnglish } from '../helpers/text';

export const getData = async (url) => {
    try {
        console.log(`fetching ${url}`);
        const { data } = await axios.get(url);
        return data;
    } catch (err) {
        throw err;
    }
};

export const getPokemonByGen = async (offset, limit) => {
    try {
        console.log(`fetching pokemon by offset=${offset}&limit=${limit}`);
        const { data } = await axios.get(PokemonByLimit(offset, limit));
        return data;
    } catch (err) {
        throw err;
    }
};

export const getPokemon = async (offset, limit) => {
    try {
        console.log(`fetching pokemon...`);
        const pokemons = await getPokemonByGen(offset, limit);
        const pokemonPromises = pokemons.map((p) => getData(p.url));
        return await Promise.all(pokemonPromises);
    } catch (err) {
        throw err;
    }
};

export const getPokemonById = async (id) => {
    try {
        console.log(`fetching pokemon id: ${id}...`);
        const res = await getData(PokemonById(id));
        return res;
    } catch (err) {
        throw err;
    }
};

export const getGenOptions = async () => {
    try {
        console.log('fetching gen options...');
        const generations = await getData(PokemonGens());
        return generations.results.map((g, i) => {
            let num = i++;
            if (num !== 0 && num <= 7) {
                return formatGen(g.name) + ' ' + num;
            } else {
                return undefined;
            }
        }).filter((g) => g !== undefined);
    } catch (err) {
        throw err;
    }
};

export const getPokeDesc = async (pokemon) => {
    try {
        console.log('fetching pokemon description...');
        const descriptions = await getData(pokemon.species.url);
        return descriptions.flavor_text_entries.map((f) => {
            if (f.language.name === 'en') {
                return formatDesc(f.flavor_text);
            } else {
                return undefined;
            }
        }).filter(f => !isEnglish(f) && f !== undefined).shift();
    } catch (err) {
        throw err;
    }
};

export const getPokeDescFromData = async (pokemon) => {
    try {
        console.log('fetching pokemon description from data...');
        const { url } = pokemon;
        const descriptions = await getData(url);
        return descriptions.flavor_text_entries.map((f) => {
            if (f.language.name === 'en') {
                return formatDesc(f.flavor_text);
            } else {
                return undefined;
            }
        }).filter(f => !isEnglish(f) && f !== undefined).shift();
    } catch (err) {
        throw err;
    }
};

export const getPokeDescFromUrl = async (url) => {
    try {
        console.log('fetching pokemon description from url...');
        const descriptions = await getData(url);
        return descriptions.flavor_text_entries.map((f) => {
            if (f.language.name === 'en') {
                return formatDesc(f.flavor_text);
            } else {
                return undefined;
            }
        }).filter(f => !isEnglish(f) && f !== undefined).shift();
    } catch (err) {
        throw err;
    }
};

export const sleep = async (milliseconds) => {
    try {
        console.log(`sleeping for ${milliseconds} milliseconds...`);
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    } catch (err) {
        throw err;
    }
};