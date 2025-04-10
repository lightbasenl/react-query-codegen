/* Generated TypeScript Definitions */

export interface AbilityChange {
	version_group: VersionGroupSummary;
	effect_entries: Array<AbilityChangeEffectText>;
}

export interface AbilityChangeEffectText {
	effect: string;
	language: LanguageSummary;
}

export interface AbilityDetail {
	id: number;
	name: string;
	is_main_series?: boolean;
	generation: GenerationSummary;
	names: Array<AbilityName>;
	effect_entries: Array<AbilityEffectText>;
	effect_changes: Array<AbilityChange>;
	flavor_text_entries: Array<AbilityFlavorText>;
	pokemon: Array<{ is_hidden: boolean; slot: number; pokemon: { name: string; url: string } }>;
}

export interface AbilityEffectText {
	effect: string;
	short_effect: string;
	language: LanguageSummary;
}

export interface AbilityFlavorText {
	flavor_text: string;
	language: LanguageSummary;
	version_group: VersionGroupSummary;
}

export interface AbilityName {
	name: string;
	language: LanguageSummary;
}

export interface AbilitySummary {
	name: string;
	url: string;
}

export interface BerryDetail {
	id: number;
	name: string;
	growth_time: number;
	max_harvest: number;
	natural_gift_power: number;
	size: number;
	smoothness: number;
	soil_dryness: number;
	firmness: BerryFirmnessSummary;
	flavors: Array<{
		potency: number;
		flavor: {
			/**
			 * The name of the flavor
			 */
			name?: string;
			/**
			 * The URL to get more information about the flavor
			 */
			url?: string;
		};
	}>;
	item: ItemSummary;
	natural_gift_type: TypeSummary;
}

export interface BerryFirmnessDetail {
	id: number;
	name: string;
	berries: Array<BerrySummary>;
	names: Array<BerryFirmnessName>;
}

export interface BerryFirmnessName {
	name: string;
	language: LanguageSummary;
}

export interface BerryFirmnessSummary {
	name: string;
	url: string;
}

export interface BerryFlavorDetail {
	id: number;
	name: string;
	berries: Array<{
		potency: number;
		berry: {
			/**
			 * The name of the berry
			 */
			name?: string;
			/**
			 * The URL to get more information about the berry
			 */
			url?: string;
		};
	}>;
	contest_type: ContestTypeSummary;
	names: Array<BerryFlavorName>;
}

export interface BerryFlavorName {
	name: string;
	language: LanguageSummary;
}

export interface BerryFlavorSummary {
	name: string;
	url: string;
}

export interface BerrySummary {
	name: string;
	url: string;
}

export interface CharacteristicDescription {
	description?: string;
	language: LanguageSummary;
}

export interface CharacteristicDetail {
	id: number;
	gene_modulo: number;
	possible_values: Array<number>;
	highest_stat: StatSummary;
	descriptions: Array<CharacteristicDescription>;
}

export interface CharacteristicSummary {
	url: string;
}

export interface ContestEffectDetail {
	id: number;
	appeal: number;
	jam: number;
	effect_entries: Array<ContestEffectEffectText>;
	flavor_text_entries: Array<ContestEffectFlavorText>;
}

export interface ContestEffectEffectText {
	effect: string;
	language: LanguageSummary;
}

export interface ContestEffectFlavorText {
	flavor_text: string;
	language: LanguageSummary;
}

export interface ContestEffectSummary {
	url: string;
}

export interface ContestTypeDetail {
	id: number;
	name: string;
	berry_flavor: any;
	names: Array<ContestTypeName>;
}

export interface ContestTypeName {
	name: string;
	color: string;
	language: LanguageSummary;
}

export interface ContestTypeSummary {
	name: string;
	url: string;
}

export interface EggGroupDetail {
	id: number;
	name: string;
	names: Array<EggGroupName>;
	pokemon_species: Array<{
		/**
		 * Pokemon species name.
		 */
		name?: string;
		/**
		 * The URL to get more information about the species
		 */
		url?: string;
	}>;
}

export interface EggGroupName {
	name: string;
	language: LanguageSummary;
}

export interface EggGroupSummary {
	name: string;
	url: string;
}

export interface EncounterConditionDetail {
	id: number;
	name: string;
	values: Array<EncounterConditionValueSummary>;
	names: Array<EncounterConditionName>;
}

export interface EncounterConditionName {
	name: string;
	language: LanguageSummary;
}

export interface EncounterConditionSummary {
	name: string;
	url: string;
}

export interface EncounterConditionValueDetail {
	id: number;
	name: string;
	condition: EncounterConditionSummary;
	names: Array<EncounterConditionValueName>;
}

export interface EncounterConditionValueName {
	name: string;
	language: LanguageSummary;
}

export interface EncounterConditionValueSummary {
	name: string;
	url: string;
}

export interface EncounterMethodDetail {
	id: number;
	name: string;
	order?: any;
	names: Array<EncounterMethodName>;
}

export interface EncounterMethodName {
	name: string;
	language: LanguageSummary;
}

export interface EncounterMethodSummary {
	name: string;
	url: string;
}

