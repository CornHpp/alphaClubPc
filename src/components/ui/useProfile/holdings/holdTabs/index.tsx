import React from "react";

const lists = [
  {
    name: "Holdings",
  },
  {
    name: "Holders",
  },
];
interface holdTabsProps {
  currentTab: number;
  setCurrentTab: (currentTab: number) => void;
}

const HoldTabs: React.FC<holdTabsProps> = (props) => {
  const { currentTab, setCurrentTab } = props;
  return (
    <div className="flex ">
      {lists.map((item, index) => {
        return (
          <div
            key={index + "q"}
            className="mr-[12px]  cursor-pointer  "
            style={{
              fontWeight: index === currentTab ? "700" : "600",
              fontSize: index === currentTab ? "20px" : "16px",
              marginTop: index === currentTab ? "0px" : "5px",
            }}
            onClick={() => {
              setCurrentTab(index);
            }}
          >
            <div> {item.name}</div>

            {index === currentTab && (
              <div className="w-[91px] h-[6px] bg-[#00FC6E] mt-[-10px]"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HoldTabs;
