import * as React from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.timeout = process.env.REACT_APP_TIMEOUT;
//axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post["Accept"] = "application/json";
//axios.defaults.headers.common.accept = 'application/json';

axios.interceptors.request.use(
  async (config) => {
    const token =
      localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosJson = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: process.env.REACT_APP_TIMEOUT,
});

export async function login(values) {
  const { data } = await axios.post(`auth/login`, values);
  return data;
}

export async function signup(values) {
  const { data } = await axios.post(`auth/register`, values);
  return data;
}

export async function user() {
  const { data } = await axios.get(`auth/user`);
  return data;
}

export async function forgotPassword(values) {
  const { data } = await axios.post(`auth/forgot-password`, values);
  return data;
}

export async function resetPassword(values) {
  const { data } = await axios.post(`auth/reset-password`, values);
  return data;
}

/* USER */
export async function userUpdate(values) {
  const { data, error } = await axios.post(`profile/update`, values);
  return data;
}

/* DRUGS */
export const drugCategories = async () => {
  const { data } = await axios.get(`drug/categories`);
  return data;
};

export const drugDetails = async (drug_uuid) => {
  const { data } = await axios.get(`drug/${drug_uuid}`);
  return data;
};

export const drugs = async (query) => {
  const { data } = await axios.get(`drugs/${query}`);
  return data;
};

/* CART */
export const carts = async (cartSessionId) => {
  const { data } = await axios.get(`cart/items?cart_uuid=${cartSessionId}`);
  return data;
};

export const cartAdd = async (values) => {
  const { data } = await axios.post(`cart/add`, values);
  return data;
};

export const cartAddPrescription = async (values) => {
  const { data } = await axios.post(`cart/add-prescription`, values);
  return data;
};

export const cartRemove = async (values) => {
  const { data } = await axios.post(`cart/remove`, values);
  return data;
};

export const cartUpdate = async (values) => {
  const { data } = await axios.post(`cart/update`, values);
  return data;
};

export const cartUploadPresc = async (values) => {
  const { data } = await axios.post(`cart/add-prescription`, values);
  return data;
};

/* DRUGS */
export const doctorCategories = async () => {
  const { data } = await axios.get(`doctors/specializations`);
  return data;
};

export const doctors = async (query) => {
  const { data } = await axios.get(`doctors/${query}`);
  return data;
};

export const doctorDetails = async (uuid) => {
  const { data } = await axios.get(`doctor/${uuid}`);
  return data;
};

export const subscriptionsWithDoctor = async (uuid) => {
  const [service, doctor] = await Promise.all([
    axios.get(`service`),
    axios.get(`doctor/${uuid}`),
  ]);
  return { service: service?.data, doctorData: doctor?.data };
};

export const subscriptionsWithMedicalCenters = async () => {
  const [service, medicalCenters, user] = await Promise.all([
    axios.get(`service`),
    axios.get(`health-centers`),
    axios.get(`auth/user`),
  ]);
  return {
    service: service?.data,
    medicalCenters: medicalCenters?.data,
    user: user?.data?.user,
  };
};

export const subscriptions = async () => {
  const { data } = await axios.get(`service`);
  return data;
};

export const subscribeDoctor = async (values) => {
  const { data } = await axios.post(`/service/doctor`, values);
  return data;
};

export const subscriptionsWithFitness = async () => {
  const [service, user] = await Promise.all([
    axios.get(`service`),
    axios.get(`auth/user`),
  ]);
  return { service: service?.data, user: user?.data?.user };
};

export const subscribeFitness = async (values) => {
  const { data } = await axios.post(`/service/fitness`, values);
  return data;
};

export const packages = async () => {
  const { data } = await axios.get(`/packages`);
  return data;
};

export const medicalCenters = async () => {
  const { data } = await axios.get(`/health-centers`);
  return data;
};

export const subscribe = async (values) => {
  const { data } = await axios.post(`/packages/subscribe`, values);
  return data;
};

/* CHECKOUT */
export const checkout = async (values) => {
  const { data } = await axios.post(`order/checkout`, values);
  return data;
};

export const checkoutSummary = async (values) => {
  const { data } = await axios.post(`order/checkout/summary`, values);
  return data;
};

export const locations = async () => {
  const { data } = await axios.get(`locations`);
  return data;
};

export const pickupLocations = async () => {
  const { data } = await axios.get(`pickup-locations`);
  return data;
};

/* Appointment doctor appointment */
export const makeAppointment = async (values) => {
  const { data } = await axios.post(`appointments/book`, values);
  return data;
};

/* Appointment doctor appointment */
export const makeHospitalAppointment = async (values) => {
  const { data } = await axios.post(`appointments/hospital/book`, values);
  return data;
};

export const appointments = async (query) => {
  const { data } = await axios.get(`profile/appointments${query}`);
  return data;
};

export const orders = async (query) => {
  const { data } = await axios.get(`profile/orders${query}`);
  return data;
};

export const viewOrders = async (query) => {
  const { data } = await axios.get(`profile/order${query}/view/`);
  return data;
};
/* Review */
export const reviewAdd = async (values) => {
  const { data } = await axios.post(`review/add`, values);
  return data;
};

export const reviews = async (drug_uuid) => {
  const { data } = await axios.get(`review/${drug_uuid}`);
  return data;
};
