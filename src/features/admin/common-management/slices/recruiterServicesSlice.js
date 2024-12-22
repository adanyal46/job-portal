import { createEntitySlice, createEntityThunks } from "./entitySlice";
import {
  fetchRecruiterServicesApi,
  addRecruiterServiceApi,
  updateRecruiterServiceApi,
  deleteRecruiterServiceApi,
} from "../api/recruiterServiceApi";

const recruiterServiceThunks = createEntityThunks({
  name: "recruiter-services",
  fetch: fetchRecruiterServicesApi,
  add: addRecruiterServiceApi,
  update: updateRecruiterServiceApi,
  delete: deleteRecruiterServiceApi,
});

export const recruiterServiceSlice = createEntitySlice(
  "recruiter-services",
  recruiterServiceThunks
);

export const {
  fetchEntities: fetchRecruiterServices,
  addEntity: addRecruiterService,
  updateEntity: updateRecruiterService,
  deleteEntity: deleteRecruiterService,
} = recruiterServiceThunks;

export default recruiterServiceSlice.reducer;
