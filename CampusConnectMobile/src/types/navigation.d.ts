// src/types/navigation.d.ts
import { DrawerNavigationProp } from "@react-navigation/drawer";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      HomeTabs: undefined;
      Events: undefined;
      Communities: undefined;
      Academics: undefined;
      Settings: undefined;
    }
  }
}