export interface EvolutionChainDetail {
	id: number;
	baby_trigger_item: ItemSummary;
	chain: {
		evolution_details: Array<any>;
		evolves_to: Array<{
			evolution_details: Array<{
				gender: { name: string; url: string } | null;
				held_item: { name: string; url: string } | null;
				item: { name: string; url: string } | null;
				known_move: any | null;
				known_move_type: any | null;
				location: { name: string; url: string } | null;
				min_affection: number | null;
				min_beauty: number | null;
				min_happiness: number | null;
				min_level: number | null;
				needs_overworld_rain: boolean | null;
				party_species: string | null;
				party_type: string | null;
				relative_physical_stats: string | null;
				time_of_day: string;
				trade_species: string | null;
				trigger: { name: string; url: string };
				turn_upside_down: boolean;
			}>;
			is_baby: boolean;
			species: { name: string; url: string };
		}>;
		is_baby: boolean;
		species: { name: string; url: string };
	};
}

export interface EvolutionChainSummary {
	url: string;
}

export interface EvolutionTriggerDetail {
	id: number;
	name: string;
	names: Array<EvolutionTriggerName>;
	pokemon_species: Array<{ name: string; url: string }>;
}

export interface EvolutionTriggerName {
	name: string;
	language: LanguageSummary;
}

export interface EvolutionTriggerSummary {
	name: string;
	url: string;
}

export interface Experience {
	level: number;
	experience: number;
}

export interface GenderDetail {
	id: number;
	name: string;
	pokemon_species_details: Array<{ rate: number; pokemon_species: { name: string; url: string } }>;
	required_for_evolution: Array<{ name: string; url: string }>;
}

export interface GenderSummary {
	name: string;
	url: string;
}

export interface GenerationDetail {
	id: number;
	name: string;
	abilities: Array<AbilitySummary>;
	main_region: RegionSummary;
	moves: Array<MoveSummary>;
	names: Array<GenerationName>;
	pokemon_species: Array<PokemonSpeciesSummary>;
	types: Array<TypeSummary>;
	version_groups: Array<VersionGroupSummary>;
}

export interface GenerationName {
	name: string;
	language: LanguageSummary;
}

export interface GenerationSummary {
	name: string;
	url: string;
}

export interface GrowthRateDescription {
	description?: string;
	language: LanguageSummary;
}

export interface GrowthRateDetail {
	id: number;
	name: string;
	formula: string;
	descriptions: Array<GrowthRateDescription>;
	levels: Array<Experience>;
	pokemon_species: Array<PokemonSpeciesSummary>;
}

export interface GrowthRateSummary {
	name: string;
	url: string;
}

export interface ItemAttributeDescription {
	description?: string;
	language: LanguageSummary;
}

export interface ItemAttributeDetail {
	id: number;
	name: string;
	descriptions: Array<ItemAttributeDescription>;
	items: Array<{ name: string; url: string }>;
	names: Array<ItemAttributeName>;
}

export interface ItemAttributeName {
	name: string;
	language: LanguageSummary;
}

export interface ItemAttributeSummary {
	name: string;
	url: string;
}

export interface ItemCategoryDetail {
	id: number;
	name: string;
	items: Array<ItemSummary>;
	names: Array<ItemCategoryName>;
	pocket: ItemPocketSummary;
}

export interface ItemCategoryName {
	name: string;
	language: LanguageSummary;
}

export interface ItemCategorySummary {
	name: string;
	url: string;
}

export interface ItemDetail {
	id: number;
	name: string;
	cost?: any;
	fling_power?: any;
	fling_effect: ItemFlingEffectSummary;
	attributes: Array<{ name: string; url: string }>;
	category: ItemCategorySummary;
	effect_entries: Array<ItemEffectText>;
	flavor_text_entries: Array<ItemFlavorText>;
	game_indices: Array<ItemGameIndex>;
	names: Array<ItemName>;
	held_by_pokemon: Array<{
		pokemon: { name: string; url: string };
		"version-details": Array<{ rarity: number; version: { name: string; url: string } }>;
	}>;
	sprites: { default: string };
	baby_trigger_for: { url: string };
	machines: Array<{ machine: string; version_group: { name: string; url: string } }>;
}

export interface ItemEffectText {
	effect: string;
	short_effect: string;
	language: LanguageSummary;
}

export interface ItemFlavorText {
	text: string;
	version_group: VersionGroupSummary;
	language: LanguageSummary;
}

export interface ItemFlingEffectDetail {
	id: number;
	name: string;
	effect_entries: Array<ItemFlingEffectEffectText>;
	items: Array<ItemSummary>;
}

export interface ItemFlingEffectEffectText {
	effect: string;
	language: LanguageSummary;
}

export interface ItemFlingEffectSummary {
	name: string;
	url: string;
}

export interface ItemGameIndex {
	game_index: number;
	generation: GenerationSummary;
}

export interface ItemName {
	name: string;
	language: LanguageSummary;
}

export interface ItemPocketDetail {
	id: number;
	name: string;
	categories: Array<ItemCategorySummary>;
	names: Array<ItemPocketName>;
}

export interface ItemPocketName {
	name: string;
	language: LanguageSummary;
}

export interface ItemPocketSummary {
	name: string;
	url: string;
}

export interface ItemSummary {
	name: string;
	url: string;
}

export interface LanguageDetail {
	id: number;
	name: string;
	official?: boolean;
	iso639: string;
	iso3166: string;
	names: Array<LanguageName>;
}

