import React, { FC } from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.less";
import Homepage from "./page/Landing";
import Launch from "./page/Launch";
import Game from "./page/Game";

export const App: FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/start" element={<Launch />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
};
