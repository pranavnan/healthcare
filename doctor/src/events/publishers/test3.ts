import { Kafka } from 'kafkajs';

// create a producer
const kafka = new Kafka({
  clientId: 'doctor-service',
  brokers: ['kafka-srv:9092'],
});

const producer = kafka.producer();

const produceMessage = async (message: any) => {
  await producer.connect();

  await producer.send({
    topic: 'appointments',
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
  await producer.disconnect();
};
export { produceMessage, kafka };
