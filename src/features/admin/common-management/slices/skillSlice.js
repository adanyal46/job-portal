import { createEntitySlice, createEntityThunks } from "./entitySlice";
import {
  fetchSkillsApi,
  addSkillApi,
  updateSkillApi,
  deleteSkillApi,
} from "../api/skillApi";

// Create thunks for skill-related actions
const skillThunks = createEntityThunks({
  name: "skills",
  fetch: fetchSkillsApi,
  add: addSkillApi,
  update: updateSkillApi,
  delete: deleteSkillApi,
});

// Create slice for skills
export const skillSlice = createEntitySlice("skills", skillThunks);

// Export the individual thunks as actions
export const {
  fetchEntities: fetchSkills,
  addEntity: addSkill,
  updateEntity: updateSkill,
  deleteEntity: deleteSkill,
} = skillThunks;

// Export the reducer
export default skillSlice.reducer;
