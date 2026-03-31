import { StyleSheet } from "react-native";

const THEME_COLORS = {
  main: '#967662',
  charcoal: '#2C3E50',
  white: '#FFFFFF',
  softGray: '#F8F9FA',
  lightAquaFade: 'rgba(0, 255, 255, 0.05)', 
};

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME_COLORS.softGray, 
    },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 30 
    },
  logoPlaceholder: { 
    width: 80, 
    height: 80, 
    backgroundColor: '#F2F2F7', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20,
    overflow: 'hidden',
    },
    logoImage: {
    width: '100%',
    height: '100%',
  },
  logoText: { 
    color: '#8E8E93', 
    fontWeight: '600', 
    fontSize: 16
    },
  title: { 
    fontSize: 34, 
    fontWeight: '800', 
    color: THEME_COLORS.charcoal, 
    marginBottom: 10, 
    textAlign: 'center' 
    },
  subtitle: { 
    fontSize: 16, 
    color: '#8E8E93', 
    textAlign: 'center', 
    lineHeight: 22 
    },
  buttonContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 40 
    },
  primaryButton: { 
    backgroundColor: THEME_COLORS.main, 
    paddingVertical: 16, 
    borderRadius: 14, 
    alignItems: 'center', 
    marginBottom: 15, 
    height: 56, 
    justifyContent: 'center',
    shadowColor: THEME_COLORS.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    },
  primaryButtonText: { 
    color: '#FFFFFF', 
    fontSize: 17, 
    fontWeight: '600' 
    },
  secondaryButton: { 
    backgroundColor: '#F2F2F7', 
    paddingVertical: 16, 
    borderRadius: 14, 
    alignItems: 'center', 
    height: 56, 
    justifyContent: 'center' 
    },
  secondaryButtonText: { 
    color: THEME_COLORS.main, 
    fontSize: 17, 
    fontWeight: '600' 
    },
  // RegisterScreen specific styles
  reginput: {
    backgroundColor: '#F2F2F7',
    width: '100%',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 12,
    color: '#000000',
  },
  strengthBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 8,
    width: '100%',
  },
  strengthBar: {
    height: 4,
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  requirementText: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 15,
    paddingHorizontal: 2,
  },
  validText: {
    color: '#2D6A4F',
  },
  invalidText: {
    color: '#FF3B30',
  },
  inactiveBar: {
    backgroundColor: '#E5E5EA',
  },
  activeBar: {
    backgroundColor: '#2D6A4F',
  },
  // LoginScreen specific styles
  loginput: {
    backgroundColor: '#F2F2F7',
    width: '100%',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    color: '#000000',
  },
});