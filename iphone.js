import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [audioFilePath, setAudioFilePath] = useState('');

  // Функция для начала записи
  const startRecording = async () => {
    const path = 'hello.m4a'; // Путь для записи файла
    setAudioFilePath(path);
    await audioRecorderPlayer.startRecorder(path);
    setIsRecording(true);

    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordingTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
    });
  };

  // Функция для остановки записи и отправки аудио в Telegram
  const stopRecording = async () => {
    await audioRecorderPlayer.stopRecorder();
    setIsRecording(false);
    sendAudioToTelegram(audioFilePath); // Отправка аудио в Telegram
  };

  // Функция для отправки аудио в Telegram
  const sendAudioToTelegram = async (filePath) => {
    const token = '6448607572:AAEDzw_uaeUs7iPZj-PLXUhUhUMzD_GfqUM'; // Токен твоего бота
    const chatId = '6294188239';  // ID чата или пользователя, куда отправляется аудио

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('audio', {
      uri: filePath,
      type: 'audio/m4a',
      name: 'voice_note.m4a',
    });

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendAudio`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.ok) {
        console.log('Audio sent successfully');
      } else {
        console.error('Error sending audio');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Text>Recording Time: {recordingTime}</Text>
    </View>
  );
};

export default VoiceRecorder;
