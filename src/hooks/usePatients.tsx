import { useContext } from "react";
import PatientContext from "../context/PatientProvider";

const usePatients = () => {
  return useContext(PatientContext)
}

export default usePatients