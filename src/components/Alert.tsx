const Alert: React.FC<AlertInterface> = ({ msg, error }: AlertInterface) => {  
  return (
    <div
      className={`${error ?
        'from-red-500 to-red-600' :
        'from-indigo-600 to -indigo-700'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
      {msg}
    </div>
  )
}

export default Alert