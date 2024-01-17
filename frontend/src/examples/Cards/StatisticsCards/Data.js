// App.js

import React from "react";
import DetailedStaticsCard from "./DetailedStatisticsCard";

function Data() {
  return (
    <div>
      {/* Example 1: Using default values */}
      <DetailedStaticsCard title="Example 1" count={42} icon={{ component: "star" }} />

      {/* Example 2: Overriding default values */}
      <DetailedStaticsCard
        title="Example 2"
        count={99}
        bgColor="primary"
        percentage={{ color: "info", count: 25, text: "%" }}
        icon={{ color: "warning", component: "favorite" }}
        direction="left"
      />

      {/* Example 3: Completely custom content */}
      <DetailedStaticsCard
        title="Custom Example"
        count="Custom Count"
        percentage={{ color: "success", count: "Custom Percentage", text: "custom text" }}
        icon={{ color: "dark", component: <span>Custom Icon</span> }}
        direction="right"
      />
    </div>
  );
}

export default Data;
