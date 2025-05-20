import StandardSection from "../components/StandardSection";
import HomeLayout from "../layout/HomeLayout";
import UserNavProfile from "../components/UserNavProfile";
import FormUserAddresses from "../components/FormUserAddresses";
import { useState } from "react";

const UserAddresses = () => {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  return (
    <HomeLayout>
      <StandardSection>
        <div className="flex gap-8 pt-8">
          <UserNavProfile />
          <div className="p-8 border rounded-md flex-1">
            <div className="flex justify-between">
              <h3 className="mb-4 text-gray-800 text-2xl md:text-3xl">
                Direcciones
              </h3>

              <button
                className="nline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                onClick={() => setOpen(true)}
              >
                AGREGAR NUEVA DIRECCIÓN
              </button>
            </div>
            <div>
              {addresses.length > 1 ? (
                addresses.map((address, i) => <li key={i}>{address.name}</li>)
              ) : (
                <p>Todavía no has registrado ninguna dirección.</p>
              )}
            </div>
            {open && <FormUserAddresses />}
          </div>
        </div>
      </StandardSection>
    </HomeLayout>
  );
};

export default UserAddresses;
