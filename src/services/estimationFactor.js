import axios from "axios";

export async function estimationFactor() {
  let token = localStorage.getItem("token");
  const response = await axios.get(
    "http://152.67.100.211:8090/uiconnector/api/v1/estimation-factor",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
