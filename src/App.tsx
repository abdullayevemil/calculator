import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { CalculatorButton } from "./components/CalculatorButton";

const buttons = ['AC', 'C', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

const operators = ['+', '-', '/', '*', '%', '.']

export const App = () => {
  const [text, setText] = useState('');

  const handlePress = (button: string) => {
    setText((prevState) => prevState === 'Cannot divide by zero' ? '' : prevState);

    if (!isNaN(+button)) {
      setText((prevState) => {
        if (button === '0' && /^0*$/.test(prevState) && prevState.length > 0) {
          return prevState;
        }

        return prevState + button;
      });
      return;
    }

    if (button === 'AC') {
      setText('');
      return;
    }

    if (button === 'C') {
      setText((prevState) => {
        return prevState.slice(0, -1)
      });
      return;
    }

    if (button === '=') {
      setText((prevState) => {
        if (!prevState || prevState === 'Cannot divide by zero') {
          return '';
        }

        if (!operators.includes(prevState.slice(-1))) {
          const result = Number(eval(prevState).toPrecision(12)).toString();

          return result === 'Infinity' || result === 'NaN' ? 'Cannot divide by zero' : result;
        }

        const result = eval(prevState.slice(0, -1)).toString();

        return result === 'Infinity' || result === 'NaN' ? 'Cannot divide by zero' : result;
      });
      return;
    }

    if (operators.includes(button)) {
      setText((prevState) => {
        if (operators.includes(prevState.slice(-1))) {
          return prevState;
        }

        if (button !== '-' && prevState.length == 0) {
          return prevState;
        }

        let operands = prevState.split(/[%+*/-]/);

        if (button === '.' && operands && operands[operands.length - 1].includes('.')) {
          return prevState;
        }

        return prevState + button;
      });
      return;
    }
  };

  return (
    <SafeAreaView style={styles.calculatorContainer}>
      <View style={styles.inputContainer}>
        <TextInput readOnly={true} style={styles.calculatorInput} multiline={true}>{text}</TextInput>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.buttons}>
        {
          buttons.map((button, index) => <CalculatorButton key={index} button={button} onPress={() => handlePress(button)} />)
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calculatorContainer: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  calculatorInput: {
    color: 'white',
    fontSize: 36,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginVertical: 16,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
});