import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import StackNavigation from "./src/navigation/Stack";
import store from "./src/redux/Store";

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigation />
      <ModalPortal />
    </Provider>
  );
}
