import { kafka } from '../publishers/test3';

const consumer = kafka.consumer({ groupId: 'notification-group' });
const consumer2 = kafka.consumer({ groupId: 'appoinment-group' });
let i = 0;
const run3 = async () => {
  await consumer2.connect();
  await consumer2.subscribe({ topic: 'appointments', fromBeginning: false });

  await consumer2.run({
    eachMessage: async ({ topic, partition, message }) => {
      const content = message.value?.toString();
      const parsedContent = content && JSON.parse(content);
      // if (i + 1 != parsedContent.id) {
      //   throw new Error(`${parsedContent.id} not received in sequence`);
      // }
      // ++i;
      console.log(`Appointment Service received appoinment-group: ${content}`);

      // Process the appointment scheduling
      // ...
    },
  });
};

const run2 = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'appointments', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const content = message.value?.toString();
      console.log(`Appointment Service received 2: ${content}`);

      // Process the appointment scheduling
      // ...
    },
  });
};

export { run2, run3 };
