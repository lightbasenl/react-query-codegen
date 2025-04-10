import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { getApiClient } from "./apiClient";
import type * as T from "./pokApi.schema";

/**
	 * Abilities provide passive effects for Pokémon in battle or in the overworld. Pokémon have multiple possible abilities but can have only one ability at a time. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Ability) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see AbilityListResponse200
	 */
export async function abilityList(
	props: T.AbilityListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.AbilityListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/ability/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.AbilityListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Abilities provide passive effects for Pokémon in battle or in the overworld. Pokémon have multiple possible abilities but can have only one ability at a time. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Ability) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see AbilityRetrieveResponse200
 */
export async function abilityRetrieve(
	props: T.AbilityRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.AbilityRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/ability/${data.id}/`;
	const res = await apiClient.get<T.AbilityRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List berries
	 * Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokémon. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Berry) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see BerryListResponse200
	 */
export async function berryList(
	props: T.BerryListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.BerryListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/berry/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.BerryListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get a berry
 * Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokémon. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Berry) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see BerryRetrieveResponse200
 */
export async function berryRetrieve(
	props: T.BerryRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.BerryRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/berry/${data.id}/`;
	const res = await apiClient.get<T.BerryRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List berry firmness
	 * Berries can be soft or hard. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Category:Berries_by_firmness) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see BerryFirmnessListResponse200
	 */
export async function berryFirmnessList(
	props: T.BerryFirmnessListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.BerryFirmnessListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/berry-firmness/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.BerryFirmnessListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get berry by firmness
 * Berries can be soft or hard. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Category:Berries_by_firmness) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see BerryFirmnessRetrieveResponse200
 */
export async function berryFirmnessRetrieve(
	props: T.BerryFirmnessRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.BerryFirmnessRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/berry-firmness/${data.id}/`;
	const res = await apiClient.get<T.BerryFirmnessRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List berry flavors
	 * Flavors determine whether a Pokémon will benefit or suffer from eating a berry based on their **nature**. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Flavor) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see BerryFlavorListResponse200
	 */
export async function berryFlavorList(
	props: T.BerryFlavorListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.BerryFlavorListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/berry-flavor/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.BerryFlavorListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get berries by flavor
 * Flavors determine whether a Pokémon will benefit or suffer from eating a berry based on their **nature**. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Flavor) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see BerryFlavorRetrieveResponse200
 */
export async function berryFlavorRetrieve(
	props: T.BerryFlavorRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.BerryFlavorRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/berry-flavor/${data.id}/`;
	const res = await apiClient.get<T.BerryFlavorRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List charecterictics
	 * Characteristics indicate which stat contains a Pokémon's highest IV. A Pokémon's Characteristic is determined by the remainder of its highest IV divided by 5 (gene_modulo). Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Characteristic) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see CharacteristicListResponse200
	 */
export async function characteristicList(
	props: T.CharacteristicListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.CharacteristicListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/characteristic/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.CharacteristicListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get characteristic
 * Characteristics indicate which stat contains a Pokémon's highest IV. A Pokémon's Characteristic is determined by the remainder of its highest IV divided by 5 (gene_modulo). Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Characteristic) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see CharacteristicRetrieveResponse200
 */