export interface LanguageName {
	name: string;
	language: LanguageSummary;
}

export interface LanguageSummary {
	name: string;
	url: string;
}

export interface LocationAreaDetail {
	id: number;
	name: string;
	game_index: number;
	encounter_method_rates: Array<{
		encounter_method: { name: string; url: string };
		version_details: Array<{ rate: number; version: { name: string; url: string } }>;
	}>;
	location: LocationSummary;
	names: Array<LocationAreaName>;
	pokemon_encounters: Array<{
		pokemon: { name: string; url: string };
		version_details: Array<{
			version: { name: string; url: string };
			max_chance: number;
			encounter_details: {
				min_level: number;
				max_level: number;
				condition_values?: { name: string; url: string };
				chance: number;
				method: { name: string; url: string };
			};
		}>;
	}>;
}

export interface LocationAreaName {
	name: string;
	language: LanguageSummary;
}

export interface LocationAreaSummary {
	name: string;
	url: string;
}

export interface LocationDetail {
	id: number;
	name: string;
	region: RegionSummary;
	names: Array<LocationName>;
	game_indices: Array<LocationGameIndex>;
	areas: Array<LocationAreaSummary>;
}

export interface LocationGameIndex {
	game_index: number;
	generation: GenerationSummary;
}

export interface LocationName {
	name: string;
	language: LanguageSummary;
}

export interface LocationSummary {
	name: string;
	url: string;
}

export interface MachineDetail {
	id: number;
	item: ItemSummary;
	version_group: VersionGroupSummary;
	move: MoveSummary;
}

export interface MachineSummary {
	url: string;
}

export interface MoveBattleStyleDetail {
	id: number;
	name: string;
	names: Array<MoveBattleStyleName>;
}

export interface MoveBattleStyleName {
	name: string;
	language: LanguageSummary;
}

export interface MoveBattleStyleSummary {
	name: string;
	url: string;
}

export interface MoveChange {
	accuracy?: any;
	power?: any;
	pp?: any;
	effect_chance: number;
	effect_entries: Array<{ effect: string; short_effect: string; language: { name: string; url: string } }>;
	type: TypeSummary;
	version_group: VersionGroupSummary;
}

export interface MoveDamageClassDescription {
	description?: string;
	language: LanguageSummary;
}

export interface MoveDamageClassDetail {
	id: number;
	name: string;
	descriptions: Array<MoveDamageClassDescription>;
	moves: Array<MoveSummary>;
	names: Array<MoveDamageClassName>;
}

export interface MoveDamageClassName {
	name: string;
	language: LanguageSummary;
}

export interface MoveDamageClassSummary {
	name: string;
	url: string;
}

export interface MoveDetail {
	id: number;
	name: string;
	accuracy?: any;
	effect_chance: number;
	pp?: any;
	priority?: any;
	power?: any;
	contest_combos: {
		normal: {
			use_before: Array<{ name: string; url: string }> | null;
			use_after: Array<{ name: string; url: string }> | null;
		};
		super: {
			use_before: Array<{ name: string; url: string }> | null;
			use_after: Array<{ name: string; url: string }> | null;
		};
	};
	contest_type: ContestTypeSummary;
	contest_effect: ContestEffectSummary;
	damage_class: MoveDamageClassSummary;
	effect_entries: Array<{ effect: string; short_effect: string; language: { name: string; url: string } }>;
	effect_changes: Array<{
		effect_entries: Array<{ effect: string; language: { name: string; url: string } }>;
		version_group: { name: string; url: string };
	}>;
	generation: GenerationSummary;
	meta: any;
	names: Array<MoveName>;
	past_values: Array<MoveChange>;
	stat_changes: Array<{ change: number; stat: { name: string; url: string } }>;
	super_contest_effect: SuperContestEffectSummary;
	target: MoveTargetSummary;
	type: TypeSummary;
	machines: Array<{ machine: { url: string }; version_group: { name: string; url: string } }>;
	flavor_text_entries: Array<MoveFlavorText>;
	learned_by_pokemon: Array<{ name: string; url: string }>;
}

export interface MoveFlavorText {
	flavor_text: string;
	language: LanguageSummary;
	version_group: VersionGroupSummary;
}

export interface MoveLearnMethodDescription {
	description?: string;
	language: LanguageSummary;
}

export interface MoveLearnMethodDetail {
	id: number;
	name: string;
	names: Array<MoveLearnMethodName>;
	descriptions: Array<MoveLearnMethodDescription>;
	version_groups: Array<{ name: string; url: string }>;
}

export interface MoveLearnMethodName {
	name: string;
	language: LanguageSummary;
}

export interface MoveLearnMethodSummary {
	name: string;
	url: string;
}

export interface MoveMeta {
	ailment: MoveMetaAilmentSummary;
	category: MoveMetaCategorySummary;
	min_hits?: any;
	max_hits?: any;
	min_turns?: any;
	max_turns?: any;
	drain?: any;
	healing?: any;
	crit_rate?: any;
	ailment_chance?: any;
	flinch_chance?: any;
	stat_chance?: any;
}

export interface MoveMetaAilmentDetail {
	id: number;
	name: string;
	moves: Array<{ name: string; url: string }>;
	names: Array<MoveMetaAilmentName>;
}

