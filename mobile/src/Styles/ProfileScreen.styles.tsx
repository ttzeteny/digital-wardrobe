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
    paddingHorizontal: 20,
  },
  /* Header Styles */
  header: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 25, 
    marginBottom: 15,
    borderRadius: 20,
    padding: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: THEME_COLORS.softGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME_COLORS.borderColor,
  },
  headerData: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 27,
    fontWeight: '700',
    color: THEME_COLORS.charcoalText,
  },
  userEmail: {
    fontSize: 17,
    color: THEME_COLORS.grayText,
  },
  editButton: {
    backgroundColor: THEME_COLORS.secondary,
    flexDirection: 'row',
    gap: 8,
    height: 40,
    width: 120,
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: THEME_COLORS.borderColor
  },
  editButtonText: {
    color: 'white' ,
    fontWeight: 700,
  },
  /* Stats */
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginBottom: 30,
    borderColor: THEME_COLORS.borderColor,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME_COLORS.main,
  },
  statLabel: {
    color: THEME_COLORS.grayText,
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  /* Settings */
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
    color: THEME_COLORS.charcoalText,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.invisibleBorderColor,
  },
  menuItemLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: THEME_COLORS.charcoalText,
  },
});