import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
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
    marginBottom: 20 
    },
  logoText: { 
    color: '#8E8E93', 
    fontWeight: '600', 
    fontSize: 16
    },
  title: { 
    fontSize: 34, 
    fontWeight: '800', 
    color: '#000000', 
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
    backgroundColor: '#007AFF', 
    paddingVertical: 16, 
    borderRadius: 14, 
    alignItems: 'center', 
    marginBottom: 15, 
    height: 56, 
    justifyContent: 'center' 
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
    color: '#007AFF', 
    fontSize: 17, 
    fontWeight: '600' 
    },
  // RegisterScreen specific styles
  Reginput: {
    backgroundColor: '#F2F2F7',
    width: '100%',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 12,
    color: '#000000',
  },
  // LoginScreen specific styles
  Loginput: {
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