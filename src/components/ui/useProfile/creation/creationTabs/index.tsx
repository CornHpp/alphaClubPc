import React from "react";

const lists = [
  {
    name: "Events",
  },
  {
    name: "Short Recording",
  },
  {
    name: "Activity",
  },
];

interface tabsProps {
  currentTab: number;
  setCurrentTab: (currentTab: number) => void;
}
const CreationTabs: React.FC<tabsProps> = (props) => {
  const { currentTab, setCurrentTab } = props as tabsProps;
  return (
    <div className="flex">
      {lists.map((item, index) => {
        return (
          <div
            key={index + "q"}
            className="mr-[4px] text-[12px] py-[3px] px-[10px]  rounded-[16px] cursor-pointer flex items-center justify-center"
            style={{
              fontWeight: index === currentTab ? "600" : "500",
              border:
                index === currentTab ? "2px solid #0D0D0D" : "2px solid #fff",
            }}
            onClick={() => {
              setCurrentTab(index);
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default CreationTabs;
