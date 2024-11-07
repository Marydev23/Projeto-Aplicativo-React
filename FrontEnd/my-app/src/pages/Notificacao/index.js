import React, { useEffect, useRef, useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Button,
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const notificationsData = [
  { id: '1', message: 'Você recebeu uma nova mensagem.' },
  { id: '2', message: 'Sua entrega foi confirmada.' },
  { id: '3', message: 'Lembre-se de retirar seu pacote.' },
  { id: '4', message: 'Atualizações disponíveis para o aplicativo.' },

];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true 
  }),
})

export default function Notificacao() {

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {

      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
  
    }

    if(Device.isDevice){
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
      
    }
    else {
      alert('Must use physical device for Push Notifications');
    }
    
    setExpoToken(token)
  
    return token;
  }
  
  async function schedulePushNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Chegou!!",
          body: "Sua entrega chegou!!",
          data: {}
        },
        trigger: {
          seconds: 60
        }
      })
  }

  const [expoToken, setExpoToken] = useState("")
  const [channels, setChannels] = useState([]);

  const notificationReceiverRef = useRef()
  const notificationResponseRef = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }

    notificationReceiverRef.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    notificationReceiverRef.current = Notifications.addNotificationReceivedListener(notifications => {
      console.log("Notification received: " + notifications)
    })

    notificationResponseRef.current = Notifications.addNotificationResponseReceivedListener(notification => {
      console.log("Notification response received: " + notification)

    })
    return () => {
      notificationReceiverRef.current &&
        Notifications.removeNotificationSubscription(notificationReceiverRef.current);
      notificationResponseRef.current &&
        Notifications.removeNotificationSubscription(notificationResponseRef.current);
    };
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <FlatList
        data={notificationsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text>Your expo push token: {expoToken}</Text>

      <Button title='Chamar notificacoes' onPress={async () => {
        await schedulePushNotification();
      }}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: '#A9A9A9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
    color: '#fff',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#006400',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
