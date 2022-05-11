import { createContext, useState, useEffect } from "react"
import clientAxios from "../config/axios"

const PatientContext = createContext<object | undefined>(undefined)

const PatientProvider = ({ children }: PropsJSX) => {

  const [patients, setpatients] = useState<Array<string>>([])
  const [patient, setpatient] = useState<PatientInterface | {}>({})

  const token = localStorage.getItem("token")
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    const getPatients = async () => {
      try {
        if (!token) return

        const { data } = await clientAxios.get('/patients', config)

        setpatients(data)

      } catch (error: any) {
        console.error(error);
      }
    }
    getPatients()
  }, [])


  const savePatient = async (patient: PatientInterface) => {
    if (patient._id) {
      try {
        const { data } = await clientAxios.put(`/patients/${patient._id}`, patient, config)

        const patientsUpdated: any = patients.map((patientState: any) => {
          return patientState._id === data._id ? data : patientState
        })

        setpatients(patientsUpdated)

      } catch (error: any) {
        console.error(error.response.data.msg)
      }
    } else {
      try {
        const { data } = await clientAxios.post('/patients', patient, config)

        const { createdAt, updateAt, __v, ...patientSaved } = data

        setpatients([patientSaved, patients])

      } catch (error: any) {
        console.error(error.response.data.msg)
      }
    }
  }

  const setEdition = (patient: PatientInterface) => {
    setpatient(patient)
  }

  const deletePatient = async (_id: string) => {
    const confirm: any = window.confirm("confirm delete")
    if (confirm) {
      try {
        const { data } = await clientAxios.delete(`/patients/${_id}`, config)

        const patientsUpdated = patients.filter((patientState: any) => patientState._id !== _id)

        setpatients(patientsUpdated)

      } catch (error: any) {
        console.error(error.response.data.msg)
      }
    }
  }

  return (
    <PatientContext.Provider
      value={{
        patients,
        savePatient,
        setEdition,
        patient,
        deletePatient
      }}
    >
      {children}
    </PatientContext.Provider >
  )
}

export {
  PatientProvider
}

export default PatientContext

