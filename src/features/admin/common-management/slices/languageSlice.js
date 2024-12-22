import { createEntitySlice, createEntityThunks } from "./entitySlice";
import {
  fetchLanguagesApi,
  addLanguageApi,
  updateLanguageApi,
  deleteLanguageApi,
} from "../api/languageApi";

// Create thunks for language-related actions
const languageThunks = createEntityThunks({
  name: "languages",
  fetch: fetchLanguagesApi,
  add: addLanguageApi,
  update: updateLanguageApi,
  delete: deleteLanguageApi,
});

// Create slice for languages
export const languageSlice = createEntitySlice("languages", languageThunks);

// Export the individual thunks as actions
export const {
  fetchEntities: fetchLanguages,
  addEntity: addLanguage,
  updateEntity: updateLanguage,
  deleteEntity: deleteLanguage,
} = languageThunks;

// Export the reducer
export default languageSlice.reducer;
