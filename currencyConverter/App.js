import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

const currencyValues = {
  USA: 0.01,
  EUR: 0.01,
  AUS: 0.02,
  CHINA: 0.09,
  UAE: 0.05,
  CAD: 0.02,
  HKD: 0.11,
  SAR: 0.05,
  BITCOIN: 0.000000002,
};

const App = () => {
  const [resultCurrency, setResultCurrency] = useState(0);
  const [inputCurrency, setInputCurrency] = useState(0);

  const resultValue = value => {
    let result = parseFloat(inputCurrency) * currencyValues[value];

    setResultCurrency(result);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Currency Converter</Text>
        <View>
          <Text style={styles.resultButton}>{resultCurrency}</Text>
        </View>
        <View>
          <TextInput
            style={styles.inputButton}
            value={inputCurrency}
            onChangeText={inputCurrency => setInputCurrency(inputCurrency)}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.gridContainer}>
          {Object.keys(currencyValues).map(currency => (
            <TouchableOpacity
              key={currency}
              style={styles.gridButtons}
              onPress={() => resultValue(currency)}>
              <Text>{currency}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  resultButton: {
    width: 200,
    borderRadius: 2,
    borderColor: '#070707',
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: '#fff',
    backgroundColor: '#000',
    textAlign: 'center',
  },
  inputButton: {
    width: 200,
    borderRadius: 2,
    borderColor: '#070707',
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: '#fff',
    backgroundColor: '#000',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridButtons: {
    width: '33.3%',
    height: 100,
    paddingHorizontal: 35,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#070707',
    justifyContent: 'center',
  },
});
