import 'react-native-get-random-values'; // required for uuid to work
import {v4 as uuidv4} from 'uuid';

export const createUniqueId = () => {
    const idOut = uuidv4();
    console.log(`Creating new UUID: ${idOut}`);
    return idOut;
};
