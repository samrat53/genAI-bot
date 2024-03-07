// import { memo, useEffect, useState } from "react";
import "./App.css";
import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="flex justify-left items-center h-screen container">
      <div >
        <Header />
        <Form />
      </div>
    </div>
  );
};

export default App;