export interface MoveMetaAilmentName {
	name: string;
	language: LanguageSummary;
}

export interface MoveMetaAilmentSummary {
	name: string;
	url: string;
}

export interface MoveMetaCategoryDescription {
	description?: string;
	language: LanguageSummary;
}

export interface MoveMetaCategoryDetail {
	id: number;
	name: string;
	descriptions: Array<MoveMetaCategoryDescription>;
	moves: Array<{ name: string; url: string }>;
}

export interface MoveMetaCategorySummary {
	name: string;
	url: string;
}

export interface MoveName {
	name: string;
	language: LanguageSummary;
}

export interface MoveSummary {
	name: string;
	url: string;
}

export interface MoveTargetDescription {
	description?: string;
	language: LanguageSummary;
}

export interface MoveTargetDetail {
	id: number;
	name: string;
	descriptions: Array<MoveTargetDescription>;
	moves: Array<MoveSummary>;
	names: Array<MoveTargetName>;
}

export interface MoveTargetName {
	name: string;
	language: LanguageSummary;
}

export interface MoveTargetSummary {
	name: string;
	url: string;
}

export interface NatureBattleStylePreference {
	low_hp_preference: number;
	high_hp_preference: number;
	move_battle_style: MoveBattleStyleSummary;
}

export interface NatureDetail {
	id: number;
	name: string;
	decreased_stat: StatSummary;
	increased_stat: StatSummary;
	likes_flavor: BerryFlavorSummary;
	hates_flavor: BerryFlavorSummary;
	berries: Array<BerrySummary>;
	pokeathlon_stat_changes: Array<{ max_change: number; pokeathlon_stat: { name: string; url: string } }>;
	move_battle_style_preferences: Array<NatureBattleStylePreference>;
	names: Array<NatureName>;
}

export interface NatureName {
	name: string;
	language: LanguageSummary;
}

export interface NatureSummary {
	name: string;
	url: string;
}

export interface PaginatedAbilitySummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<AbilitySummary>;
}

export interface PaginatedBerryFirmnessSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<BerryFirmnessSummary>;
}

export interface PaginatedBerryFlavorSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<BerryFlavorSummary>;
}

export interface PaginatedBerrySummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<BerrySummary>;
}

export interface PaginatedCharacteristicSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<CharacteristicSummary>;
}

export interface PaginatedContestEffectSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<ContestEffectSummary>;
}

export interface PaginatedContestTypeSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<ContestTypeSummary>;
}

export interface PaginatedEggGroupSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<EggGroupSummary>;
}

export interface PaginatedEncounterConditionSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<EncounterConditionSummary>;
}

export interface PaginatedEncounterConditionValueSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<EncounterConditionValueSummary>;
}

export interface PaginatedEncounterMethodSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<EncounterMethodSummary>;
}

export interface PaginatedEvolutionChainSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<EvolutionChainSummary>;
}

export interface PaginatedEvolutionTriggerSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<EvolutionTriggerSummary>;
}

export interface PaginatedGenderSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<GenderSummary>;
}

export interface PaginatedGenerationSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<GenerationSummary>;
}

export interface PaginatedGrowthRateSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<GrowthRateSummary>;
}

export interface PaginatedItemAttributeSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<ItemAttributeSummary>;
}

export interface PaginatedItemCategorySummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<ItemCategorySummary>;
}

export interface PaginatedItemFlingEffectSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<ItemFlingEffectSummary>;
}

export interface PaginatedItemPocketSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<ItemPocketSummary>;
}

export interface PaginatedItemSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<ItemSummary>;
}

export interface PaginatedLanguageSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<LanguageSummary>;
}

export interface PaginatedLocationAreaSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<LocationAreaSummary>;
}

export interface PaginatedLocationSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<LocationSummary>;
}

export interface PaginatedMachineSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<MachineSummary>;
}

export interface PaginatedMoveBattleStyleSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<MoveBattleStyleSummary>;
}

export interface PaginatedMoveDamageClassSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<MoveDamageClassSummary>;
}

export interface PaginatedMoveLearnMethodSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<MoveLearnMethodSummary>;
}

export interface PaginatedMoveMetaAilmentSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<MoveMetaAilmentSummary>;
}

export interface PaginatedMoveMetaCategorySummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<MoveMetaCategorySummary>;
}

export interface PaginatedMoveSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<MoveSummary>;
}

export interface PaginatedMoveTargetSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<MoveTargetSummary>;
}

export interface PaginatedNatureSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<NatureSummary>;
}

export interface PaginatedPalParkAreaSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<PalParkAreaSummary>;
}

export interface PaginatedPokeathlonStatSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<PokeathlonStatSummary>;
}

export interface PaginatedPokedexSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<PokedexSummary>;
}

export interface PaginatedPokemonColorSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<PokemonColorSummary>;
}

export interface PaginatedPokemonFormSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<PokemonFormSummary>;
}

export interface PaginatedPokemonHabitatSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<PokemonHabitatSummary>;
}

export interface PaginatedPokemonShapeSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<PokemonShapeSummary>;
}

export interface PaginatedPokemonSpeciesSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<PokemonSpeciesSummary>;
}

export interface PaginatedPokemonSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<PokemonSummary>;
}

export interface PaginatedRegionSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<RegionSummary>;
}

