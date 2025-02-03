// import {
//   filterFields,
//   Listener,
//   Topics,
//   UserCreatedEvent,
// } from '@phntickets/booking';
// import { EachMessagePayload } from 'kafkajs';
// import { User } from '../../entities/user.entities';
// import { AppDataSource } from '../../data-source';

// const allowedUserFields = [
//   'id',
//   'email',
//   'profileType',
//   'username',
//   'usernumber',
// ];

// export class UserCreatedListener extends Listener<UserCreatedEvent> {
//   topic: Topics.UserCreated = Topics.UserCreated;
//   groupId: string = 'user-created';

//   async onMessage(
//     data: UserCreatedEvent['data'],
//     payload: EachMessagePayload
//   ): Promise<void> {
//     try {
//       console.log(`received data from topic ${this.topic}`, data);
//       const { partition, topic, message: msg } = payload;

//       const userRepo = AppDataSource.getRepository(User);
//       const filterField = filterFields(data, allowedUserFields);
//       const user = new User();

//       Object.assign(user, filterField);

//       await userRepo.save(user);

//       // ack the event
//       await this._consumer?.commitOffsets([
//         {
//           partition,
//           topic,
//           offset: (BigInt(msg.offset) + BigInt(1)).toString(),
//         },
//       ]);
//     } catch (err) {
//       console.log(`Error occured while processing topic: ${this.topic}`, err);
//     }
//   }
// }
