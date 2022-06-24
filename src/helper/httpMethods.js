import axios from "axios";
import { NotificationManager } from "react-notifications";
export let baseUrl = null;
baseUrl = process.env.REACT_APP_API_URL;


//check if the internet is connected

export const httpPost = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }


  //post api with the base URL and url headers with the token as the headers
  try {
    const res = await axios.post(`${baseUrl}${url}`, postBody, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
      NotificationManager.error(
        "Your token is invalid or expired, please login",
        "Opps!",
        5000
      );
    }
    if (error.response.data.message === "Validation Error!") {
      NotificationManager.error(
        Object.values(error.response.data.data).join("  ")
      );
      return;
    }
    return { er: error.response.data };
  }
};

export const httpPostData = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }

  try {
    const res = await axios.post(`${baseUrl}/api${url}`, postBody, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
      NotificationManager.error(
        "Your token is invalid or expired, please login",
        "Opps!",
        5000
      );
    }
    return { er: error.response.data };
  }
};

export const httpGet = async (url) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.get(`${baseUrl}${url}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    console.log("eeeeeeee", error.response.data.message);
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
      localStorage.setItem("expiredToken", "true");
      localStorage.setItem("showModal", "true");
      return { er: error.response.data.message };
    }
    if (error.response.data.message === "Validation Error!") {
      NotificationManager.error(
        Object.values(error.response.data.data).join("  ")
      );
      return;
    }
    return { er: error.response.data };
  }
};

export const httpPut = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.put(`${baseUrl}/${url}`, postBody, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    NotificationManager.error(
      "Your token is invalid or expired, please login",
      "Opps!",
      5000
    );
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
    }
    return { er: error.response.data };
  }
};

export const httpPatch = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.patch(`${baseUrl}/${url}`, postBody, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    NotificationManager.error(
      "Your token is invalid or expired, please login",
      "Opps!",
      5000
    );
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
    }
    return { er: error.response.data };
  }
};

export const httpDelete = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.delete(`${baseUrl}/${url}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res;
  } catch (error) {
    return { er: error.response.data };
  }
};
