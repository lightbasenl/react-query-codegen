import { queryOptions, skipToken } from "@tanstack/react-query";
import * as apiClient from "./pokApi.client";
// TEMPORARY: allows for backward compatibility imports
export * from "./pokApi.client";

const hasDefinedProps = <T extends { [P in K]?: any }, K extends PropertyKey>(
	obj: T,
	...keys: K[]
): obj is T & { [P in K]-?: Exclude<T[P], undefined> } => {
	return keys.every((k) => obj[k] !== undefined);
};

export const getAbilityListQueryOptions = (props: Partial<Parameters<typeof apiClient.abilityList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["abilityList", params],
		queryFn: enabled ? () => apiClient.abilityList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getAbilityRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.abilityRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["abilityRetrieve", params],
		queryFn: enabled ? () => apiClient.abilityRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getBerryListQueryOptions = (props: Partial<Parameters<typeof apiClient.berryList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["berryList", params],
		queryFn: enabled ? () => apiClient.berryList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getBerryRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.berryRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["berryRetrieve", params],
		queryFn: enabled ? () => apiClient.berryRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getBerryFirmnessListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.berryFirmnessList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["berryFirmnessList", params],
		queryFn: enabled ? () => apiClient.berryFirmnessList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getBerryFirmnessRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.berryFirmnessRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["berryFirmnessRetrieve", params],
		queryFn: enabled ? () => apiClient.berryFirmnessRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getBerryFlavorListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.berryFlavorList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["berryFlavorList", params],
		queryFn: enabled ? () => apiClient.berryFlavorList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getBerryFlavorRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.berryFlavorRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["berryFlavorRetrieve", params],
		queryFn: enabled ? () => apiClient.berryFlavorRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getCharacteristicListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.characteristicList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["characteristicList", params],
		queryFn: enabled ? () => apiClient.characteristicList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getCharacteristicRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.characteristicRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["characteristicRetrieve", params],
		queryFn: enabled ? () => apiClient.characteristicRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getContestTypeListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.contestTypeList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["contestTypeList", params],
		queryFn: enabled ? () => apiClient.contestTypeList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getContestTypeRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.contestTypeRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["contestTypeRetrieve", params],
		queryFn: enabled ? () => apiClient.contestTypeRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getContestEffectListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.contestEffectList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["contestEffectList", params],
		queryFn: enabled ? () => apiClient.contestEffectList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getContestEffectRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.contestEffectRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["contestEffectRetrieve", params],
		queryFn: enabled ? () => apiClient.contestEffectRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEggGroupListQueryOptions = (props: Partial<Parameters<typeof apiClient.eggGroupList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["eggGroupList", params],
		queryFn: enabled ? () => apiClient.eggGroupList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEggGroupRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.eggGroupRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["eggGroupRetrieve", params],
		queryFn: enabled ? () => apiClient.eggGroupRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEncounterMethodListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.encounterMethodList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["encounterMethodList", params],
		queryFn: enabled ? () => apiClient.encounterMethodList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEncounterMethodRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.encounterMethodRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["encounterMethodRetrieve", params],
		queryFn: enabled ? () => apiClient.encounterMethodRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEncounterConditionListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.encounterConditionList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["encounterConditionList", params],
		queryFn: enabled ? () => apiClient.encounterConditionList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEncounterConditionRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.encounterConditionRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["encounterConditionRetrieve", params],
		queryFn: enabled ? () => apiClient.encounterConditionRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEncounterConditionValueListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.encounterConditionValueList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["encounterConditionValueList", params],
		queryFn: enabled ? () => apiClient.encounterConditionValueList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEncounterConditionValueRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.encounterConditionValueRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["encounterConditionValueRetrieve", params],
		queryFn: enabled
			? () => apiClient.encounterConditionValueRetrieve({ ...params, axiosConfig })
			: skipToken,
	});
};