export async function characteristicRetrieve(
	props: T.CharacteristicRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.CharacteristicRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/characteristic/${data.id}/`;
	const res = await apiClient.get<T.CharacteristicRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List contest types
	 * Contest types are categories judges used to weigh a Pokémon's condition in Pokémon contests. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Contest_condition) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see ContestTypeListResponse200
	 */
export async function contestTypeList(
	props: T.ContestTypeListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ContestTypeListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/contest-type/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.ContestTypeListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get contest type
 * Contest types are categories judges used to weigh a Pokémon's condition in Pokémon contests. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Contest_condition) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see ContestTypeRetrieveResponse200
 */
export async function contestTypeRetrieve(
	props: T.ContestTypeRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ContestTypeRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/contest-type/${data.id}/`;
	const res = await apiClient.get<T.ContestTypeRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List contest effects
	 * Contest effects refer to the effects of moves when used in contests.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see ContestEffectListResponse200
	 */
export async function contestEffectList(
	props: T.ContestEffectListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ContestEffectListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/contest-effect/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.ContestEffectListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get contest effect
 * Contest effects refer to the effects of moves when used in contests.
 * @param params.id - This parameter can be a string or an integer.
 * @see ContestEffectRetrieveResponse200
 */
export async function contestEffectRetrieve(
	props: T.ContestEffectRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ContestEffectRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/contest-effect/${data.id}/`;
	const res = await apiClient.get<T.ContestEffectRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List egg groups
	 * Egg Groups are categories which determine which Pokémon are able to interbreed. Pokémon may belong to either one or two Egg Groups. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Egg_Group) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see EggGroupListResponse200
	 */
export async function eggGroupList(
	props: T.EggGroupListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EggGroupListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/egg-group/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.EggGroupListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get egg group
 * Egg Groups are categories which determine which Pokémon are able to interbreed. Pokémon may belong to either one or two Egg Groups. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Egg_Group) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see EggGroupRetrieveResponse200
 */
export async function eggGroupRetrieve(
	props: T.EggGroupRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EggGroupRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/egg-group/${data.id}/`;
	const res = await apiClient.get<T.EggGroupRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List encounter methods
	 * Methods by which the player might can encounter Pokémon in the wild, e.g., walking in tall grass. Check out Bulbapedia for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see EncounterMethodListResponse200
	 */
export async function encounterMethodList(
	props: T.EncounterMethodListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EncounterMethodListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/encounter-method/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.EncounterMethodListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get encounter method
 * Methods by which the player might can encounter Pokémon in the wild, e.g., walking in tall grass. Check out Bulbapedia for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see EncounterMethodRetrieveResponse200
 */
export async function encounterMethodRetrieve(
	props: T.EncounterMethodRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EncounterMethodRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/encounter-method/${data.id}/`;
	const res = await apiClient.get<T.EncounterMethodRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List encounter conditions
	 * Conditions which affect what pokemon might appear in the wild, e.g., day or night.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see EncounterConditionListResponse200
	 */
export async function encounterConditionList(
	props: T.EncounterConditionListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EncounterConditionListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/encounter-condition/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.EncounterConditionListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get encounter condition
 * Conditions which affect what pokemon might appear in the wild, e.g., day or night.
 * @param params.id - This parameter can be a string or an integer.
 * @see EncounterConditionRetrieveResponse200
 */
export async function encounterConditionRetrieve(
	props: T.EncounterConditionRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EncounterConditionRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/encounter-condition/${data.id}/`;
	const res = await apiClient.get<T.EncounterConditionRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List encounter condition values
	 * Encounter condition values are the various states that an encounter condition can have, i.e., time of day can be either day or night.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see EncounterConditionValueListResponse200
	 */
export async function encounterConditionValueList(
	props: T.EncounterConditionValueListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EncounterConditionValueListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/encounter-condition-value/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.EncounterConditionValueListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get encounter condition value
 * Encounter condition values are the various states that an encounter condition can have, i.e., time of day can be either day or night.
 * @param params.id - This parameter can be a string or an integer.
 * @see EncounterConditionValueRetrieveResponse200
 */
export async function encounterConditionValueRetrieve(
	props: T.EncounterConditionValueRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EncounterConditionValueRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/encounter-condition-value/${data.id}/`;
	const res = await apiClient.get<T.EncounterConditionValueRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List evolution chains
	 * Evolution chains are essentially family trees. They start with the lowest stage within a family and detail evolution conditions for each as well as Pokémon they can evolve into up through the hierarchy.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see EvolutionChainListResponse200
	 */
export async function evolutionChainList(
	props: T.EvolutionChainListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EvolutionChainListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/evolution-chain/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.EvolutionChainListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get evolution chain
 * Evolution chains are essentially family trees. They start with the lowest stage within a family and detail evolution conditions for each as well as Pokémon they can evolve into up through the hierarchy.
 * @param params.id - This parameter can be a string or an integer.
 * @see EvolutionChainRetrieveResponse200
 */
export async function evolutionChainRetrieve(
	props: T.EvolutionChainRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EvolutionChainRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/evolution-chain/${data.id}/`;
	const res = await apiClient.get<T.EvolutionChainRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List evolution triggers
	 * Evolution triggers are the events and conditions that cause a Pokémon to evolve. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see EvolutionTriggerListResponse200
	 */
export async function evolutionTriggerList(
	props: T.EvolutionTriggerListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EvolutionTriggerListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/evolution-trigger/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.EvolutionTriggerListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get evolution trigger
 * Evolution triggers are the events and conditions that cause a Pokémon to evolve. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see EvolutionTriggerRetrieveResponse200
 */
export async function evolutionTriggerRetrieve(
	props: T.EvolutionTriggerRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.EvolutionTriggerRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/evolution-trigger/${data.id}/`;
	const res = await apiClient.get<T.EvolutionTriggerRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List genrations
	 * A generation is a grouping of the Pokémon games that separates them based on the Pokémon they include. In each generation, a new set of Pokémon, Moves, Abilities and Types that did not exist in the previous generation are released.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see GenerationListResponse200
	 */
export async function generationList(
	props: T.GenerationListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.GenerationListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/generation/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.GenerationListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get genration
 * A generation is a grouping of the Pokémon games that separates them based on the Pokémon they include. In each generation, a new set of Pokémon, Moves, Abilities and Types that did not exist in the previous generation are released.
 * @param params.id - This parameter can be a string or an integer.
 * @see GenerationRetrieveResponse200
 */
export async function generationRetrieve(
	props: T.GenerationRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.GenerationRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/generation/${data.id}/`;
	const res = await apiClient.get<T.GenerationRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List genders
	 * Genders were introduced in Generation II for the purposes of breeding Pokémon but can also result in visual differences or even different evolutionary lines. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Gender) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see GenderListResponse200
	 */
export async function genderList(
	props: T.GenderListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.GenderListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/gender/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.GenderListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get gender
 * Genders were introduced in Generation II for the purposes of breeding Pokémon but can also result in visual differences or even different evolutionary lines. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Gender) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see GenderRetrieveResponse200
 */
export async function genderRetrieve(
	props: T.GenderRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.GenderRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/gender/${data.id}/`;
	const res = await apiClient.get<T.GenderRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List growth rates
	 * Growth rates are the speed with which Pokémon gain levels through experience. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Experience) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see GrowthRateListResponse200
	 */
export async function growthRateList(
	props: T.GrowthRateListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.GrowthRateListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/growth-rate/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.GrowthRateListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get growth rate
 * Growth rates are the speed with which Pokémon gain levels through experience. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Experience) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see GrowthRateRetrieveResponse200
 */
export async function growthRateRetrieve(
	props: T.GrowthRateRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.GrowthRateRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/growth-rate/${data.id}/`;
	const res = await apiClient.get<T.GrowthRateRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List items
	 * An item is an object in the games which the player can pick up, keep in their bag, and use in some manner. They have various uses, including healing, powering up, helping catch Pokémon, or to access a new area.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see ItemListResponse200
	 */
export async function itemList(
	props: T.ItemListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/item/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.ItemListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get item
 * An item is an object in the games which the player can pick up, keep in their bag, and use in some manner. They have various uses, including healing, powering up, helping catch Pokémon, or to access a new area.
 * @param params.id - This parameter can be a string or an integer.
 * @see ItemRetrieveResponse200
 */
export async function itemRetrieve(
	props: T.ItemRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/item/${data.id}/`;
	const res = await apiClient.get<T.ItemRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List item categories
	 * Item categories determine where items will be placed in the players bag.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see ItemCategoryListResponse200
	 */
export async function itemCategoryList(
	props: T.ItemCategoryListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemCategoryListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/item-category/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.ItemCategoryListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get item category
 * Item categories determine where items will be placed in the players bag.
 * @param params.id - This parameter can be a string or an integer.
 * @see ItemCategoryRetrieveResponse200
 */
export async function itemCategoryRetrieve(
	props: T.ItemCategoryRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemCategoryRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/item-category/${data.id}/`;
	const res = await apiClient.get<T.ItemCategoryRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List item attributes
	 * Item attributes define particular aspects of items, e.g."usable in battle" or "consumable".
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see ItemAttributeListResponse200
	 */
export async function itemAttributeList(
	props: T.ItemAttributeListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemAttributeListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/item-attribute/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.ItemAttributeListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get item attribute
 * Item attributes define particular aspects of items, e.g."usable in battle" or "consumable".
 * @param params.id - This parameter can be a string or an integer.
 * @see ItemAttributeRetrieveResponse200
 */
export async function itemAttributeRetrieve(
	props: T.ItemAttributeRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemAttributeRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/item-attribute/${data.id}/`;
	const res = await apiClient.get<T.ItemAttributeRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List item fling effects
	 * The various effects of the move"Fling" when used with different items.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see ItemFlingEffectListResponse200
	 */
export async function itemFlingEffectList(
	props: T.ItemFlingEffectListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemFlingEffectListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/item-fling-effect/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.ItemFlingEffectListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get item fling effect
 * The various effects of the move"Fling" when used with different items.
 * @param params.id - This parameter can be a string or an integer.
 * @see ItemFlingEffectRetrieveResponse200
 */
export async function itemFlingEffectRetrieve(
	props: T.ItemFlingEffectRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemFlingEffectRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/item-fling-effect/${data.id}/`;
	const res = await apiClient.get<T.ItemFlingEffectRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List item pockets
	 * Pockets within the players bag used for storing items by category.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see ItemPocketListResponse200
	 */
export async function itemPocketList(
	props: T.ItemPocketListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemPocketListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/item-pocket/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.ItemPocketListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get item pocket
 * Pockets within the players bag used for storing items by category.
 * @param params.id - This parameter can be a string or an integer.
 * @see ItemPocketRetrieveResponse200
 */
export async function itemPocketRetrieve(
	props: T.ItemPocketRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.ItemPocketRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/item-pocket/${data.id}/`;
	const res = await apiClient.get<T.ItemPocketRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List languages
	 * Languages for translations of API resource information.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see LanguageListResponse200
	 */
export async function languageList(
	props: T.LanguageListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.LanguageListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/language/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.LanguageListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get language
 * Languages for translations of API resource information.
 * @param params.id - This parameter can be a string or an integer.
 * @see LanguageRetrieveResponse200
 */
export async function languageRetrieve(
	props: T.LanguageRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.LanguageRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/language/${data.id}/`;
	const res = await apiClient.get<T.LanguageRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List locations
	 * Locations that can be visited within the games. Locations make up sizable portions of regions, like cities or routes.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see LocationListResponse200
	 */
export async function locationList(
	props: T.LocationListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.LocationListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/location/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.LocationListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get location
 * Locations that can be visited within the games. Locations make up sizable portions of regions, like cities or routes.
 * @param params.id - This parameter can be a string or an integer.
 * @see LocationRetrieveResponse200
 */
export async function locationRetrieve(
	props: T.LocationRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.LocationRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/location/${data.id}/`;
	const res = await apiClient.get<T.LocationRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * List location areas
 * Location areas are sections of areas, such as floors in a building or cave. Each area has its own set of possible Pokémon encounters.
 * @param query.limit - Number of results to return per page.
 * @param query.offset - The initial index from which to return the results.
 * @see LocationAreaListResponse200
 */
export async function locationAreaList(
	props: T.LocationAreaListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.LocationAreaListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/location-area/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.LocationAreaListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get location area
 * Location areas are sections of areas, such as floors in a building or cave. Each area has its own set of possible Pokémon encounters.
 * @param params.id - A unique integer value identifying this location area.
 * @see LocationAreaRetrieveResponse200
 */
export async function locationAreaRetrieve(
	props: T.LocationAreaRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.LocationAreaRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/location-area/${data.id}/`;
	const res = await apiClient.get<T.LocationAreaRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List machines
	 * Machines are the representation of items that teach moves to Pokémon. They vary from version to version, so it is not certain that one specific TM or HM corresponds to a single Machine.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see MachineListResponse200
	 */
export async function machineList(
	props: T.MachineListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MachineListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/machine/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.MachineListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get machine
 * Machines are the representation of items that teach moves to Pokémon. They vary from version to version, so it is not certain that one specific TM or HM corresponds to a single Machine.
 * @param params.id - This parameter can be a string or an integer.
 * @see MachineRetrieveResponse200
 */
export async function machineRetrieve(
	props: T.MachineRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MachineRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/machine/${data.id}/`;
	const res = await apiClient.get<T.MachineRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List moves
	 * Moves are the skills of Pokémon in battle. In battle, a Pokémon uses one move each turn. Some moves (including those learned by Hidden Machine) can be used outside of battle as well, usually for the purpose of removing obstacles or exploring new areas.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see MoveListResponse200
	 */
export async function moveList(
	props: T.MoveListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/move/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.MoveListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get move
 * Moves are the skills of Pokémon in battle. In battle, a Pokémon uses one move each turn. Some moves (including those learned by Hidden Machine) can be used outside of battle as well, usually for the purpose of removing obstacles or exploring new areas.
 * @param params.id - This parameter can be a string or an integer.
 * @see MoveRetrieveResponse200
 */
export async function moveRetrieve(
	props: T.MoveRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/move/${data.id}/`;
	const res = await apiClient.get<T.MoveRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List move meta ailments
	 * Move Ailments are status conditions caused by moves used during battle. See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Status_condition) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see MoveAilmentListResponse200
	 */
export async function moveAilmentList(
	props: T.MoveAilmentListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveAilmentListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/move-ailment/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.MoveAilmentListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get move meta ailment
 * Move Ailments are status conditions caused by moves used during battle. See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Status_condition) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see MoveAilmentRetrieveResponse200
 */
export async function moveAilmentRetrieve(
	props: T.MoveAilmentRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveAilmentRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/move-ailment/${data.id}/`;
	const res = await apiClient.get<T.MoveAilmentRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List move battle styles
	 * Styles of moves when used in the Battle Palace. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Battle_Frontier_(Generation_III)) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see MoveBattleStyleListResponse200
	 */
export async function moveBattleStyleList(
	props: T.MoveBattleStyleListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveBattleStyleListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/move-battle-style/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.MoveBattleStyleListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get move battle style
 * Styles of moves when used in the Battle Palace. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Battle_Frontier_(Generation_III)) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see MoveBattleStyleRetrieveResponse200
 */
export async function moveBattleStyleRetrieve(
	props: T.MoveBattleStyleRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveBattleStyleRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/move-battle-style/${data.id}/`;
	const res = await apiClient.get<T.MoveBattleStyleRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List move meta categories
	 * Very general categories that loosely group move effects.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see MoveCategoryListResponse200
	 */
export async function moveCategoryList(
	props: T.MoveCategoryListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveCategoryListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/move-category/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.MoveCategoryListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get move meta category
 * Very general categories that loosely group move effects.
 * @param params.id - This parameter can be a string or an integer.
 * @see MoveCategoryRetrieveResponse200
 */
export async function moveCategoryRetrieve(
	props: T.MoveCategoryRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveCategoryRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/move-category/${data.id}/`;
	const res = await apiClient.get<T.MoveCategoryRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List move damage classes
	 * Damage classes moves can have, e.g. physical, special, or non-damaging.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see MoveDamageClassListResponse200
	 */
export async function moveDamageClassList(
	props: T.MoveDamageClassListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveDamageClassListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/move-damage-class/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.MoveDamageClassListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get move damage class
 * Damage classes moves can have, e.g. physical, special, or non-damaging.
 * @param params.id - This parameter can be a string or an integer.
 * @see MoveDamageClassRetrieveResponse200
 */
export async function moveDamageClassRetrieve(
	props: T.MoveDamageClassRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveDamageClassRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/move-damage-class/${data.id}/`;
	const res = await apiClient.get<T.MoveDamageClassRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List move learn methods
	 * Methods by which Pokémon can learn moves.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see MoveLearnMethodListResponse200
	 */
export async function moveLearnMethodList(
	props: T.MoveLearnMethodListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveLearnMethodListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/move-learn-method/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.MoveLearnMethodListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get move learn method
 * Methods by which Pokémon can learn moves.
 * @param params.id - This parameter can be a string or an integer.
 * @see MoveLearnMethodRetrieveResponse200
 */
export async function moveLearnMethodRetrieve(
	props: T.MoveLearnMethodRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveLearnMethodRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/move-learn-method/${data.id}/`;
	const res = await apiClient.get<T.MoveLearnMethodRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List move targets
	 * Targets moves can be directed at during battle. Targets can be Pokémon, environments or even other moves.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see MoveTargetListResponse200
	 */
export async function moveTargetList(
	props: T.MoveTargetListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveTargetListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/move-target/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.MoveTargetListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get move target
 * Targets moves can be directed at during battle. Targets can be Pokémon, environments or even other moves.
 * @param params.id - This parameter can be a string or an integer.
 * @see MoveTargetRetrieveResponse200
 */
export async function moveTargetRetrieve(
	props: T.MoveTargetRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.MoveTargetRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/move-target/${data.id}/`;
	const res = await apiClient.get<T.MoveTargetRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List natures
	 * Natures influence how a Pokémon's stats grow. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Nature) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see NatureListResponse200
	 */
export async function natureList(
	props: T.NatureListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.NatureListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/nature/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.NatureListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get nature
 * Natures influence how a Pokémon's stats grow. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Nature) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see NatureRetrieveResponse200
 */
export async function natureRetrieve(
	props: T.NatureRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.NatureRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/nature/${data.id}/`;
	const res = await apiClient.get<T.NatureRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List pal park areas
	 * Areas used for grouping Pokémon encounters in Pal Park. They're like habitats that are specific to Pal Park.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see PalParkAreaListResponse200
	 */
export async function palParkAreaList(
	props: T.PalParkAreaListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PalParkAreaListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/pal-park-area/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.PalParkAreaListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pal park area
 * Areas used for grouping Pokémon encounters in Pal Park. They're like habitats that are specific to Pal Park.
 * @param params.id - This parameter can be a string or an integer.
 * @see PalParkAreaRetrieveResponse200
 */
export async function palParkAreaRetrieve(
	props: T.PalParkAreaRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PalParkAreaRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pal-park-area/${data.id}/`;
	const res = await apiClient.get<T.PalParkAreaRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List pokedex
	 * A Pokédex is a handheld electronic encyclopedia device; one which is capable of recording and retaining information of the various Pokémon in a given region with the exception of the national dex and some smaller dexes related to portions of a region. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pokedex) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see PokedexListResponse200
	 */
export async function pokedexList(
	props: T.PokedexListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokedexListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/pokedex/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.PokedexListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pokedex
 * A Pokédex is a handheld electronic encyclopedia device; one which is capable of recording and retaining information of the various Pokémon in a given region with the exception of the national dex and some smaller dexes related to portions of a region. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pokedex) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see PokedexRetrieveResponse200
 */
export async function pokedexRetrieve(
	props: T.PokedexRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokedexRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pokedex/${data.id}/`;
	const res = await apiClient.get<T.PokedexRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List pokemon
	 * Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon. Each Pokémon belongs to a specific species but may take on a variant which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see PokemonListResponse200
	 */
export async function pokemonList(
	props: T.PokemonListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/pokemon/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.PokemonListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pokemon
 * Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon. Each Pokémon belongs to a specific species but may take on a variant which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see PokemonRetrieveResponse200
 */
export async function pokemonRetrieve(
	props: T.PokemonRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pokemon/${data.id}/`;
	const res = await apiClient.get<T.PokemonRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List pokemon colors
	 * Colors used for sorting Pokémon in a Pokédex. The color listed in the Pokédex is usually the color most apparent or covering each Pokémon's body. No orange category exists; Pokémon that are primarily orange are listed as red or brown.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see PokemonColorListResponse200
	 */
export async function pokemonColorList(
	props: T.PokemonColorListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonColorListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/pokemon-color/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.PokemonColorListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pokemon color
 * Colors used for sorting Pokémon in a Pokédex. The color listed in the Pokédex is usually the color most apparent or covering each Pokémon's body. No orange category exists; Pokémon that are primarily orange are listed as red or brown.
 * @param params.id - This parameter can be a string or an integer.
 * @see PokemonColorRetrieveResponse200
 */
export async function pokemonColorRetrieve(
	props: T.PokemonColorRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonColorRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pokemon-color/${data.id}/`;
	const res = await apiClient.get<T.PokemonColorRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List pokemon forms
	 * Some Pokémon may appear in one of multiple, visually different forms. These differences are purely cosmetic. For variations within a Pokémon species, which do differ in more than just visuals, the 'Pokémon' entity is used to represent such a variety.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see PokemonFormListResponse200
	 */
export async function pokemonFormList(
	props: T.PokemonFormListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonFormListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/pokemon-form/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.PokemonFormListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pokemon form
 * Some Pokémon may appear in one of multiple, visually different forms. These differences are purely cosmetic. For variations within a Pokémon species, which do differ in more than just visuals, the 'Pokémon' entity is used to represent such a variety.
 * @param params.id - This parameter can be a string or an integer.
 * @see PokemonFormRetrieveResponse200
 */
export async function pokemonFormRetrieve(
	props: T.PokemonFormRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonFormRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pokemon-form/${data.id}/`;
	const res = await apiClient.get<T.PokemonFormRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List pokemom habitas
	 * Habitats are generally different terrain Pokémon can be found in but can also be areas designated for rare or legendary Pokémon.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see PokemonHabitatListResponse200
	 */
export async function pokemonHabitatList(
	props: T.PokemonHabitatListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonHabitatListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/pokemon-habitat/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.PokemonHabitatListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pokemom habita
 * Habitats are generally different terrain Pokémon can be found in but can also be areas designated for rare or legendary Pokémon.
 * @param params.id - This parameter can be a string or an integer.
 * @see PokemonHabitatRetrieveResponse200
 */
export async function pokemonHabitatRetrieve(
	props: T.PokemonHabitatRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonHabitatRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pokemon-habitat/${data.id}/`;
	const res = await apiClient.get<T.PokemonHabitatRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List pokemon shapes
	 * Shapes used for sorting Pokémon in a Pokédex.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see PokemonShapeListResponse200
	 */
export async function pokemonShapeList(
	props: T.PokemonShapeListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonShapeListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/pokemon-shape/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.PokemonShapeListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pokemon shape
 * Shapes used for sorting Pokémon in a Pokédex.
 * @param params.id - This parameter can be a string or an integer.
 * @see PokemonShapeRetrieveResponse200
 */
export async function pokemonShapeRetrieve(
	props: T.PokemonShapeRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonShapeRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pokemon-shape/${data.id}/`;
	const res = await apiClient.get<T.PokemonShapeRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List pokemon species
	 * A Pokémon Species forms the basis for at least one Pokémon. Attributes of a Pokémon species are shared across all varieties of Pokémon within the species. A good example is Wormadam; Wormadam is the species which can be found in three different varieties, Wormadam-Trash, Wormadam-Sandy and Wormadam-Plant.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see PokemonSpeciesListResponse200
	 */
export async function pokemonSpeciesList(
	props: T.PokemonSpeciesListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonSpeciesListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/pokemon-species/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.PokemonSpeciesListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pokemon species
 * A Pokémon Species forms the basis for at least one Pokémon. Attributes of a Pokémon species are shared across all varieties of Pokémon within the species. A good example is Wormadam; Wormadam is the species which can be found in three different varieties, Wormadam-Trash, Wormadam-Sandy and Wormadam-Plant.
 * @param params.id - This parameter can be a string or an integer.
 * @see PokemonSpeciesRetrieveResponse200
 */
export async function pokemonSpeciesRetrieve(
	props: T.PokemonSpeciesRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonSpeciesRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pokemon-species/${data.id}/`;
	const res = await apiClient.get<T.PokemonSpeciesRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List pokeathlon stats
	 * Pokeathlon Stats are different attributes of a Pokémon's performance in Pokéathlons. In Pokéathlons, competitions happen on different courses; one for each of the different Pokéathlon stats. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9athlon) for greater detail.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see PokeathlonStatListResponse200
	 */
export async function pokeathlonStatList(
	props: T.PokeathlonStatListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokeathlonStatListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/pokeathlon-stat/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.PokeathlonStatListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pokeathlon stat
 * Pokeathlon Stats are different attributes of a Pokémon's performance in Pokéathlons. In Pokéathlons, competitions happen on different courses; one for each of the different Pokéathlon stats. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9athlon) for greater detail.
 * @param params.id - This parameter can be a string or an integer.
 * @see PokeathlonStatRetrieveResponse200
 */
export async function pokeathlonStatRetrieve(
	props: T.PokeathlonStatRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokeathlonStatRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pokeathlon-stat/${data.id}/`;
	const res = await apiClient.get<T.PokeathlonStatRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List regions
	 * A region is an organized area of the Pokémon world. Most often, the main difference between regions is the species of Pokémon that can be encountered within them.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see RegionListResponse200
	 */
export async function regionList(
	props: T.RegionListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.RegionListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/region/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.RegionListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get region
 * A region is an organized area of the Pokémon world. Most often, the main difference between regions is the species of Pokémon that can be encountered within them.
 * @param params.id - This parameter can be a string or an integer.
 * @see RegionRetrieveResponse200
 */
export async function regionRetrieve(
	props: T.RegionRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.RegionRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/region/${data.id}/`;
	const res = await apiClient.get<T.RegionRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List stats
	 * Stats determine certain aspects of battles. Each Pokémon has a value for each stat which grows as they gain levels and can be altered momentarily by effects in battles.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see StatListResponse200
	 */
export async function statList(
	props: T.StatListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.StatListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/stat/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.StatListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get stat
 * Stats determine certain aspects of battles. Each Pokémon has a value for each stat which grows as they gain levels and can be altered momentarily by effects in battles.
 * @param params.id - This parameter can be a string or an integer.
 * @see StatRetrieveResponse200
 */
export async function statRetrieve(
	props: T.StatRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.StatRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/stat/${data.id}/`;
	const res = await apiClient.get<T.StatRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List super contest effects
	 * Super contest effects refer to the effects of moves when used in super contests.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see SuperContestEffectListResponse200
	 */
export async function superContestEffectList(
	props: T.SuperContestEffectListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.SuperContestEffectListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/super-contest-effect/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.SuperContestEffectListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get super contest effect
 * Super contest effects refer to the effects of moves when used in super contests.
 * @param params.id - This parameter can be a string or an integer.
 * @see SuperContestEffectRetrieveResponse200
 */
export async function superContestEffectRetrieve(
	props: T.SuperContestEffectRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.SuperContestEffectRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/super-contest-effect/${data.id}/`;
	const res = await apiClient.get<T.SuperContestEffectRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List types
	 * Types are properties for Pokémon and their moves. Each type has three properties: which types of Pokémon it is super effective against, which types of Pokémon it is not very effective against, and which types of Pokémon it is completely ineffective against.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see TypeListResponse200
	 */
export async function typeList(
	props: T.TypeListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.TypeListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/type/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.TypeListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get types
 * Types are properties for Pokémon and their moves. Each type has three properties: which types of Pokémon it is super effective against, which types of Pokémon it is not very effective against, and which types of Pokémon it is completely ineffective against.
 * @param params.id - This parameter can be a string or an integer.
 * @see TypeRetrieveResponse200
 */
export async function typeRetrieve(
	props: T.TypeRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.TypeRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/type/${data.id}/`;
	const res = await apiClient.get<T.TypeRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List versions
	 * Versions of the games, e.g., Red, Blue or Yellow.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see VersionListResponse200
	 */
export async function versionList(
	props: T.VersionListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.VersionListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/version/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.VersionListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get version
 * Versions of the games, e.g., Red, Blue or Yellow.
 * @param params.id - This parameter can be a string or an integer.
 * @see VersionRetrieveResponse200
 */
export async function versionRetrieve(
	props: T.VersionRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.VersionRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/version/${data.id}/`;
	const res = await apiClient.get<T.VersionRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
	 * List version groups
	 * Version groups categorize highly similar versions of the games.
	 * @param query.limit - Number of results to return per page.
	 * @param query.offset - The initial index from which to return the results.
	 * @param query.q - > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
	 * @see VersionGroupListResponse200
	 */
export async function versionGroupList(
	props: T.VersionGroupListParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.VersionGroupListResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = "/api/v2/version-group/";
	const queryData = {
		limit: data.limit,
		offset: data.offset,
		q: data.q,
	};
	axiosConfig.params = queryData;
	const res = await apiClient.get<T.VersionGroupListResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get version group
 * Version groups categorize highly similar versions of the games.
 * @param params.id - This parameter can be a string or an integer.
 * @see VersionGroupRetrieveResponse200
 */
export async function versionGroupRetrieve(
	props: T.VersionGroupRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.VersionGroupRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/version-group/${data.id}/`;
	const res = await apiClient.get<T.VersionGroupRetrieveResponse200>(url, axiosConfig);
	return res.data;
}

/**
 * Get pokemon encounter
 * Handles Pokemon Encounters as a sub-resource.
 * @param params.pokemon_id
 * @see PokemonEncountersRetrieveResponse200
 */
export async function pokemonEncountersRetrieve(
	props: T.PokemonEncountersRetrieveParams & { axiosConfig?: AxiosRequestConfig }
): Promise<T.PokemonEncountersRetrieveResponse200> {
	const { axiosConfig = {}, ...data } = props || {};
	const apiClient = getApiClient();
	const url = `/api/v2/pokemon/${data.pokemon_id}/encounters`;
	const res = await apiClient.get<T.PokemonEncountersRetrieveResponse200>(url, axiosConfig);
	return res.data;
}
