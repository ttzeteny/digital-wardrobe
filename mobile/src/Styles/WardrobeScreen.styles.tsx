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
  categoryScroll: { 
    marginTop: 20,
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
  addButtonView:{
    width: 125,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'flex-end',
    marginRight: 20,
    marginBottom: 30,
  },
  addButton: {
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: THEME_COLORS.borderColor,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: THEME_COLORS.secondary,
  },
  addButtonText: {
    color: 'white',
    fontSize: 50,
    fontWeight: '200',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    paddingBottom: 65,
  },
  itemsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 50,
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  priceTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 4
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  cardInfo: {
    padding: 10,
  },
  cardBrand: {
    fontSize: 11,
    color: '#8E8E93',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  cardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 3,
  },
});