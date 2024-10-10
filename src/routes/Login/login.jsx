import yodaImg from "../../assets/yoda.jpg"

const LoginPage = () => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 h-dvh">
      <div className="pt-12 pb-10 px-40 flex flex-col gap-2">
        <div className="py-3">
          <span className="text-3xl text-blue-800">👌</span>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <span className="font-bold text-3xl text-blue-950">Welcome back!</span>
          <span className="font-light italic text-sm text-gray-400">Kindly fill in your details</span>
        </div>
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg text-blue-950">Email</label>
            <input className="border-2 border-gray-300 p-3 rounded-md" type="text" name="" id="" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg text-blue-950">Password</label>
            <input className="border-2 border-gray-300 p-3 rounded-md" type="password" name="" id="" />
          </div>
          <div className="flex justify-end px-2">
            <span className="text-blue-700">Forgot Password?</span>
          </div>
          <div className="flex">
            <button className="bg-blue-600 p-4 rounded-md w-full font-bold text-white" type="submit">Log In</button>
          </div>
        </form>
      </div>
      {/* 2nd grid */}
      <div className="bg-cover bg-center rounded-2xl relative p-2 overflow-hidden" style={{backgroundImage: `url(${yodaImg})`}}>
        <div className="absolute inset-0 h-full bg-black opacity-50 z-10"></div>
        <div className="absolute inset-0 h-full text-white z-20 flex flex-col gap-2 justify-center items-center">
          <span className="text-xl">{`"Dashboards are item of the future for visualization "`}</span>
          <span className="text-lg items-right">{`- Carl Jung`}</span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;