import { Text } from "react-native";

export default function DateComponent(props) {
    const { date } = props;
    const dateStr = new Date(date).toString();
    return <Text>{dateStr}</Text>;
}
