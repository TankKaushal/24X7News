import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import React from 'react'
import News  from './Components/News'
import LoadingBar from "react-top-loading-bar";
import{BrowserRouter as Router, Routes,Route}from "react-router-dom";

const App=()=> {
 const pageSize=100;

 const [progress, setProgress] = useState(0);

    return (
      <div>
       <Router>
          <Navbar />
          <LoadingBar
          height={3}
        color="#f11946"
        progress={progress}
      />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} key="general"  pageSize={pageSize} country="us" category="general" />} />
            <Route exact path="/business" element={<News setProgress={setProgress} key="business"  pageSize={pageSize} country="us" category="business" />} />
            <Route exact path="/science" element={<News setProgress={setProgress} key="science"   pageSize={pageSize} country="us" category="science" />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} key="technology"   pageSize={pageSize} country="us" category="technology" />} />
            <Route exact path="/health" element={<News setProgress={setProgress} key="health"  pageSize={pageSize} country="us" category="health" />} />
            <Route exact path="/general" element={<News setProgress={setProgress} key="general"  pageSize={pageSize} country="us" category="general" />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} key="sports"  pageSize={pageSize} country="us" category="sports" />} />
          </Routes>
        </Router>
      </div>
    )
}
export default App;
