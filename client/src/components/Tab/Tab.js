import React, { useState } from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";


const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (  
    <div className="tabs">
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} />
    </div>
  );
};

export default Tabs;
