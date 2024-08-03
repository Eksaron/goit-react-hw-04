import axios from "axios";

export const fetchUnsplashPhotos = async ({ query, page, per_page = 12 }) => {
  // console.log("fetch.query:>>", query);
  // console.log("fetch.page :>> ", page);
  const accessKey = "qzthPZ-am69y9n4XW2o7-FWmsJqkdhAjWOWIMQcQDKI";
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        page,
        per_page,
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
    });
    // console.log("response :>> ", response);
    return response;
  } catch (error) {
    throw error;
  }
};
