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
  iconCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: THEME_COLORS.tertiary, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 10, 
  },
  /* Page */
  scrollPadding: { 
    backgroundColor: THEME_COLORS.back,
    paddingBottom: 100, 
  },
  /* Featured */
  featuredBanner: {
    margin: 20,
    marginBottom: 10,
    borderRadius: 25,
    flexDirection: 'row',
    height: 160,
    overflow: 'hidden'
  },
  bannerImageBackground: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
  },
  bannerImageTexture: {
    borderRadius: 25,
  },
  bannerTextContainer: {
    flex: 1, 
    justifyContent: 'center',
    zIndex: 2,
  },
  bannerTitle: { 
    color: '#FFF', 
    fontWeight: '900', 
    fontSize: 18, 
    letterSpacing: 1, 
  },
  bannerSub: { 
    color: '#FFF', 
    fontSize: 12, 
    marginTop: 5, 
    opacity: 0.9, 
  },
  bannerButton: { 
    backgroundColor: THEME_COLORS.secondary, 
    alignSelf: 'flex-start', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginTop: 15, 
  },
  bannerButtonText: { 
    color: 'black', 
    fontWeight: '700', 
    fontSize: 12, 
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
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: THEME_COLORS.charcoalText, 
  },
  seeAll: { 
    color: THEME_COLORS.grayText, 
    fontSize: 13, 
  },
  /* Categorys */
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
  /* Quick Actions */
  quickActionsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
  },
  actionCard: {
    height: 120,
    width: '50%', 
    padding: 15, 
    borderRadius: 25,
    marginRight: 15, 
  },
  actionContent: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  actionIconContainer: { 
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, 
    height: 40,
    borderRadius: 12,
  },
  actionTextContainer: { 
    marginLeft: 10,
  },
  actionSubTextContainer: { 
    marginTop: 10, 
    paddingHorizontal: 5, 
  },
  actionTitle: { 
    fontWeight: '700', 
    fontSize: 14, 
    color: THEME_COLORS.charcoalText, 
  },
  actionSub: {
    fontSize: 11, 
    color: THEME_COLORS.charcoalText, 
    marginTop: 4, 
  },
  activityCard: { 
    width: 300,
    height: 150,
    marginLeft: 20, 
    padding: 15, 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: THEME_COLORS.invisibleBorderColor, 
    elevation: 2, 
    shadowOpacity: 0.05, 
  },
  /* Activity Cards */
  activityImage: { 
    width: 90, 
    height: 120, 
    borderRadius: 12, 
    backgroundColor: THEME_COLORS.softGray, 
  },
  activityImageBackground: { 
    width: '100%', 
    height: '100%',
  },
  activityImageTexture: { 
    borderRadius: 12, 
    opacity: 0.9, 
  },
  activityInfo: { 
    flex: 1, 
    marginLeft: 15,
    height: '90%',
  },
  activityTag: { 
    fontSize: 10, 
    color: THEME_COLORS.charcoalText, 
    fontWeight: '700', 
    marginBottom: 2, 
  },
  activityDate: { 
    fontSize: 10, 
    color: THEME_COLORS.grayText, 
    marginBottom: 5, 
  },
  activityItemName: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: THEME_COLORS.charcoalText, 
  },
  tagRow: { 
    flexDirection: 'row',
    width: '38%',
    height: '20%',
    marginTop: 5, 
  },
  miniTag: { 
    backgroundColor: '#E8F5E9', 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 5, 
    marginRight: 5, 
  },
  miniTagText: { 
    fontSize: 10, 
    color: '#1E5631',
  },
  editButton: { 
    width: 120,
    marginTop: 10,
    paddingHorizontal: 15, 
    paddingVertical: 8,
    alignItems: 'center', 
    borderRadius: 14,
    borderColor: THEME_COLORS.borderColor,
    borderWidth: 1, 
    backgroundColor: '#ffffff', 
  },
  editButtonText: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: THEME_COLORS.charcoalText, 
  },
});