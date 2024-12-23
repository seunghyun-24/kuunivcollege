import React, { useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SelectionBar from "./components/SelectionBar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import "./styles/App.css";

const App: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department);
  };

  return (
    <ReactFlowProvider>
      <div className="app">
        <Header />
        {/* <ImageSlider /> */}
        <SelectionBar onDepartmentClick={handleDepartmentClick} />
        <div className="content-container">
          <SideBar department={selectedDepartment} />
          <MainContent department={selectedDepartment} />
        </div>
        <Footer />
      </div>
    </ReactFlowProvider>
  );
};

export default App;
