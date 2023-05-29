import { atom, useRecoilState } from "recoil";
import DisplayAlert from "../components/DisplayAlert";

type Alert = {
  status: "error" | "success" | null;
  message: string | null;
};

const alertState = atom<Alert>({
  key: "alertState",
  default: { status: null, message: null },
});

export default function useAlert() {
  const [alert, setAlert] = useRecoilState(alertState);
  return { alert, setAlert, ComponentAlert:DisplayAlert };
}
