import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ImageSlider from "./components/ImageSlider";
import Footer from "./components/Footer";
import "./styles/App.css";

const App: React.FC = () => {
  // 학과 상태를 저장
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="app">
      <Header />
      <ImageSlider />
      <div className="content-container">
        <Sidebar onDepartmentClick={handleDepartmentClick} />
        <MainContent department={selectedDepartment} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
