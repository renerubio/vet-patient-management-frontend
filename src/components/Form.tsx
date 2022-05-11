import React, { useState, useEffect } from "react"
import { Alert } from "../components"
import { usePatients } from "../hooks/"

const Form = (): JSX.Element => {
  const [name, setname] = useState<string>("")
  const [owner, setowner] = useState<string>("")
  const [email, setemail] = useState<string>("")
  const [dischargeDate, setdischargeDate] = useState<string>("")
  const [symptoms, setsymptoms] = useState<string>("")
  const [_id, set_id] = useState<string | null>(null)

  const [alert, setalert] = useState<AlertInterface | {}>({ msg: "", error: false })
  const { msg, error }: AlertInterface = alert

  const { savePatient, patient }: any = usePatients()

  useEffect(() => {
    window?.scrollTo(0, 0)
    if (msg === 'Saved') {
      setTimeout(() => {
        setalert({})
      }, 3000);
    }
  }, [alert])

  useEffect(() => {
    if (patient?._id) {
      setname(patient.name)
      setowner(patient.owner)
      setemail(patient.email)
      setdischargeDate(new Date(patient.dischargeDate).toISOString())
      setsymptoms(patient.symptoms)
      set_id(patient._id)
    }
  }, [patient])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ([name, owner, email, dischargeDate, symptoms].includes('')) {
      setalert({ msg: 'All fields are required', error: true })
      return
    }

    savePatient({ name, owner, email, dischargeDate, symptoms, _id })

    setalert({ msg: 'Saved', error: false })

    setname("")
    setowner("")
    setemail("")
    setdischargeDate("")
    setsymptoms("")
    set_id("")
  }

  return (
    <>
      {msg && <Alert {...alert} />}
      <h2 className="font-black text-3xl text-center">
        Management of Patients
      </h2>
      <p className="text-lg mt-5 mb-10 text-center">
        Add your patients and  <span className="text-indigo-400 font-bold"> manage them</span>
      </p>

      <form action=""
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-sm rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="pet"
            className="text-gray-700 uppercase font-bold"
          >Pet name</label>
          <input type="text" name="pet" id="pet"
            placeholder="Pet name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" onChange={(e: any) => setname(e.target.value)}
            value={name}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="owner"
            className="text-gray-700 uppercase font-bold"
          >Pet Owner</label>
          <input type="text" name="owner" id="owner"
            placeholder="Pet Owner"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" onChange={(e: any) => setowner(e.target.value)}
            value={owner}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >Email Owner</label>
          <input type="email" name="email" id="email"
            placeholder="Email Owner"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" onChange={(e: any) => setemail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="dischargeDate"
            className="text-gray-700 uppercase font-bold"
          >Discharge date</label>
          <input type="date" name="dischargeDate" id="dischargeDate"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" onChange={(e: any) => setdischargeDate(e.target.value)}
            value={dischargeDate}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="symptom"
            className="text-gray-700 uppercase font-bold"
          >Symptoms</label>
          <textarea name="symptom" id="symptom"
            placeholder="Describes symptoms"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" onChange={(e: any) => setsymptoms(e.target.value)}
            value={symptoms}
          />
        </div>

        <input
          type="submit"
          value={_id ? "Save changes" : "Add Patient"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-md" />

      </form>
    </>
  )
}

export default Form
