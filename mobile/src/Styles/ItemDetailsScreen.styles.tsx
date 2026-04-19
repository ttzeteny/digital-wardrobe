import { StyleSheet } from "react-native";

const THEME = {
  main: '#967662',
  secondary: '#D2B496',
  back: '#f8f4f0',
  charcoal: '#2C3E50',
  gray: '#8E8E93',
  softGray: '#d7d8da',
  border: '#E5E5EA',
  white: '#FFFFFF'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.back,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: THEME.border
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.charcoal
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40
  },
  imageBox: {
    width: '100%',
    height: 350,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  form: {
    width: '100%'
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.gray,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  textInput: {
    backgroundColor: THEME.softGray,
    borderWidth: 1,
    borderColor: THEME.border,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: THEME.charcoal
  },
  row: {
    flexDirection: 'row'
  },
  currencyRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10
  },
  currencyBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.border
  },
  currencyBtnActive: {
    backgroundColor: THEME.main,
    borderColor: THEME.main
  },
  currencyBtnText: {
    color: THEME.gray,
    fontWeight: 'bold',
    fontSize: 12
  },
  currencyBtnTextActive: {
    color: THEME.white
  },
  updateButton: {
    backgroundColor: THEME.main,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: THEME.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  updateButtonText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
});