import PageMap from "../../Utils/PageMap";
import RouteMap, { RouteUtil } from "../../Utils/RouteMap";
import Route from "Common/Types/API/Route";
import IconProp from "Common/Types/Icon/IconProp";
import Link from "Common/Types/Link";
import SideMenu from "Common/UI/Components/SideMenu/SideMenu";
import SideMenuItem from "Common/UI/Components/SideMenu/SideMenuItem";
import SideMenuSection from "Common/UI/Components/SideMenu/SideMenuSection";
import Navigation from "Common/UI/Utils/Navigation";
import React, { ReactElement } from "react";

const DashboardSideMenu: () => JSX.Element = (): ReactElement => {
  let subItemMenuLink: Link | undefined = undefined;

  if (
    Navigation.isOnThisPage(
      RouteMap[PageMap.ON_CALL_DUTY_EXECUTION_LOGS_TIMELINE]!,
    )
  ) {
    subItemMenuLink = {
      title: "Timeline",
      to: Navigation.getCurrentRoute(),
    };
  }

  return (
    <SideMenu>
      <SideMenuSection title="Policies">
        <SideMenuItem
          link={{
            title: "On-Call Policies",
            to: RouteUtil.populateRouteParams(
              RouteMap[PageMap.ON_CALL_DUTY_POLICIES] as Route,
            ),
          }}
          icon={IconProp.Call}
        />
      </SideMenuSection>
      <SideMenuSection title="Schedules">
        <SideMenuItem
          link={{
            title: "On-Call Schedules",
            to: RouteUtil.populateRouteParams(
              RouteMap[PageMap.ON_CALL_DUTY_SCHEDULES] as Route,
            ),
          }}
          icon={IconProp.Calendar}
        />
      </SideMenuSection>
      <SideMenuSection title="Advanced">
        <SideMenuItem
          link={{
            title: "User Overrides",
            to: RouteUtil.populateRouteParams(
              RouteMap[PageMap.ON_CALL_DUTY_POLICY_USER_OVERRIDES] as Route,
            ),
          }}
          icon={IconProp.User}
        />

        <SideMenuItem
          link={{
            title: "Execution Logs",
            to: RouteUtil.populateRouteParams(
              RouteMap[PageMap.ON_CALL_DUTY_EXECUTION_LOGS] as Route,
            ),
          }}
          icon={IconProp.Logs}
          subItemIcon={IconProp.Clock}
          subItemLink={subItemMenuLink}
        />
      </SideMenuSection>
      <SideMenuSection title="Reports">
        <SideMenuItem
          link={{
            title: "User On Call Time",
            to: RouteUtil.populateRouteParams(
              RouteMap[PageMap.ON_CALLDUTY_USER_TIME_LOGS] as Route,
            ),
          }}
          icon={IconProp.Clock}
        />
      </SideMenuSection>
      <SideMenuSection title="Workspace Connections">
        <SideMenuItem
          link={{
            title: "Slack",
            to: RouteUtil.populateRouteParams(
              RouteMap[
                PageMap.ON_CALL_DUTY_WORKSPACE_CONNECTION_SLACK
              ] as Route,
            ),
          }}
          icon={IconProp.Slack}
        />

        <SideMenuItem
          link={{
            title: "Microsoft Teams",
            to: RouteUtil.populateRouteParams(
              RouteMap[
                PageMap.ON_CALL_DUTY_WORKSPACE_CONNECTION_MICROSOFT_TEAMS
              ] as Route,
            ),
          }}
          icon={IconProp.MicrosoftTeams}
        />
      </SideMenuSection>
    </SideMenu>
  );
};

export default DashboardSideMenu;
