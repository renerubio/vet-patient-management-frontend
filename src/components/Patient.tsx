import { usePatients } from "../hooks"

const Patient = (patient: PatientInterface): JSX.Element => {
  const { setEdition, deletePatient }: any = usePatients()

  const { name, owner, email, dischargeDate, symptoms, _id } = patient

  const formatDate = (date: string) => {
    if (!date) return

    const newDate = new Date(date)
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(newDate)
  }
  return (
    <div className="mx-5 my-5 bg-white shadow-md px-5 py-7 rounded-xl" >
      <ul>
        <li className="font-bold uppercase">Name:
          <span className="font-normal normal-case"> {name}</span>
        </li>
        <li className="font-bold uppercase">Owner:
          <span className="font-normal normal-case"> {owner}</span>
        </li>
        <li className="font-bold uppercase">Email:
          <span className="font-normal normal-case"> {email}</span>
        </li>
        <li className="font-bold uppercase">Discharge Date:
          <span className="font-normal normal-case"> {formatDate(dischargeDate)}</span>
        </li>
        <li className="font-bold uppercase">Symptoms:
          <span className="font-normal normal-case"> {symptoms}</span>
        </li>
        {
          /* <li className="font-bold uppercase">id:
            <span className="font-normal normal-case"> {_id}</span>
          </li> */
        }
      </ul>
      <div className="flex justify-between mt-5">
        <button
          className="px-10 py-2 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
          onClick={() => setEdition(patient)}
        >
          Edit
        </button>
        <button
          className="px-10 py-2 bg-rose-500 hover:bg-rose-700 text-white uppercase font-bold rounded-lg"
          onClick={() => deletePatient(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Patient