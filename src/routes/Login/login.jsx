import yodaImg from "../../assets/yoda.jpg";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInAuthEmailAndPassword } from "../../utils/firebase";

const LoginPage = () => {
  const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm();
  const navigate = useNavigate();

  const onSubmitHandler = async (data) => {
    const {email, password} = data;
    if (email !== "buvencommunicationsltd@gmail.com"){
      setError('root', {
        type: '400',
      })
    };
    await signInAuthEmailAndPassword(email, password)
    .then((response) => {
      localStorage.setItem('Auth_Token', response._tokenResponse.refreshToken);
      navigate("/home");
    })
    .catch(error => {
      setError('root', {
        type: error.code
      })
    })
    
  }

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
        <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
          {errors.root && <p className="text-red-600 text-sm">Incorrect Email or Password</p>}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg text-blue-950">Email</label>
            <input className="border-2 border-gray-300 p-3 rounded-md" type="text" {...register("email", {required: "Email is required"})} />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg text-blue-950">Password</label>
            <input className="border-2 border-gray-300 p-3 rounded-md" type="password" {...register("password", {required: "Password is required"})} />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>
          <div className="flex">
            <button className="bg-blue-600 p-4 rounded-md w-full font-bold text-white" type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Log In"}</button>
          </div>
        </form>
      </div>
      {/* 2nd grid */}
      <div className="bg-cover bg-center rounded-2xl relative p-2 overflow-hidden" style={{backgroundImage: `url(${yodaImg})`}}>
        <div className="absolute inset-0 h-full bg-black opacity-50 z-10"></div>
        <div className="absolute inset-0 h-full text-white z-20 flex flex-col gap-2 justify-center items-center p-12">
          <span className="text-xl text-justify">{`"The effectiveness of data visualization can be gauged by its simplicity, relevancy, and its ability to hold the user's hand during their data discovery journey"`}</span>
          <span className="text-lg items-right">{`- Jagat Saikia`}</span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;