export interface PaginatedStatSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<StatSummary>;
}

export interface PaginatedSuperContestEffectSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<SuperContestEffectSummary>;
}

export interface PaginatedTypeSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<TypeSummary>;
}

export interface PaginatedVersionGroupSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<VersionGroupSummary>;
}

export interface PaginatedVersionSummaryList {
	count?: number;
	next?: string | null;
	previous?: string | null;
	results?: Array<VersionSummary>;
}

export interface PalParkAreaDetail {
	id: number;
	name: string;
	names: Array<PalParkAreaName>;
	pokemon_encounters: Array<{
		base_score: number;
		"pokemon-species": { name: string; url: string };
		rate: number;
	}>;
}

export interface PalParkAreaName {
	name: string;
	language: LanguageSummary;
}

export interface PalParkAreaSummary {
	name: string;
	url: string;
}

export interface PokeathlonStatDetail {
	id: number;
	name: string;
	affecting_natures: {
		decrease: Array<{ max_change: number; nature: { name: string; url: string } }>;
		increase: Array<{ max_change: number; nature: { name: string; url: string } }>;
	};
	names: Array<PokeathlonStatName>;
}

export interface PokeathlonStatName {
	name: string;
	language: LanguageSummary;
}

export interface PokeathlonStatSummary {
	name: string;
	url: string;
}

export interface PokedexDescription {
	description?: string;
	language: LanguageSummary;
}

export interface PokedexDetail {
	id: number;
	name: string;
	is_main_series?: boolean;
	descriptions: Array<PokedexDescription>;
	names: Array<PokedexName>;
	pokemon_entries: Array<{ entry_number: number; pokemon_species: { name: string; url: string } }>;
	region: RegionSummary;
	version_groups: Array<{ name: string; url: string }>;
}

export interface PokedexName {
	name: string;
	language: LanguageSummary;
}

export interface PokedexSummary {
	name: string;
	url: string;
}

export interface PokemonColorDetail {
	id: number;
	name: string;
	names: Array<PokemonColorName>;
	pokemon_species: Array<PokemonSpeciesSummary>;
}

export interface PokemonColorName {
	name: string;
	language: LanguageSummary;
}

export interface PokemonColorSummary {
	name: string;
	url: string;
}

export interface PokemonDetail {
	id: number;
	name: string;
	base_experience?: any;
	height?: any;
	is_default?: boolean;
	order?: any;
	weight?: any;
	abilities: Array<{ ability: { name: string; url: string }; is_hidden: boolean; slot: number }>;
	past_abilities: Array<{
		abilities: Array<{ ability: { name: string; url: string }; is_hidden: boolean; slot: number }>;
		generation: { name: string; url: string };
	}>;
	forms: Array<PokemonFormSummary>;
	game_indices: Array<PokemonGameIndex>;
	held_items: {
		item: { name: string; url: string };
		version_details: Array<{ rarity: number; version: { name: string; url: string } }>;
	};
	location_area_encounters: string;
	moves: Array<{
		move: { name: string; url: string };
		version_group_details: Array<{
			level_learned_at: number;
			move_learn_method: { name: string; url: string };
			version_group: { name: string; url: string };
		}>;
	}>;
	species: PokemonSpeciesSummary;
	sprites: { front_default?: string };
	cries: { latest: string; legacy: string };
	stats: Array<PokemonStat>;
	types: Array<{ slot: number; type: { name: string; url: string } }>;
	past_types: Array<{
		generation: { name: string; url: string };
		types: Array<{ slot: number; type: { name: string; url: string } }>;
	}>;
}

export interface PokemonDexEntry {
	entry_number: number;
	pokedex: PokedexSummary;
}

export interface PokemonFormDetail {
	id: number;
	name: string;
	order?: any;
	form_order?: any;
	is_default?: boolean;
	is_battle_only?: boolean;
	is_mega?: boolean;
	form_name: string;
	pokemon: PokemonSummary;
	sprites: { default?: string };
	version_group: VersionGroupSummary;
	form_names: Array<{ language: { name: string; url: string }; name: string }>;
	names: Array<{ language: { name: string; url: string }; name: string }>;
	types: Array<{ slot: number; type: { name: string; url: string } }>;
}

export interface PokemonFormSummary {
	name: string;
	url: string;
}

export interface PokemonGameIndex {
	game_index: number;
	version: VersionSummary;
}

export interface PokemonHabitatDetail {
	id: number;
	name: string;
	names: Array<PokemonHabitatName>;
	pokemon_species: Array<PokemonSpeciesSummary>;
}

export interface PokemonHabitatName {
	name: string;
	language: LanguageSummary;
}

export interface PokemonHabitatSummary {
	name: string;
	url: string;
}

export interface PokemonShapeDetail {
	id: number;
	name: string;
	awesome_names: Array<{ awesome_name: string; language: { name: string; url: string } }>;
	names: Array<{ url: string; name: string }>;
	pokemon_species: Array<PokemonSpeciesSummary>;
}

export interface PokemonShapeSummary {
	name: string;
	url: string;
}

export interface PokemonSpeciesDescription {
	description?: string;
	language: LanguageSummary;
}

