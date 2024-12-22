import { createEntitySlice, createEntityThunks } from "./entitySlice";
import {
  fetchIndustriesApi,
  addIndustryApi,
  updateIndustryApi,
  deleteIndustryApi,
} from "../api/industryApi";

const industryThunks = createEntityThunks({
  name: "industries",
  fetch: fetchIndustriesApi,
  add: addIndustryApi,
  update: updateIndustryApi,
  delete: deleteIndustryApi,
});

export const industrySlice = createEntitySlice("industries", industryThunks);

export const {
  fetchEntities: fetchIndustries,
  addEntity: addIndustry,
  updateEntity: updateIndustry,
  deleteEntity: deleteIndustry,
} = industryThunks;

export default industrySlice.reducer;
