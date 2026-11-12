
import { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Animated,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useThemeMode } from './ThemeContext';

interface Props {
  emailTujuan: string;
}

interface FormErrors {
  nama?: string;
  email?: string;
  pesan?: string;
}

interface PesanItem {
  id: string;
  nama: string;
  email: string;
  pesan: string;
  tanggal: string;
}

const STORAGE_KEY = '@portfolio_contact_messages';

export default function ContactForm(_props: Props) {
  const { darkMode } = useThemeMode();

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');

  const [daftarPesan, setDaftarPesan] = useState<PesanItem[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [respons, setRespons] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | ''>('');
  const [toastKey, setToastKey] = useState(0);

  const toastTranslateY = useRef(new Animated.Value(-100)).current;
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Warna mengikuti tema aplikasi.
  const colors = {
    container: darkMode ? '#252238' : '#FFFFFF',
    border: darkMode ? '#40385B' : '#D7F0EB',
    title: darkMode ? '#C9B5FF' : '#7554C8',
    description: darkMode ? '#C2BBD3' : '#858096',
    label: darkMode ? '#E8E2F5' : '#48445D',
    inputBackground: darkMode ? '#171525' : '#FFFCFF',
    inputBorder: darkMode ? '#51466D' : '#D8D4E4',
    inputText: darkMode ? '#F4EFFF' : '#48445D',
    placeholder: darkMode ? '#A49AB8' : '#A6A1B3',
    email: darkMode ? '#C2BBD3' : '#858096',
    successBackground: darkMode ? '#173B31' : '#E3F8EF',
    successText: darkMode ? '#86E0B4' : '#16734A',
    errorBackground: darkMode ? '#48252D' : '#FEECEC',
    errorText: darkMode ? '#FFAAAA' : '#B91C1C',
    cardBackground: darkMode ? '#302A45' : '#FAF8FF',
    cardBorder: darkMode ? '#51466D' : '#E5DDF5',
    emptyBackground: darkMode ? '#302A45' : '#F7F5FC',
  };

  // Menampilkan notifikasi.
  const showToast = (
    message: string,
    type: 'success' | 'error'
  ) => {
    setRespons(message);
    setStatus(type);
    setToastKey((previous) => previous + 1);
  };

  // Animasi masuk dan keluar notifikasi.
  useEffect(() => {
    if (!respons) return;

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTranslateY.setValue(-100);
    toastOpacity.setValue(0);

    Animated.parallel([
      Animated.spring(toastTranslateY, {
        toValue: 0,
        tension: 65,
        friction: 9,
        useNativeDriver: true,
      }),
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    toastTimer.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastTranslateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setRespons('');
        setStatus('');
      });
    }, 3000);

    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }
    };
  }, [respons, toastKey, toastOpacity, toastTranslateY]);

  // Membersihkan timer ketika komponen dilepas.
  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  // Membaca pesan yang tersimpan ketika halaman dibuka.
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedMessages) {
          const parsedMessages: PesanItem[] = JSON.parse(storedMessages);

          if (Array.isArray(parsedMessages)) {
            setDaftarPesan(parsedMessages);
          }
        }
      } catch {
        showToast('Gagal membaca pesan yang tersimpan.', 'error');
      } finally {
        setIsLoadingMessages(false);
      }
    };

    loadMessages();
  }, []);

  // Menghapus notifikasi ketika pengguna mengubah isian.
  const clearFeedback = () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }

    setRespons('');
    setStatus('');
  };

  const handleNamaChange = (value: string) => {
    setNama(value);
    setErrors((prev) => ({ ...prev, nama: undefined }));
    clearFeedback();
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: undefined }));
    clearFeedback();
  };

  const handlePesanChange = (value: string) => {
    setPesan(value);
    setErrors((prev) => ({ ...prev, pesan: undefined }));
    clearFeedback();
  };

  // Validasi formulir.
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!nama.trim()) {
      newErrors.nama = 'Nama wajib diisi.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi.';
    } else {
      const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!polaEmail.test(email.trim())) {
        newErrors.email = 'Masukkan alamat email yang valid.';
      }
    }

    if (!pesan.trim()) {
      newErrors.pesan = 'Pesan wajib diisi.';
    } else if (pesan.trim().length < 10) {
      newErrors.pesan = 'Pesan minimal terdiri dari 10 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Menyimpan pesan ke AsyncStorage.
  const handleSubmit = async () => {
    if (isSubmitting || isLoadingMessages) return;

    clearFeedback();

    if (!validateForm()) {
      showToast('Periksa kembali isian formulir kamu.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      const pesanBaru: PesanItem = {
        id: `${Date.now()}-${Math.random()}`,
        nama: nama.trim(),
        email: email.trim(),
        pesan: pesan.trim(),
        tanggal: new Date().toISOString(),
      };

      const pesanTerbaru = [pesanBaru, ...daftarPesan];

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(pesanTerbaru)
      );

      setDaftarPesan(pesanTerbaru);

      showToast(
        `Terima kasih, ${pesanBaru.nama}! Pesan berhasil disimpan.`,
        'success'
      );

      setNama('');
      setEmail('');
      setPesan('');
      setErrors({});
    } catch {
      showToast(
        'Gagal menyimpan pesan. Silakan coba kembali.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Menghapus pesan berdasarkan ID.
  const handleDeleteMessage = async (id: string) => {
    try {
      const pesanTerbaru = daftarPesan.filter(
        (item) => item.id !== id
      );

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(pesanTerbaru)
      );

      setDaftarPesan(pesanTerbaru);

      showToast('Pesan berhasil dihapus.', 'success');
    } catch {
      showToast(
        'Gagal menghapus pesan. Silakan coba kembali.',
        'error'
      );
    }
  };

  // Format tanggal pesan.
  const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.wrapper}>

      {/* NOTIFIKASI MENGAMBANG DI LUAR FORM */}
      <Modal
        transparent
        visible={respons !== ''}
        animationType="none"
        statusBarTranslucent
        onRequestClose={clearFeedback}
      >
        <View
          style={styles.toastOverlay}
          pointerEvents="box-none"
        >
          {respons !== '' && (
            <Animated.View
              pointerEvents="none"
              accessibilityRole="alert"
              style={[
                styles.toast,
                {
                  backgroundColor:
                    status === 'success'
                      ? colors.successBackground
                      : colors.errorBackground,
                  borderColor:
                    status === 'success'
                      ? colors.successText
                      : colors.errorText,
                  opacity: toastOpacity,
                  transform: [{ translateY: toastTranslateY }],
                },
              ]}
            >
              <Text
                style={[
                  styles.toastIcon,
                  {
                    color:
                      status === 'success'
                        ? colors.successText
                        : colors.errorText,
                  },
                ]}
              >
                {status === 'success' ? '✓' : '!'}
              </Text>

              <Text
                style={[
                  styles.toastText,
                  {
                    color:
                      status === 'success'
                        ? colors.successText
                        : colors.errorText,
                  },
                ]}
              >
                {respons}
              </Text>
            </Animated.View>
          )}
        </View>
      </Modal>

      {/* FORMULIR CONTACT */}
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.container,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.title }]}>
          Hubungi Saya
        </Text>

        <Text style={[styles.description, { color: colors.description }]}>
          Silakan isi formulir berikut untuk mengirimkan pesan.
        </Text>

        <Text style={[styles.label, { color: colors.label }]}>
          Nama
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBackground,
              borderColor: errors.nama ? '#DC2626' : colors.inputBorder,
              color: colors.inputText,
            },
          ]}
          placeholder="Masukkan nama kamu"
          placeholderTextColor={colors.placeholder}
          value={nama}
          onChangeText={handleNamaChange}
          editable={!isSubmitting && !isLoadingMessages}
          accessibilityLabel="Nama"
          accessibilityHint="Masukkan nama lengkap kamu"
          returnKeyType="next"
        />

        {errors.nama && (
          <Text style={styles.errorText}>{errors.nama}</Text>
        )}

        <Text style={[styles.label, { color: colors.label }]}>
          Email
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBackground,
              borderColor: errors.email ? '#DC2626' : colors.inputBorder,
              color: colors.inputText,
            },
          ]}
          placeholder="Masukkan email kamu"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSubmitting && !isLoadingMessages}
          accessibilityLabel="Email"
          accessibilityHint="Masukkan alamat email yang valid"
          returnKeyType="next"
        />

        {errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}

        <Text style={[styles.label, { color: colors.label }]}>
          Pesan
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.messageInput,
            {
              backgroundColor: colors.inputBackground,
              borderColor: errors.pesan ? '#DC2626' : colors.inputBorder,
              color: colors.inputText,
            },
          ]}
          placeholder="Tuliskan pesan kamu (minimal 10 karakter)"
          placeholderTextColor={colors.placeholder}
          value={pesan}
          onChangeText={handlePesanChange}
          multiline
          textAlignVertical="top"
          editable={!isSubmitting && !isLoadingMessages}
          accessibilityLabel="Pesan"
          accessibilityHint="Tuliskan pesan yang ingin kamu sampaikan"
        />

        {errors.pesan && (
          <Text style={styles.errorText}>{errors.pesan}</Text>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && !isSubmitting && styles.buttonPressed,
            (isSubmitting || isLoadingMessages) && styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting || isLoadingMessages}
          accessibilityRole="button"
          accessibilityLabel="Simpan pesan"
          accessibilityState={{
            disabled: isSubmitting || isLoadingMessages,
            busy: isSubmitting,
          }}
        >
          {isSubmitting || isLoadingMessages ? (
            <View style={styles.loadingContent}>
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text style={styles.buttonText}>
                {isLoadingMessages ? 'Memuat...' : 'Menyimpan...'}
              </Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Kirim Pesan</Text>
          )}
        </Pressable>

        <Text style={[styles.emailTujuan, { color: colors.email }]}>
          Pesan disimpan secara lokal pada perangkat ini.
        </Text>
      </View>

      {/* DAFTAR PESAN */}
      <View
        style={[
          styles.messageContainer,
          {
            backgroundColor: colors.container,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.title }]}>
          Pesan yang Dikirim ({daftarPesan.length})
        </Text>

        <Text style={[styles.description, { color: colors.description }]}>
          Daftar pesan yang telah disimpan melalui formulir.
        </Text>

        {isLoadingMessages ? (
          <View style={styles.emptyState}>
            <ActivityIndicator color="#7554C8" size="large" />
            <Text style={[styles.emptyText, { color: colors.description }]}>
              Memuat pesan...
            </Text>
          </View>
        ) : daftarPesan.length === 0 ? (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: colors.emptyBackground },
            ]}
          >
            <Text style={styles.emptyIcon}>💬</Text>

            <Text style={[styles.emptyTitle, { color: colors.label }]}>
              Belum Ada Pesan
            </Text>

            <Text style={[styles.emptyText, { color: colors.description }]}>
              Pesan yang kamu kirim akan ditampilkan di sini.
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.messageList}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {daftarPesan.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.messageCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.messageName, { color: colors.title }]}>
                  {item.nama}
                </Text>

                <Text style={[styles.messageEmail, { color: colors.email }]}>
                  {item.email}
                </Text>

                <Text style={[styles.messageContent, { color: colors.label }]}>
                  {item.pesan}
                </Text>

                <Text style={[styles.messageDate, { color: colors.email }]}>
                  {formatTanggal(item.tanggal)}
                </Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => handleDeleteMessage(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Hapus pesan dari ${item.nama}`}
                >
                  <Text style={styles.deleteButtonText}>
                    Hapus Pesan
                  </Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 20,
  },

  container: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#7554C8',
    shadowOpacity: 0.08,
    shadowRadius: 7,
  },

  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 13,
    marginTop: 7,
    marginBottom: 18,
    lineHeight: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 15,
  },

  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 13,
  },

  messageInput: {
    height: 110,
  },

  button: {
    backgroundColor: '#7554C8',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  emailTujuan: {
    marginTop: 15,
    fontSize: 12,
  },

  messageContainer: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#7554C8',
    shadowOpacity: 0.08,
    shadowRadius: 7,
  },

  messageList: {
    maxHeight: 420,
  },

  messageCard: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },

  messageName: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  messageEmail: {
    fontSize: 12,
    marginTop: 4,
  },

  messageContent: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },

  messageDate: {
    fontSize: 11,
    marginTop: 12,
  },

  deleteButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 9,
    alignSelf: 'flex-end',
    marginTop: 12,
  },

  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 12,
  },

  emptyIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  emptyText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 19,
  },

  // Lapisan notifikasi memenuhi layar.
  toastOverlay: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop:
      Platform.OS === 'android'
        ? 48
        : Platform.OS === 'ios'
          ? 60
          : 20,
  },

  // Tampilan notifikasi mengambang.
  toast: {
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 12,
  },

  toastIcon: {
    fontSize: 21,
    fontWeight: 'bold',
  },

  toastText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
  },
});
