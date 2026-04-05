import { StyleSheet } from "react-native";

const THEME_COLORS = {
  main: '#967662',
  secondary: '#D2B496',
  tertiary: '#E4D3C6',
  // Background colors
  back: '#f8f4f0',
  softGray: '#F8F9FA',
  // Border colors
  borderColor: '#E5E5EA',
  invisibleBorderColor: '#F2F2F7',
  // Text colors
  charcoalText: '#2C3E50',
  grayText: '#8E8E93',
};

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME_COLORS.back,
  },
  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBlockColor: THEME_COLORS.borderColor,
  },
  userInfo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  avatarPlaceholder: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    marginRight: 12,
  },
  greetingText: { 
    fontSize: 14, 
    color: THEME_COLORS.grayText, 
  },
  userName: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: THEME_COLORS.charcoalText, 
  },
  headerIcons: { 
    flexDirection: 'row', 
  },
  /* Page */
  scrollPadding: { 
    backgroundColor: THEME_COLORS.back,
    paddingBottom: 400, 
  },
  /* Sections */
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    marginTop: 25, 
    marginBottom: 15, 
    alignItems: 'center',
  },
  seeAll: { 
    color: THEME_COLORS.grayText, 
    fontSize: 13, 
  },
  /* Category */
  iconCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: THEME_COLORS.tertiary, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 10, 
  },
  categoryScroll: { 
    paddingLeft: 20, 
  },
  catItem: { 
    flexDirection: 'row', 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 12, 
    backgroundColor: THEME_COLORS.invisibleBorderColor, 
    marginRight: 10, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: THEME_COLORS.borderColor, 
  },
  catItemActive: { 
    backgroundColor: THEME_COLORS.main, 
    borderColor: THEME_COLORS.borderColor, 
  },
  catLabel: { 
    marginLeft: 8, 
    fontWeight: '600', 
    fontSize: 12, 
    color: THEME_COLORS.charcoalText, 
  },
  catLabelActive: { 
    color: '#FFF', 
  },
});