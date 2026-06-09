import axios from "axios";
import { token } from "./token";

export async function getFactorLibraries() {
  const response = await axios.get(
    "http://localhost:8090/uiconnector/api/v1/factorlibrary",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
