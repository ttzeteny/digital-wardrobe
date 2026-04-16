import { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Pressable, Platform, ImageBackground, TextInput, ScrollView, Alert, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { replace } from 'expo-router/build/global-state/routing';
import { styles } from '../Styles/ConfirmScanScreen.styles';
import { getAuthData } from '../Utils/secureStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfirmScanScreen() {
    const [tagPlaceholders, setTagPlaceholder] = useState(['#summer', 'casual', 'cotton', '#favorite']);

    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [imageUri, setImageUri] = useState('');
    const [imageBase64, setImageBase64] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('USD'); 
    const [tags, setTags] = useState(['', '', '', '']);
    
    const [isSaving, setIsSaving] = useState(false);

    const loadImage = async () => {
        try {
            const pendingScan = await AsyncStorage.getItem('pendingScan');

            if (!pendingScan) {
                Alert.alert('No image found', 'Please take or select a photo first.');
                replace('/scan');
                return;
            }

            const parsed = JSON.parse(pendingScan) as { uri?: string; base64?: string | null };

            if (!parsed.uri) {
                Alert.alert('Invalid image', 'Please scan again.');
                replace('/scan');
                return;
            }

            setImageUri(parsed.uri);
            setImageBase64(parsed.base64 ?? null);
        } finally {
            setIsLoadingImage(false);
        }
    };
    
    useEffect(() => {
        loadImage();
    }, []);

    const addTagRow = () => {
        setTags((prev) => [...prev, '', '']);
    };

    const removeTagRow = () => {
        setTags((prev) => {
            if (prev.length <= 4) {
                return prev;
            }
            return prev.slice(0, prev.length - 2);
        });
    };

    const updateTag = (index: number, value: string) => {
        setTags((prev) => prev.map((tag, i) => (i === index ? value : tag)));
    };

    const tagRows = useMemo(() => {
        const rows: string[][] = [];
        for (let i = 0; i < tags.length; i += 2) {
            rows.push(tags.slice(i, i + 2));
        }
        return rows;
    }, [tags]);

    const filledTagCount = tags.filter((tag) => tag.trim().length > 0).length;

    const handleConfirm = async () => {
        if (isSaving) {
            return;
        }

        const authData = await getAuthData();
        if (!authData?.token) {
            Alert.alert('Session expired', 'Please log in again before confirming scanned items.');
            replace('/login');
            return;
        }

        if (!imageUri) {
            Alert.alert('Missing image', 'Please scan the item again.');
            replace('/scan');
            return;
        }
        if (!name.trim() || !category.trim() || !color.trim() || !brand.trim() || !size.trim()) {
            Alert.alert('Missing information', 'Please fill in all required fields.');
            return;
        }

        const resolvedName = name.trim() || `Scanned item ${new Date().toISOString()}`;
        const payloadTags = tags.map((tag) => tag.trim()).filter(Boolean);
        const normalizedDataUri = imageBase64
            ? (imageBase64.startsWith('data:image/') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`)
            : null;

        if (!normalizedDataUri) {
            Alert.alert('Image unavailable', 'Please retake or re-select the image before saving.');
            return;
        }

        try {
            setIsSaving(true);

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/clothes/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authData.token}`,
                },
                body: JSON.stringify({
                    name: resolvedName,
                    category: category.trim(),
                    color: color.trim(),
                    brand: brand.trim(),
                    size: size.trim(),
                    tags: payloadTags,
                    imageUrl: normalizedDataUri,
                    price: price.trim() ? parseFloat(price.trim()) : null,
                    currency: price.trim() ? currency : null,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                throw new Error(errorBody?.error || 'Unable to save scanned item.');
            }

            await AsyncStorage.removeItem('pendingScan');
            Alert.alert('Saved', 'Item saved successfully!');
            replace('/(tabs)/wardrobe');
        } catch (error) {
            Alert.alert('Save failed', error instanceof Error ? error.message : 'Could not save scanned item.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = async () => {
        await AsyncStorage.removeItem('pendingScan');
        replace('/(tabs)');
    };

    if (isLoadingImage) {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#111" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Pressable onPress={handleCancel}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>
                    <Text style={styles.detailsText}>Details</Text>
                    <TouchableOpacity onPress={handleConfirm} disabled={isSaving}>
                        <Text style={styles.saveButtonText}>{isSaving ? 'Saving...' : 'Confirm'}</Text>
                    </TouchableOpacity>
                </View> 
                <ScrollView style={styles.scrollContent}>
                    <View style={styles.imageContainer}>
                        <View>
                            <ImageBackground
                                source={{ uri: imageUri }}
                                style={styles.image}
                                imageStyle={{ borderRadius: 22.5 }}
                                resizeMode="cover"
                            />
                            <TouchableOpacity onPress={() => replace('/scan')}>
                                <Text style={styles.retakePhotoText}>Retake Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.formLabel}>Base Attributes (Required)</Text>
                            <View style={styles.inputRowOneTag}>
                                <View style={styles.inputOneTag}>
                                    <Text style={styles.textInputLabel}>Name<Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        placeholder="e.g. 'Red Nike Shirt'"
                                        placeholderTextColor="#8E8E93"
                                        style={styles.textInput}
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputRowMultiTag}>
                                <View style={styles.inputMultiTag}>
                                    <Text style={styles.textInputLabel}>Category<Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        placeholder="Shirt, Pants..."
                                        placeholderTextColor="#8E8E93"
                                        style={styles.textInput}
                                        value={category}
                                        onChangeText={setCategory}
                                    />
                                </View>
                                <View style={styles.inputMultiTag}>
                                    <Text style={styles.textInputLabel}>Brand<Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        placeholder="Nike, Adidas..."
                                        placeholderTextColor="#8E8E93"
                                        style={styles.textInput}
                                        value={brand}
                                        onChangeText={setBrand}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputRowMultiTag}>
                                <View style={styles.inputMultiTag}>
                                    <Text style={styles.textInputLabel}>Color<Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        placeholder="Red, Blue..."
                                        placeholderTextColor="#8E8E93"
                                        style={styles.textInput}
                                        value={color}
                                        onChangeText={setColor}
                                    />
                                </View>
                                <View style={styles.inputMultiTag}>
                                    <Text style={styles.textInputLabel}>Size<Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        placeholder="S, M, L..."
                                        placeholderTextColor="#8E8E93"
                                        style={styles.textInput}
                                        value={size}
                                        onChangeText={setSize}
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.inputRowOneTag}>
                                <View style={styles.inputOneTag}>
                                    <Text style={styles.textInputLabel}>Price (Optional)</Text>
                                    <TextInput
                                        placeholder="e.g. 5000"
                                        placeholderTextColor="#8E8E93"
                                        style={styles.textInput}
                                        value={price}
                                        onChangeText={setPrice}
                                        keyboardType="numeric" 
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 10, marginBottom: 25, gap: 10 }}>
                                {['USD', 'EUR', 'GBP', 'HUF'].map((c) => (
                                    <TouchableOpacity
                                        key={c}
                                        onPress={() => setCurrency(c)}
                                        style={{
                                            paddingVertical: 8,
                                            paddingHorizontal: 16,
                                            borderRadius: 15,
                                            backgroundColor: currency === c ? '#967662' : '#F2F2F7',
                                            borderWidth: 1,
                                            borderColor: currency === c ? '#967662' : '#E5E5EA',
                                        }}
                                    >
                                        <Text style={{ 
                                            color: currency === c ? '#FFF' : '#8E8E93', 
                                            fontWeight: 'bold', 
                                            fontSize: 12 
                                        }}>
                                            {c}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                        <View style={styles.tagsHeaderRow}>
                            <Text style={styles.formLabel}>Tags (Optional)</Text>
                            <View style={styles.tagsActions}>
                                <Text style={styles.tagCounterText}>{filledTagCount}/{tags.length} filled</Text>
                                <TouchableOpacity
                                    style={[styles.removeTagButton, tags.length <= 4 && styles.disabledTagButton]}
                                    onPress={removeTagRow}
                                    disabled={tags.length <= 4}
                                >
                                    <Text style={styles.removeTagButtonText}>-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.addTagButton, tags.length >= 12 && styles.disabledTagButton]} 
                                    onPress={addTagRow}
                                    disabled={tags.length >= 12}
                                >
                                    <Text style={styles.addTagButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {tagRows.map((row, rowIndex) => (
                            <View style={styles.inputRowMultiTag} key={`tag-row-${rowIndex}`}>
                                {row.map((tagValue, colIndex) => {
                                    const tagIndex = rowIndex * 2 + colIndex;
                                    return (
                                        <View style={styles.inputMultiTag} key={`tag-${tagIndex}`}>
                                            <Text style={styles.textInputLabel}>Tag {tagIndex + 1}</Text>
                                            <TextInput
                                                placeholder={tagIndex < 4 ? tagPlaceholders[tagIndex] : 'custom tag...'}
                                                placeholderTextColor="#8E8E93"
                                                style={styles.textInput}
                                                value={tagValue}
                                                onChangeText={(text) => updateTag(tagIndex, text)}
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>  
        </SafeAreaView>
    );
}