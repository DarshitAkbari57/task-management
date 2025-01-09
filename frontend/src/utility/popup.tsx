import toast from "react-hot-toast";

export const generatePopup = (type: string, msg: string) => {
  if (type === "success") {
    return toast.success(() => (
      <div className="d-flex align-items-center gap-2">
        <div>{msg}</div>
      </div>
    ));
  } else {
    return toast.error(() => (
      <div className="d-flex align-items-center gap-2">
        <div>{msg}</div>
      </div>
    ));
  }
};
