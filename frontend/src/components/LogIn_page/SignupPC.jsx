import SignupForm from "./SignupForm";
import Logo from "../../assets/logo/ghost-pink.svg";

export default function SignupPC() {
  return (
    <div className="bg-green-lighter h-screen w-custom rounded-r-2xl shadow-lg shadow-dark-default lg:block hidden">
      <div className="bg-orange-lighter h-screen w-custom rounded-r-2xl  shadow-lg shadow-dark-default">
        <div className="bg-blue-default h-screen w-custom rounded-r-2xl shadow-lg shadow-dark-default flex justify-center items-center py-10">
          <div className="flex justify-center items-center">
            <div className="relative h-full">
              {/* div background vert en arrière-plan */}
              <div className="absolute top-[8px] left-[8px] bg-green-lighter w-10/12 h-full max-h-[650px] rounded-2xl border-solid border border-dark" />
              {/* div 1er plan avec form et logo */}
              <div className="relative flex flex-col justify-center bg-cream rounded-2xl  p-5 w-10/12 h-full max-h-[650px] border-solid border-[1px] border-dark-default">
                <SignupForm />
                <img
                  src={Logo}
                  alt="Logo fantôme Hop Hop Hop version fond rose"
                  className="w-28 my-7 block mx-auto absolute -bottom-12 -right-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
