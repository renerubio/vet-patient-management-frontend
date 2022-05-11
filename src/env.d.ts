/// <reference types="vite/client" />

interface AlertInterface {
  msg?: string
  error?: boolean
}

interface PropsJSX {
  children: JSX.Element[] | JSX.Element
}

interface PatientInterface {
  _id: string,
  name: string,
  owner: string,
  email: string,
  dischargeDate: string,
  symptoms: string,
  veterinarian: string,
  __v: number,
}

interface PasswordInterface {
  currentPassword: string,
  newPassword: string,
}

interface VeterinarianInterface {
  email: string
  name: string
  phone: string | null
  web: string | null
  __v: number
  _id: string | null
}