export interface PokemonSpeciesDetail {
	id: number;
	name: string;
	order?: any;
	gender_rate?: any;
	capture_rate?: any;
	base_happiness?: any;
	is_baby?: boolean;
	is_legendary?: boolean;
	is_mythical?: boolean;
	hatch_counter?: any;
	has_gender_differences?: boolean;
	forms_switchable?: boolean;
	growth_rate: GrowthRateSummary;
	pokedex_numbers: Array<PokemonDexEntry>;
	egg_groups: Array<{ name: string; url: string }>;
	color: PokemonColorSummary;
	shape: PokemonShapeSummary;
	evolves_from_species: PokemonSpeciesSummary;
	evolution_chain: EvolutionChainSummary;
	habitat: PokemonHabitatSummary;
	generation: GenerationSummary;
	names: Array<{ language: { name: string; url: string }; name: string }>;
	pal_park_encounters: Array<{ area: { name: string; url: string }; base_score: number; rate: number }>;
	form_descriptions: Array<PokemonSpeciesDescription>;
	flavor_text_entries: Array<PokemonSpeciesFlavorText>;
	genera: Array<{ genus: string; language: { name: string; url: string } }>;
	varieties: Array<{ is_default: boolean; pokemon: { name: string; url: string } }>;
}

export interface PokemonSpeciesFlavorText {
	flavor_text: string;
	language: LanguageSummary;
	version: VersionSummary;
}

export interface PokemonSpeciesSummary {
	name: string;
	url: string;
}

export interface PokemonStat {
	base_stat: number;
	effort: number;
	stat: StatSummary;
}

export interface PokemonSummary {
	name: string;
	url: string;
}

export interface RegionDetail {
	id: number;
	name: string;
	locations: Array<LocationSummary>;
	main_generation: any;
	names: Array<RegionName>;
	pokedexes: Array<PokedexSummary>;
	version_groups: Array<{ name: string; url: string }>;
}

export interface RegionName {
	name: string;
	language: LanguageSummary;
}

export interface RegionSummary {
	name: string;
	url: string;
}

export interface StatDetail {
	id: number;
	name: string;
	game_index: number;
	is_battle_only?: boolean;
	affecting_moves: {
		increase: Array<{ change: number; move: { name: string; url: string } }>;
		decrease: Array<{ change: number; move: { name: string; url: string } }>;
	};
	affecting_natures: {
		increase: Array<{ name: string; url: string }>;
		decrease: Array<{ name: string; url: string }>;
	};
	characteristics: Array<CharacteristicSummary>;
	move_damage_class: MoveDamageClassSummary;
	names: Array<StatName>;
}

export interface StatName {
	name: string;
	language: LanguageSummary;
}

export interface StatSummary {
	name: string;
	url: string;
}

export interface SuperContestEffectDetail {
	id: number;
	appeal: number;
	flavor_text_entries: Array<SuperContestEffectFlavorText>;
	moves: Array<MoveSummary>;
}

export interface SuperContestEffectFlavorText {
	flavor_text: string;
	language: LanguageSummary;
}

export interface SuperContestEffectSummary {
	url: string;
}

/**
 * Serializer for the Type resource
 */
export interface TypeDetail {
	id: number;
	name: string;
	damage_relations: {
		no_damage_to: Array<{ name: string; url: string }>;
		half_damage_to: Array<{ name: string; url: string }>;
		double_damage_to: Array<{ name: string; url: string }>;
		no_damage_from: Array<{ name: string; url: string }>;
		half_damage_from: Array<{ name: string; url: string }>;
		double_damage_from: Array<{ name: string; url: string }>;
	};
	past_damage_relations: Array<{
		generation: { name: string; url: string };
		damage_relations: {
			no_damage_to: Array<{ name: string; url: string }>;
			half_damage_to: Array<{ name: string; url: string }>;
			double_damage_to: Array<{ name: string; url: string }>;
			no_damage_from: Array<{ name: string; url: string }>;
			half_damage_from: Array<{ name: string; url: string }>;
			double_damage_from: Array<{ name: string; url: string }>;
		};
	}>;
	game_indices: Array<TypeGameIndex>;
	generation: GenerationSummary;
	move_damage_class: MoveDamageClassSummary;
	names: Array<AbilityName>;
	pokemon: Array<{
		slot?: number;
		pokemon?: {
			/**
			 * The name of the pokemon
			 */
			name?: string;
			/**
			 * The URL to get more information about the pokemon
			 */
			url?: string;
		};
	}>;
	moves: Array<MoveSummary>;
	sprites: Record<string, Record<string, { "name-icon"?: string }>>;
}

export interface TypeGameIndex {
	game_index: number;
	generation: GenerationSummary;
}

export interface TypeSummary {
	name: string;
	url: string;
}

/**
 * Should have a link to Version Group info but the Circular
dependency and compilation order fight eachother and I'm
not sure how to add anything other than a hyperlink
 */
export interface VersionDetail {
	id: number;
	name: string;
	names: Array<VersionName>;
	version_group: VersionGroupSummary;
}

export interface VersionGroupDetail {
	id: number;
	name: string;
	order?: any;
	generation: GenerationSummary;
	move_learn_methods: Array<{ name: string; url: string }>;
	pokedexes: Array<{ name: string; url: string }>;
	regions: Array<{ name: string; url: string }>;
	versions: Array<VersionSummary>;
}

export interface VersionGroupSummary {
	name: string;
	url: string;
}

