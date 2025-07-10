import { StyleSheet, Text } from "react-native";
import { theme } from "../../../theme";

const HighlightedText = ({ content }) => {
  const formedArray = [];
  let isHighlighted = false;

  for (let s of content.split(" ")) {
    const startsHighlight = s.startsWith("**");
    const endsHighlight = s.endsWith("**") || /\*\*\W?$/.test(s);

    if (startsHighlight) {
      isHighlighted = true;
      formedArray.push({
        text: [s.replace("**", "").replace("**", "")],
        highlited: isHighlighted,
      });
    } else if (endsHighlight) {
      formedArray[formedArray.length - 1].text.push(s.replace("**", ""));
      isHighlighted = false;
    } else if (isHighlighted) {
      formedArray[formedArray.length - 1].text.push(s);
    } else {
      formedArray.push({ text: [s], highlited: false });
    }
  }

  return (
    <Text>
      {formedArray.map((word, index) => {
        const words = word.text;
        return words.map((w, i) => (
          <Text
            key={`${index}-${i}`}
            style={[
              styles.traceText,
              {
                color: word.highlited
                  ? "#40C4FF"
                  : theme.create_screen.growth_trace.trace_text,
              },
            ]}
          >
            {w + " "}
          </Text>
        ));
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  traceText: {
    fontSize: 14,
    marginTop: 6,
    opacity: 0.9,
  },
});

export default HighlightedText;
