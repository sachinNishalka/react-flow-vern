import axios from "axios";

export async function getEstimationFactors() {
  const response = await axios.get("http://localhost:8080/factor-library");
  return response.data;
}
