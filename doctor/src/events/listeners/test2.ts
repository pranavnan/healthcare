import { kafka } from '../publishers/test3';

const consumer = kafka.consumer({ groupId: 'notification-group' });

const run1 = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'appointments', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const content = message.value?.toString();
      console.log(`Appointment Service received 1: ${content}`);

      // Process the appointment scheduling
      // ...
    },
  });
};

export { run1 };
