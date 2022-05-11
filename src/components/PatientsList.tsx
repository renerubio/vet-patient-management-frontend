import { usePatients } from "../hooks"
import Patient from "./Patient"

const PatientsList = (): JSX.Element => {

  const { patients }: any = usePatients()

  return patients.length ?
    (
      <>
        <h2 className="font-black text-3xl text-center">
          List of Patients
        </h2>
        <p className="text-lg mt-5 mb-10 text-center">
          Manage your <span className="text-indigo-400 font-bold"> patients and appoinments</span>
        </p>
        {
          patients.map((patient: PatientInterface) => (
            <Patient
              key={patient?._id}
              {...patient}
            />
          ))
        }
      </>
    ) : (
      <>
        <h2 className="font-black text-3xl text-center">
          There's no patients
        </h2>
        <p className="text-lg mt-5 mb-10 text-center">
          Let's add patients <span className="text-indigo-400 font-bold"> and displayed here</span>
        </p>
      </>
    )

}

export default PatientsList