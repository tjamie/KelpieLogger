// import 'react-native-get-random-values'; // required for uuid to work
// import {v4 as uuidv4} from 'uuid';
import uuid from 'react-native-uuid';

export const createUniqueId = () => {
    // uuid library randomly breaks as of 2024, so now using react-native-uuid
    const idOut = uuid.v4();
    console.log(`Creating new UUID: ${idOut}`);
    return idOut;
};
