import StandardSection from "../components/StandardSection";
import { useFetchBackups } from "../hooks/useFetchBackups";
import AdminLayout from "../layout/AdminLayout";
import TableBackup from "../components/TableBackup";
import { axiosInstance } from "../services/axios.config";
import { ToastContainer, toast } from "react-toastify";

const ShowBackup = () => {
  const { items, setItems } = useFetchBackups();

  const notifySuccess = (noty, options = {}) => toast.success(noty, options);

  const notifyError = (noty, options = {}) => toast.error(noty, options);

  const generateBackup = async () => {
    try {
      const res = await axiosInstance.post(`/api/backup/generate`);

      if (!res.status === 200 || !res.status === 201) {
        throw new Error(`[${res.status}] ERROR en la solicitud`);
      }
      const data = res.data.data;

      setItems(data);
      notifySuccess("¡Respaldo generado con éxito!", {
        position: "top-center",
      });
    } catch (error) {
      notifyError("Ocurrió un error", {
        position: "top-center",
      });
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <StandardSection className="pt-[4rem]">
        <h1 className="text-2xl pt-4 md:text-3xl text-gray-800 text-center mb-8 md:mb-14">
          Respaldos
        </h1>
        <ToastContainer />
        <div className="flex justify-end">
          <button
            onClick={generateBackup}
            className="mb-4 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 md:px-8 shadow-sm hover:shadow-md bg-red-500 border-red-500 text-slate-50 hover:bg-red-400 hover:border-red-400"
          >
            GENERAR RESPALDO
          </button>
        </div>

        <div className="p-4">
          {items.length > 0 ? (
            <TableBackup items={items} setItems={setItems} />
          ) : (
            <p className="text-center">No hay respaldos en el sistema</p>
          )}
        </div>
      </StandardSection>
    </AdminLayout>
  );
};

export default ShowBackup;
