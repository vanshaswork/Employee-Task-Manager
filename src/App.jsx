import Modal   from "./Dashboards/others/modals"
import 'flowbite';
import React from "react"
import AppContent from "./AppContent"
import { ModalProvider } from "./context/ModalContext"
import { FetchDataProvider } from "./context/fetchData"
import Datepicker from "./Dashboards/others/datepicker"



function App() {

   return (
  
    <ModalProvider>
      <FetchDataProvider>
        <Modal />
        <AppContent />
      </FetchDataProvider>
    </ModalProvider>
  );
}


export default App
