import { ApplicationInsights } from "@microsoft/applicationinsights-web";

const key =
  "InstrumentationKey=c5827821-b6fc-4c41-a429-da75445f280b;IngestionEndpoint=https://japaneast-1.in.applicationinsights.azure.com/;LiveEndpoint=https://japaneast.livediagnostics.monitor.azure.com/";
const appInsights = new ApplicationInsights({
  config: {
    connectionString: key,
  },
});
appInsights.loadAppInsights();
appInsights.trackPageView();

export const clickInsights = (buttonId: string, btnType: string) => {
  appInsights.trackEvent({
    name: "ButtonClicked",
    properties: { buttonId: buttonId, btnType: btnType },
  });
};

export const LeaveInsights = (PageName: string) => {
  appInsights.trackPageView({ name: PageName });
};

export const leaveAppInsights = () => {
  appInsights.flush();
};

export const handleSearchInsights = (query: string) => {
  appInsights.trackEvent({ name: "Search", properties: { query } });
};
export default appInsights;
