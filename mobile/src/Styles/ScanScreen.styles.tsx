import { StyleSheet } from 'react-native';

 export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    padding: 30 
  },
  permissionText: { 
    textAlign: 'center', 
    fontSize: 16, 
    color: '#333', 
    marginVertical: 20,
    lineHeight: 24 
  },
  permissionBtn: { 
    backgroundColor: '#967662', 
    paddingHorizontal: 30, 
    paddingVertical: 15, 
    borderRadius: 30 
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  // Camera UI Styles
  overlay: { flex: 1, justifyContent: 'space-between' },
  header: { padding: 20 },
  cameraContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  reticle: { 
    width: 300, 
    height: 450, 
    borderWidth: 2, 
    borderColor: 'white', 
    borderStyle: 'dashed', 
    borderRadius: 20 
  },
  bottomActions: { 
    paddingBottom: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 60 
  },
  shutterButton: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    borderWidth: 5, 
    borderColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white' }
  });