export interface VersionName {
	name: string;
	language: LanguageSummary;
}

export interface VersionSummary {
	name: string;
	url: string;
}

export type AbilityListResponse200 = PaginatedAbilitySummaryList;

export type AbilityListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type AbilityRetrieveResponse200 = AbilityDetail;

export type AbilityRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type BerryListResponse200 = PaginatedBerrySummaryList;

export type BerryListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type BerryRetrieveResponse200 = BerryDetail;

export type BerryRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type BerryFirmnessListResponse200 = PaginatedBerryFirmnessSummaryList;

export type BerryFirmnessListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type BerryFirmnessRetrieveResponse200 = BerryFirmnessDetail;

export type BerryFirmnessRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type BerryFlavorListResponse200 = PaginatedBerryFlavorSummaryList;

export type BerryFlavorListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type BerryFlavorRetrieveResponse200 = BerryFlavorDetail;

export type BerryFlavorRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type CharacteristicListResponse200 = PaginatedCharacteristicSummaryList;

export type CharacteristicListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type CharacteristicRetrieveResponse200 = CharacteristicDetail;

export type CharacteristicRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type ContestTypeListResponse200 = PaginatedContestTypeSummaryList;

export type ContestTypeListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type ContestTypeRetrieveResponse200 = ContestTypeDetail;

export type ContestTypeRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type ContestEffectListResponse200 = PaginatedContestEffectSummaryList;

export type ContestEffectListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type ContestEffectRetrieveResponse200 = ContestEffectDetail;

export type ContestEffectRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type EggGroupListResponse200 = PaginatedEggGroupSummaryList;

export type EggGroupListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type EggGroupRetrieveResponse200 = EggGroupDetail;

export type EggGroupRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type EncounterMethodListResponse200 = PaginatedEncounterMethodSummaryList;

export type EncounterMethodListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type EncounterMethodRetrieveResponse200 = EncounterMethodDetail;

export type EncounterMethodRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type EncounterConditionListResponse200 = PaginatedEncounterConditionSummaryList;

export type EncounterConditionListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type EncounterConditionRetrieveResponse200 = EncounterConditionDetail;

export type EncounterConditionRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type EncounterConditionValueListResponse200 = PaginatedEncounterConditionValueSummaryList;

export type EncounterConditionValueListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type EncounterConditionValueRetrieveResponse200 = EncounterConditionValueDetail;

export type EncounterConditionValueRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type EvolutionChainListResponse200 = PaginatedEvolutionChainSummaryList;

export type EvolutionChainListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type EvolutionChainRetrieveResponse200 = EvolutionChainDetail;

export type EvolutionChainRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type EvolutionTriggerListResponse200 = PaginatedEvolutionTriggerSummaryList;

export type EvolutionTriggerListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type EvolutionTriggerRetrieveResponse200 = EvolutionTriggerDetail;

export type EvolutionTriggerRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type GenerationListResponse200 = PaginatedGenerationSummaryList;

export type GenerationListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type GenerationRetrieveResponse200 = GenerationDetail;

export type GenerationRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type GenderListResponse200 = PaginatedGenderSummaryList;

export type GenderListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type GenderRetrieveResponse200 = GenderDetail;

export type GenderRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type GrowthRateListResponse200 = PaginatedGrowthRateSummaryList;

export type GrowthRateListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type GrowthRateRetrieveResponse200 = GrowthRateDetail;

export type GrowthRateRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type ItemListResponse200 = PaginatedItemSummaryList;

export type ItemListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type ItemRetrieveResponse200 = ItemDetail;

export type ItemRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type ItemCategoryListResponse200 = PaginatedItemCategorySummaryList;

export type ItemCategoryListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type ItemCategoryRetrieveResponse200 = ItemCategoryDetail;

export type ItemCategoryRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type ItemAttributeListResponse200 = PaginatedItemAttributeSummaryList;

export type ItemAttributeListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type ItemAttributeRetrieveResponse200 = ItemAttributeDetail;

export type ItemAttributeRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type ItemFlingEffectListResponse200 = PaginatedItemFlingEffectSummaryList;

export type ItemFlingEffectListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type ItemFlingEffectRetrieveResponse200 = ItemFlingEffectDetail;

export type ItemFlingEffectRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type ItemPocketListResponse200 = PaginatedItemPocketSummaryList;

export type ItemPocketListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type ItemPocketRetrieveResponse200 = ItemPocketDetail;

export type ItemPocketRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type LanguageListResponse200 = PaginatedLanguageSummaryList;

export type LanguageListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type LanguageRetrieveResponse200 = LanguageDetail;

export type LanguageRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type LocationListResponse200 = PaginatedLocationSummaryList;

export type LocationListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type LocationRetrieveResponse200 = LocationDetail;

export type LocationRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type LocationAreaListResponse200 = PaginatedLocationAreaSummaryList;

export type LocationAreaListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
};

export type LocationAreaRetrieveResponse200 = LocationAreaDetail;

export type LocationAreaRetrieveParams = {
	/**
	 * A unique integer value identifying this location area.
	 */
	id: number;
};

export type MachineListResponse200 = PaginatedMachineSummaryList;

export type MachineListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type MachineRetrieveResponse200 = MachineDetail;

export type MachineRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type MoveListResponse200 = PaginatedMoveSummaryList;

