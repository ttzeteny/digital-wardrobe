import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  userInfo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  avatarPlaceholder: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    backgroundColor: '#E5E5EA', 
    marginRight: 12,
  },
  greetingText: { 
    fontSize: 14, 
    color: '#8E8E93', 
  },
  userName: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#2C3E50', 
  },
  headerIcons: { 
    flexDirection: 'row', 
  },
  iconCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#E4D3C6', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 10, 
  },
  
  scrollPadding: { 
    paddingBottom: 100, 
  },
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
    backgroundColor: '#D2B496', 
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
    color: '#2C3E50', 
  },
  seeAll: { 
    color: '#8E8E93', 
    fontSize: 13, 
  },
  categoryScroll: { 
    paddingLeft: 20, 
  },
  catItem: { 
    flexDirection: 'row', 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 25, 
    backgroundColor: '#F2F2F7', 
    marginRight: 10, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E5E5EA', 
  },
  catItemActive: { 
    backgroundColor: '#967662', 
    borderColor: '#E5E5EA', 
  },
  catLabel: { 
    marginLeft: 8, 
    fontWeight: '600', 
    fontSize: 12, 
    color: '#2C3E50', 
  },
  catLabelActive: { 
    color: '#FFF', 
  },

  quickActionsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
  },
  actionCard: { 
    width: '48%', 
    padding: 15, 
    borderRadius: 20, 
  },
  actionTitle: { 
    fontWeight: '700', 
    marginTop: 10, 
    fontSize: 14, 
    color: '#2C3E50', 
  },
  actionSub: { 
    fontSize: 11, 
    color: '#8E8E93', 
    marginTop: 4, 
  },
  activityCard: { 
    marginHorizontal: 20, 
    padding: 15, 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#F2F2F7', 
    elevation: 2, 
    shadowOpacity: 0.05, 
  },
  activityImage: { 
    width: 70, 
    height: 80, 
    borderRadius: 12, 
    backgroundColor: '#F8F9FA', 
  },
  activityInfo: { 
    flex: 1, 
    marginLeft: 15, 
  },
  activityTag: { 
    fontSize: 10, 
    color: '#2C3E50', 
    fontWeight: '700', 
    marginBottom: 2, 
  },
  activityItemName: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#2C3E50', 
  },
  tagRow: { 
    flexDirection: 'row', 
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
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 10, 
    backgroundColor: '#F2F2F7', 
  },
  editButtonText: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#2C3E50', 
  },
});