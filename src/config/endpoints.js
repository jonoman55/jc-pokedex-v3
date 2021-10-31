// https://pokeapi.co/docs/v2
export const PokemonByLimit = (offset, limit) =>
  `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

export const PokemonGens = () =>
  `https://pokeapi.co/api/v2/generation`

export const PokemonById = (id) =>
  `https://pokeapi.co/api/v2/pokemon/${id}`;

export const PokemonByName = (name) =>
  `https://pokeapi.co/api/v2/pokemon/${name}`;

export const PokemonDescription = (id) =>
  `https://pokeapi.co/api/v2/pokemon-species/${id}`;

export const PokemonSprite = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const PokemonOfficialArt = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const PokemonDreamWorldSprite = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`

export const PokemonImage = (id) =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;