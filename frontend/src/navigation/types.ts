import { NavigatorScreenParams } from '@react-navigation/native';

// Bottom Tab의 화면 이름들
export type MainTabsParamList = {
  Home: undefined;
  Calendar: undefined;
  Stats: undefined;
};

// Stack의 화면 이름들
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  Camera: undefined;
  Result: undefined;
};