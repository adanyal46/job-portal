import { createEntitySlice, createEntityThunks } from "./entitySlice";
import {
  fetchMentorServicesApi,
  addMentorServiceApi,
  updateMentorServiceApi,
  deleteMentorServiceApi,
} from "../api/mentorServicesApi";

const mentorServiceThunks = createEntityThunks({
  name: "mentor-services",
  fetch: fetchMentorServicesApi,
  add: addMentorServiceApi,
  update: updateMentorServiceApi,
  delete: deleteMentorServiceApi,
});

export const mentorServiceSlice = createEntitySlice(
  "mentor-services",
  mentorServiceThunks
);

export const {
  fetchEntities: fetchMentorServices,
  addEntity: addMentorService,
  updateEntity: updateMentorService,
  deleteEntity: deleteMentorService,
} = mentorServiceThunks;

export default mentorServiceSlice.reducer;
