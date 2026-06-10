import axios from "axios";
import { token } from "./token";

export async function estimationFactor() {
  const response = await axios.get(
    "http://localhost:8090/uiconnector/api/v1/estimation-factor",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
