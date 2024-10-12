import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMentorServiceApi,
  deleteCertificateApi,
  deleteEducationApi,
  deleteEmploymentHisApi,
  deleteMentorServiceApi,
  mentorProfileApi,
  profileApi,
  profileApiPost,
  profileCertificateApi,
  profileDocumentApi,
  profileEducationApi,
  profileEmploymentApi,
  profileLocationApi,
  updateCertificateApi,
  updateEducationApi,
  updateEmploymentApi,
  updateMentorServiceApi,
  updateOtherInfoMentorApi,
} from "./profileApi";
import { jwtDecode } from "jwt-decode";

let USER_ROLE = "JOB_SEEKER"; // Default role

// Thunk to handle profile fetching
export const profile = createAsyncThunk(
  "profile/getInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token); // Correct function call
        USER_ROLE = decodedToken.role || "JOB_SEEKER"; // Extract role from token
      }

      // Choose API route based on role
      let apiRoute;
      if (USER_ROLE === "JOB_SEEKER") {
        apiRoute = await profileApi();
      } else {
        apiRoute = await mentorProfileApi();
      }

      return apiRoute; // Return the API response based on the role
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const profileUpdate = createAsyncThunk(
  "profile/updateInfo",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const data = await profileApiPost(formData);
      const currentProfile = getState().profile.user?.Profile?.[0] || {};
      const updatedProfile = {
        ...currentProfile,
        ...data.data,
        avatarUrl: data.data.avatarId,
      };
      return {
        sucess: data.success,
        ...getState().profile.user,
        Profile: [updatedProfile],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileEducation = createAsyncThunk(
  "profile/education",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const currentUser = getState().profile.user;
      const { educationId } = formData;
      const createUpdatedUser = (education) => ({
        ...currentUser,
        Education: education,
        success: true,
      });

      if (educationId) {
        const updatedData = await updateEducationApi(formData);
        const updatedEducation = currentUser?.Education.map((edu) =>
          edu.id === educationId
            ? {
                ...edu,
                ...updatedData.data, // Use spread operator for cleaner code
              }
            : edu
        );

        return {
          success: updatedData.success,
          user: createUpdatedUser(updatedEducation), // Return updated user object
        };
      } else {
        // Create new education entry
        const data = await profileEducationApi(formData);
        const currentEducation = currentUser?.Education || [];

        const newEducationEntry = {
          id: data.data.id,
          degreName: data.data.degreName,
          universityName: data.data.universityName,
          startFrom: data.data.startFrom,
          endIn: data.data.endIn,
          description: data.data.description,
        };

        const updatedEducation = [...currentEducation, newEducationEntry];

        return {
          success: data.success,
          user: createUpdatedUser(updatedEducation), // Return updated user object
        };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileLocation = createAsyncThunk(
  "profile/location",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const data = await profileLocationApi(formData);
      const currentUser = getState().profile.user;
      const updatedUser = {
        ...currentUser,
        Location: [{ ...data.message }],
        success: true,
      };

      return {
        success: data.success,
        user: updatedUser, // Return the updated user object
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileDocument = createAsyncThunk(
  "profile/documents",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const data = await profileDocumentApi(formData);
      const currentUser = getState().profile.user;
      const updatedUser = {
        ...currentUser,
        Documents: [{ ...data.message }],
        success: true,
      };

      return {
        success: data.success,
        user: updatedUser,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileEmploymentHistory = createAsyncThunk(
  "profile/employment",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const currentUser = getState().profile.user;
      const { employmentId } = formData;

      // Helper function to create an updated user object
      const createUpdatedUser = (employmentHistory) => ({
        ...currentUser,
        EmpolymentHistory: employmentHistory,
        success: true,
      });

      if (employmentId) {
        const updatedData = await updateEmploymentApi(formData);
        const updatedEmploymentHistory = currentUser?.EmpolymentHistory.map(
          (emp) =>
            emp.id === employmentId
              ? {
                  ...emp,
                  ...updatedData.data,
                }
              : emp
        );

        return {
          success: updatedData.success,
          user: createUpdatedUser(updatedEmploymentHistory),
        };
      } else {
        // Create new employment history entry
        const data = await profileEmploymentApi(formData);
        const newEmploymentEntry = data.data;

        const currentEmploymentHistory = currentUser?.EmpolymentHistory || [];
        const updatedEmploymentHistory = [
          ...currentEmploymentHistory,
          newEmploymentEntry,
        ];

        return {
          success: data.success,
          user: createUpdatedUser(updatedEmploymentHistory), // Return updated user object
        };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileCertificate = createAsyncThunk(
  "profile/certificate",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const currentUser = getState().profile.user;
      const { certificateId } = formData;

      // Helper function to create an updated user object
      const createUpdatedUser = (certificate) => ({
        ...currentUser,
        Certificate: certificate,
        success: true,
      });

      if (certificateId) {
        const updatedData = await updateCertificateApi(formData);
        const updateCertificateHistory = currentUser?.Certificate.map((cert) =>
          cert.id === certificateId
            ? {
                ...cert,
                ...updatedData.data,
              }
            : cert
        );

        return {
          success: updatedData.success,
          user: createUpdatedUser(updateCertificateHistory),
        };
      } else {
        const data = await profileCertificateApi(formData);
        const newCertificate = data.data;

        const currentCertificate = currentUser?.Certificate || [];
        const updateCertificateHistory = [
          ...currentCertificate,
          newCertificate,
        ];

        return {
          success: data.success,
          user: createUpdatedUser(updateCertificateHistory), // Return updated user object
        };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "profile/education/delete",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const response = await deleteEducationApi(formData);

      const deletedEducationId = response.data.id;
      const currentUser = getState().profile.user;
      const updatedEducation = currentUser.Education.filter(
        (edu) => edu.id !== deletedEducationId
      );

      return {
        success: response.success,
        ...currentUser,
        Education: updatedEducation,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteCertificate = createAsyncThunk(
  "profile/certificate/delete",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const response = await deleteCertificateApi(formData);
      const deleteId = response.data.id;
      const currentUser = getState().profile.user;
      const updatedCertificate = currentUser.Certificate.filter(
        (cer) => cer.id !== deleteId
      );
      return {
        success: response.success,
        ...currentUser,
        Certificate: updatedCertificate,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteEmployHis = createAsyncThunk(
  "profile/employment/delete",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const response = await deleteEmploymentHisApi(formData);
      const deleteId = response.data.id;
      const currentUser = getState().profile.user;
      const updatedEmpHisyory = currentUser.EmpolymentHistory.filter(
        (emp) => emp.id !== deleteId
      );
      return {
        success: response.success,
        ...currentUser,
        EmpolymentHistory: updatedEmpHisyory,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createServiceMentor = createAsyncThunk(
  "create/service/mentor",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const response = await createMentorServiceApi(formData);
      const currentUser = getState().profile.user;

      const currentServices = currentUser?.services || [];
      const updatedServices = [...currentServices, response.data];
      const updatedUser = {
        ...currentUser,
        services: updatedServices,
        success: true,
      };

      return {
        success: true,
        user: updatedUser,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateServiceApiMentor = createAsyncThunk(
  "update/service/mentor",
  async ({ serviceId, formData }, { getState, rejectWithValue }) => {
    // Destructure from an object
    try {
      const response = await updateMentorServiceApi(serviceId, formData);
      const currentUser = getState().profile.user;

      const currentServices = currentUser?.services || [];

      const updatedServices = currentServices.map((serv) =>
        serv.id === serviceId
          ? {
              ...response.data,
            }
          : serv
      );
      const updatedUser = {
        ...currentUser,
        services: updatedServices,
        success: true,
      };

      return {
        success: true,
        user: updatedUser,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteServiceMentor = createAsyncThunk(
  "delete/service/mentor",
  async (serviceId, { getState, rejectWithValue }) => {
    try {
      console.log(serviceId);
      const response = await deleteMentorServiceApi(serviceId);
      const currentUser = getState().profile.user;

      const updatedServices = currentUser.services.filter(
        (serv) => serv.id !== serviceId
      );
      const updatedUser = {
        ...currentUser,
        services: updatedServices,
        success: true,
      };

      return {
        success: true,
        user: updatedUser,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateOtherInfoMentor = createAsyncThunk(
  "profile/update/mentor",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const response = await updateOtherInfoMentorApi(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: null,
    mentorServiceLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(profileUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(profileUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(profileEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(profileEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(profileLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(profileLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(profileDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(profileDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(profileEmploymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileEmploymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(profileEmploymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(profileCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(profileCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployHis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployHis.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteEmployHis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createServiceMentor.pending, (state) => {
        state.mentorServiceLoading = true;
        state.error = null;
      })
      .addCase(createServiceMentor.fulfilled, (state, action) => {
        state.mentorServiceLoading = false;
        state.user = action.payload.user;
      })
      .addCase(createServiceMentor.rejected, (state, action) => {
        state.mentorServiceLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteServiceMentor.pending, (state) => {
        state.mentorServiceLoading = true;
        state.error = null;
      })
      .addCase(deleteServiceMentor.fulfilled, (state, action) => {
        state.mentorServiceLoading = false;
        state.user = action.payload.user;
      })
      .addCase(deleteServiceMentor.rejected, (state, action) => {
        state.mentorServiceLoading = false;
        state.error = action.payload;
      })
      .addCase(updateServiceApiMentor.pending, (state) => {
        state.mentorServiceLoading = true;
        state.error = null;
      })
      .addCase(updateServiceApiMentor.fulfilled, (state, action) => {
        state.mentorServiceLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateServiceApiMentor.rejected, (state, action) => {
        state.mentorServiceLoading = false;
        state.error = action.payload;
      })
      .addCase(updateOtherInfoMentor.pending, (state) => {
        state.error = null;
      })
      .addCase(updateOtherInfoMentor.fulfilled, (state, action) => {})
      .addCase(updateOtherInfoMentor.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
