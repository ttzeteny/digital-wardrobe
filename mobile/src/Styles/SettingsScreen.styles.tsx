import { StyleSheet } from 'react-native';

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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    gap: 40,
  },
  editProfileText:{
    color: '#2C3E50',
    marginLeft: 16,
    fontSize: 24,
    fontWeight: 700,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_COLORS.main,
  },
  /* Avatar */
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  imageWrapper: {
    position: 'relative',
  },
  placeholderCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: THEME_COLORS.softGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME_COLORS.borderColor,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: THEME_COLORS.secondary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  changePhotoText: {
    marginTop: 12,
    fontSize: 14,
    color: THEME_COLORS.grayText,
    fontWeight: '500',
  },
  /* Form */
  form: {
    backgroundColor: THEME_COLORS.softGray,
    borderRadius: 16,
    padding: 10,
    paddingTop: 20,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLORS.charcoalText,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: THEME_COLORS.borderColor,
    paddingBottom: 8,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  /* Form: Date of birth */
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 10 
  },
  inputText: { 
    color: '#1A1A1A',
    fontSize: 18, 
    fontWeight: '600', 
    textAlign: 'center' 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    backgroundColor: THEME_COLORS.softGray, 
    width: '60%', 
    maxHeight: '40%', 
    borderRadius: 10, 
    padding: 10 
  },
  option: { 
    padding: 15, 
    borderRadius: 20,
    borderWidth: 1, 
    borderColor: THEME_COLORS.borderColor, 
    marginBottom: 2,
  },
  optionText: { 
    fontSize: 18, 
    textAlign: 'center' 
  },
});