export const getEvolutionChainListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.evolutionChainList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["evolutionChainList", params],
		queryFn: enabled ? () => apiClient.evolutionChainList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEvolutionChainRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.evolutionChainRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["evolutionChainRetrieve", params],
		queryFn: enabled ? () => apiClient.evolutionChainRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEvolutionTriggerListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.evolutionTriggerList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["evolutionTriggerList", params],
		queryFn: enabled ? () => apiClient.evolutionTriggerList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getEvolutionTriggerRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.evolutionTriggerRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["evolutionTriggerRetrieve", params],
		queryFn: enabled ? () => apiClient.evolutionTriggerRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getGenerationListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.generationList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["generationList", params],
		queryFn: enabled ? () => apiClient.generationList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getGenerationRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.generationRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["generationRetrieve", params],
		queryFn: enabled ? () => apiClient.generationRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getGenderListQueryOptions = (props: Partial<Parameters<typeof apiClient.genderList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["genderList", params],
		queryFn: enabled ? () => apiClient.genderList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getGenderRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.genderRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["genderRetrieve", params],
		queryFn: enabled ? () => apiClient.genderRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getGrowthRateListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.growthRateList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["growthRateList", params],
		queryFn: enabled ? () => apiClient.growthRateList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getGrowthRateRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.growthRateRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["growthRateRetrieve", params],
		queryFn: enabled ? () => apiClient.growthRateRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemListQueryOptions = (props: Partial<Parameters<typeof apiClient.itemList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["itemList", params],
		queryFn: enabled ? () => apiClient.itemList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemRetrieveQueryOptions = (props: Partial<Parameters<typeof apiClient.itemRetrieve>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["itemRetrieve", params],
		queryFn: enabled ? () => apiClient.itemRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemCategoryListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.itemCategoryList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["itemCategoryList", params],
		queryFn: enabled ? () => apiClient.itemCategoryList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemCategoryRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.itemCategoryRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["itemCategoryRetrieve", params],
		queryFn: enabled ? () => apiClient.itemCategoryRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemAttributeListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.itemAttributeList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["itemAttributeList", params],
		queryFn: enabled ? () => apiClient.itemAttributeList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemAttributeRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.itemAttributeRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["itemAttributeRetrieve", params],
		queryFn: enabled ? () => apiClient.itemAttributeRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemFlingEffectListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.itemFlingEffectList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["itemFlingEffectList", params],
		queryFn: enabled ? () => apiClient.itemFlingEffectList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemFlingEffectRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.itemFlingEffectRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["itemFlingEffectRetrieve", params],
		queryFn: enabled ? () => apiClient.itemFlingEffectRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemPocketListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.itemPocketList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["itemPocketList", params],
		queryFn: enabled ? () => apiClient.itemPocketList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getItemPocketRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.itemPocketRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["itemPocketRetrieve", params],
		queryFn: enabled ? () => apiClient.itemPocketRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getLanguageListQueryOptions = (props: Partial<Parameters<typeof apiClient.languageList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["languageList", params],
		queryFn: enabled ? () => apiClient.languageList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getLanguageRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.languageRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["languageRetrieve", params],
		queryFn: enabled ? () => apiClient.languageRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getLocationListQueryOptions = (props: Partial<Parameters<typeof apiClient.locationList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["locationList", params],
		queryFn: enabled ? () => apiClient.locationList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getLocationRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.locationRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["locationRetrieve", params],
		queryFn: enabled ? () => apiClient.locationRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getLocationAreaListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.locationAreaList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["locationAreaList", params],
		queryFn: enabled ? () => apiClient.locationAreaList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getLocationAreaRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.locationAreaRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["locationAreaRetrieve", params],
		queryFn: enabled ? () => apiClient.locationAreaRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMachineListQueryOptions = (props: Partial<Parameters<typeof apiClient.machineList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["machineList", params],
		queryFn: enabled ? () => apiClient.machineList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMachineRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.machineRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["machineRetrieve", params],
		queryFn: enabled ? () => apiClient.machineRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveListQueryOptions = (props: Partial<Parameters<typeof apiClient.moveList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["moveList", params],
		queryFn: enabled ? () => apiClient.moveList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveRetrieveQueryOptions = (props: Partial<Parameters<typeof apiClient.moveRetrieve>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["moveRetrieve", params],
		queryFn: enabled ? () => apiClient.moveRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveAilmentListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveAilmentList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["moveAilmentList", params],
		queryFn: enabled ? () => apiClient.moveAilmentList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveAilmentRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveAilmentRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["moveAilmentRetrieve", params],
		queryFn: enabled ? () => apiClient.moveAilmentRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveBattleStyleListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveBattleStyleList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["moveBattleStyleList", params],
		queryFn: enabled ? () => apiClient.moveBattleStyleList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveBattleStyleRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveBattleStyleRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["moveBattleStyleRetrieve", params],
		queryFn: enabled ? () => apiClient.moveBattleStyleRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveCategoryListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveCategoryList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["moveCategoryList", params],
		queryFn: enabled ? () => apiClient.moveCategoryList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveCategoryRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveCategoryRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["moveCategoryRetrieve", params],
		queryFn: enabled ? () => apiClient.moveCategoryRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveDamageClassListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveDamageClassList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["moveDamageClassList", params],
		queryFn: enabled ? () => apiClient.moveDamageClassList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveDamageClassRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveDamageClassRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["moveDamageClassRetrieve", params],
		queryFn: enabled ? () => apiClient.moveDamageClassRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveLearnMethodListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveLearnMethodList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["moveLearnMethodList", params],
		queryFn: enabled ? () => apiClient.moveLearnMethodList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveLearnMethodRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveLearnMethodRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["moveLearnMethodRetrieve", params],
		queryFn: enabled ? () => apiClient.moveLearnMethodRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveTargetListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveTargetList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["moveTargetList", params],
		queryFn: enabled ? () => apiClient.moveTargetList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getMoveTargetRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.moveTargetRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["moveTargetRetrieve", params],
		queryFn: enabled ? () => apiClient.moveTargetRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getNatureListQueryOptions = (props: Partial<Parameters<typeof apiClient.natureList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["natureList", params],
		queryFn: enabled ? () => apiClient.natureList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getNatureRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.natureRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["natureRetrieve", params],
		queryFn: enabled ? () => apiClient.natureRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPalParkAreaListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.palParkAreaList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["palParkAreaList", params],
		queryFn: enabled ? () => apiClient.palParkAreaList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPalParkAreaRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.palParkAreaRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["palParkAreaRetrieve", params],
		queryFn: enabled ? () => apiClient.palParkAreaRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokedexListQueryOptions = (props: Partial<Parameters<typeof apiClient.pokedexList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["pokedexList", params],
		queryFn: enabled ? () => apiClient.pokedexList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokedexRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokedexRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["pokedexRetrieve", params],
		queryFn: enabled ? () => apiClient.pokedexRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonListQueryOptions = (props: Partial<Parameters<typeof apiClient.pokemonList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["pokemonList", params],
		queryFn: enabled ? () => apiClient.pokemonList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["pokemonRetrieve", params],
		queryFn: enabled ? () => apiClient.pokemonRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonColorListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonColorList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["pokemonColorList", params],
		queryFn: enabled ? () => apiClient.pokemonColorList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonColorRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonColorRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["pokemonColorRetrieve", params],
		queryFn: enabled ? () => apiClient.pokemonColorRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonFormListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonFormList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["pokemonFormList", params],
		queryFn: enabled ? () => apiClient.pokemonFormList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonFormRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonFormRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["pokemonFormRetrieve", params],
		queryFn: enabled ? () => apiClient.pokemonFormRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonHabitatListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonHabitatList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["pokemonHabitatList", params],
		queryFn: enabled ? () => apiClient.pokemonHabitatList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonHabitatRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonHabitatRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["pokemonHabitatRetrieve", params],
		queryFn: enabled ? () => apiClient.pokemonHabitatRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonShapeListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonShapeList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["pokemonShapeList", params],
		queryFn: enabled ? () => apiClient.pokemonShapeList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonShapeRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonShapeRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["pokemonShapeRetrieve", params],
		queryFn: enabled ? () => apiClient.pokemonShapeRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonSpeciesListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonSpeciesList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["pokemonSpeciesList", params],
		queryFn: enabled ? () => apiClient.pokemonSpeciesList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonSpeciesRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonSpeciesRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["pokemonSpeciesRetrieve", params],
		queryFn: enabled ? () => apiClient.pokemonSpeciesRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokeathlonStatListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokeathlonStatList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["pokeathlonStatList", params],
		queryFn: enabled ? () => apiClient.pokeathlonStatList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokeathlonStatRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokeathlonStatRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["pokeathlonStatRetrieve", params],
		queryFn: enabled ? () => apiClient.pokeathlonStatRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getRegionListQueryOptions = (props: Partial<Parameters<typeof apiClient.regionList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["regionList", params],
		queryFn: enabled ? () => apiClient.regionList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getRegionRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.regionRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["regionRetrieve", params],
		queryFn: enabled ? () => apiClient.regionRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getStatListQueryOptions = (props: Partial<Parameters<typeof apiClient.statList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["statList", params],
		queryFn: enabled ? () => apiClient.statList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getStatRetrieveQueryOptions = (props: Partial<Parameters<typeof apiClient.statRetrieve>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["statRetrieve", params],
		queryFn: enabled ? () => apiClient.statRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getSuperContestEffectListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.superContestEffectList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["superContestEffectList", params],
		queryFn: enabled ? () => apiClient.superContestEffectList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getSuperContestEffectRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.superContestEffectRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["superContestEffectRetrieve", params],
		queryFn: enabled ? () => apiClient.superContestEffectRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getTypeListQueryOptions = (props: Partial<Parameters<typeof apiClient.typeList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["typeList", params],
		queryFn: enabled ? () => apiClient.typeList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getTypeRetrieveQueryOptions = (props: Partial<Parameters<typeof apiClient.typeRetrieve>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["typeRetrieve", params],
		queryFn: enabled ? () => apiClient.typeRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getVersionListQueryOptions = (props: Partial<Parameters<typeof apiClient.versionList>[0]>) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["versionList", params],
		queryFn: enabled ? () => apiClient.versionList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getVersionRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.versionRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["versionRetrieve", params],
		queryFn: enabled ? () => apiClient.versionRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getVersionGroupListQueryOptions = (
	props: Partial<Parameters<typeof apiClient.versionGroupList>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params);
	return queryOptions({
		queryKey: ["versionGroupList", params],
		queryFn: enabled ? () => apiClient.versionGroupList({ ...params, axiosConfig }) : skipToken,
	});
};

export const getVersionGroupRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.versionGroupRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "id");
	return queryOptions({
		queryKey: ["versionGroupRetrieve", params],
		queryFn: enabled ? () => apiClient.versionGroupRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};

export const getPokemonEncountersRetrieveQueryOptions = (
	props: Partial<Parameters<typeof apiClient.pokemonEncountersRetrieve>[0]>
) => {
	const { axiosConfig, ...params } = props || {};
	const enabled = hasDefinedProps(params, "pokemon_id");
	return queryOptions({
		queryKey: ["pokemonEncountersRetrieve", params],
		queryFn: enabled ? () => apiClient.pokemonEncountersRetrieve({ ...params, axiosConfig }) : skipToken,
	});
};
