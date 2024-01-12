import React from "react";
import HoldTabs from "./holdTabs";
import HoldCard from "./holdCard";
import HoldersCard from "./holdersCard";

interface Props {
  // Add your props here
}

const HoldingsView: React.FC<Props> = () => {
  // Add your component logic here

  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className="border-[2px] min-w-[355px] rounded-[16px]  border-[#0D0D0D] border-solid h-[684px] px-[16px] py-[16px] bg-white">
      <HoldTabs
        currentTab={tabIndex}
        setCurrentTab={(val) => {
          setTabIndex(val);
        }}
      ></HoldTabs>

      <div className="mt-[12px]">
        {tabIndex === 0 ? (
          <div>
            <HoldCard></HoldCard>
          </div>
        ) : (
          <div>
            <div className="mb-[16px]">
              <HoldersCard></HoldersCard>
            </div>
            <div>
              <HoldersCard></HoldersCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoldingsView;