export type MoveListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type MoveRetrieveResponse200 = MoveDetail;

export type MoveRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type MoveAilmentListResponse200 = PaginatedMoveMetaAilmentSummaryList;

export type MoveAilmentListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type MoveAilmentRetrieveResponse200 = MoveMetaAilmentDetail;

export type MoveAilmentRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type MoveBattleStyleListResponse200 = PaginatedMoveBattleStyleSummaryList;

export type MoveBattleStyleListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type MoveBattleStyleRetrieveResponse200 = MoveBattleStyleDetail;

export type MoveBattleStyleRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type MoveCategoryListResponse200 = PaginatedMoveMetaCategorySummaryList;

export type MoveCategoryListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type MoveCategoryRetrieveResponse200 = MoveMetaCategoryDetail;

export type MoveCategoryRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type MoveDamageClassListResponse200 = PaginatedMoveDamageClassSummaryList;

export type MoveDamageClassListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type MoveDamageClassRetrieveResponse200 = MoveDamageClassDetail;

export type MoveDamageClassRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type MoveLearnMethodListResponse200 = PaginatedMoveLearnMethodSummaryList;

export type MoveLearnMethodListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type MoveLearnMethodRetrieveResponse200 = MoveLearnMethodDetail;

export type MoveLearnMethodRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type MoveTargetListResponse200 = PaginatedMoveTargetSummaryList;

export type MoveTargetListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type MoveTargetRetrieveResponse200 = MoveTargetDetail;

export type MoveTargetRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type NatureListResponse200 = PaginatedNatureSummaryList;

export type NatureListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type NatureRetrieveResponse200 = NatureDetail;

export type NatureRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PalParkAreaListResponse200 = PaginatedPalParkAreaSummaryList;

export type PalParkAreaListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type PalParkAreaRetrieveResponse200 = PalParkAreaDetail;

export type PalParkAreaRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PokedexListResponse200 = PaginatedPokedexSummaryList;

export type PokedexListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type PokedexRetrieveResponse200 = PokedexDetail;

export type PokedexRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PokemonListResponse200 = PaginatedPokemonSummaryList;

export type PokemonListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type PokemonRetrieveResponse200 = PokemonDetail;

export type PokemonRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PokemonColorListResponse200 = PaginatedPokemonColorSummaryList;

export type PokemonColorListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type PokemonColorRetrieveResponse200 = PokemonColorDetail;

export type PokemonColorRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PokemonFormListResponse200 = PaginatedPokemonFormSummaryList;

export type PokemonFormListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type PokemonFormRetrieveResponse200 = PokemonFormDetail;

export type PokemonFormRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PokemonHabitatListResponse200 = PaginatedPokemonHabitatSummaryList;

export type PokemonHabitatListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type PokemonHabitatRetrieveResponse200 = PokemonHabitatDetail;

export type PokemonHabitatRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PokemonShapeListResponse200 = PaginatedPokemonShapeSummaryList;

export type PokemonShapeListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type PokemonShapeRetrieveResponse200 = PokemonShapeDetail;

export type PokemonShapeRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PokemonSpeciesListResponse200 = PaginatedPokemonSpeciesSummaryList;

export type PokemonSpeciesListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type PokemonSpeciesRetrieveResponse200 = PokemonSpeciesDetail;

export type PokemonSpeciesRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PokeathlonStatListResponse200 = PaginatedPokeathlonStatSummaryList;

export type PokeathlonStatListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type PokeathlonStatRetrieveResponse200 = PokeathlonStatDetail;

export type PokeathlonStatRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type RegionListResponse200 = PaginatedRegionSummaryList;

export type RegionListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type RegionRetrieveResponse200 = RegionDetail;

export type RegionRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type StatListResponse200 = PaginatedStatSummaryList;

export type StatListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type StatRetrieveResponse200 = StatDetail;

export type StatRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type SuperContestEffectListResponse200 = PaginatedSuperContestEffectSummaryList;

export type SuperContestEffectListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type SuperContestEffectRetrieveResponse200 = SuperContestEffectDetail;

export type SuperContestEffectRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type TypeListResponse200 = PaginatedTypeSummaryList;

export type TypeListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type TypeRetrieveResponse200 = TypeDetail;

export type TypeRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type VersionListResponse200 = PaginatedVersionSummaryList;

export type VersionListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type VersionRetrieveResponse200 = VersionDetail;

export type VersionRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type VersionGroupListResponse200 = PaginatedVersionGroupSummaryList;

export type VersionGroupListParams = {
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	/**
* > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)
Case-insensitive query applied on the `name` property. 
							*/
	q?: string;
};

export type VersionGroupRetrieveResponse200 = VersionGroupDetail;

export type VersionGroupRetrieveParams = {
	/**
	 * This parameter can be a string or an integer.
	 */
	id: string;
};

export type PokemonEncountersRetrieveResponse200 = Array<{
	location_area: { name: string; url: string };
	version_details: Array<{
		encounter_details: Array<{
			chance: number;
			condition_values: Array<{ name: string; url: string }>;
			max_level: number;
			method: { name: string; url: string };
			min_level: number;
		}>;
		max_chance: number;
		version: { name: string; url: string };
	}>;
}>;

export type PokemonEncountersRetrieveParams = { pokemon_id: string };
