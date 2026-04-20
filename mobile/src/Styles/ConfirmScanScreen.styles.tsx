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
  cancelButtonText:{
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
  },
  detailsText:{
    color: '#2C3E50',
    marginLeft: 12,
    fontSize: 24,
    fontWeight: 700,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_COLORS.main,
  },
  /* Image */
  imageContainer: {
    height: 400,
    backgroundColor: THEME_COLORS.softGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 100,
    marginVertical: 20,
    marginBottom: 20,
  },
  retakePhotoText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: THEME_COLORS.grayText,
  },
  /* Form */
  form: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: THEME_COLORS.softGray,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 50,
    paddingBottom: 20,
  },
  formLabel: {
    paddingLeft: 10,
    marginBottom: 4,
    fontSize: 18,
    color: THEME_COLORS.charcoalText,
    fontWeight: '600',
    marginTop: 10,
  },
  tagsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight: 10,
  },
  tagsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tagCounterText: {
    color: THEME_COLORS.grayText,
    fontSize: 13,
    fontWeight: '500',
  },
  addTagButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  removeTagButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b95a5a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  disabledTagButton: {
    backgroundColor: '#C9C9C9',
  },
  addTagButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  removeTagButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  inputRowOneTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
    marginVertical: 10,
    height: 50,
  },
  inputRowMultiTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
    height: 50,
  },
  inputOneTag: {
    marginTop: 10,
    width: '100%',
  },
  inputMultiTag: {
    marginTop: 10,
    width: '48%',
  },
  textInput: {  
    borderBottomWidth: 1,
    borderColor: THEME_COLORS.borderColor,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: THEME_COLORS.charcoalText,
  },
  textInputLabel: {
    paddingLeft: 10,
    marginBottom: 4,
    fontSize: 16,
    color: THEME_COLORS.charcoalText,
  },
  required: {
    color: '#FF3B30',
  },
});