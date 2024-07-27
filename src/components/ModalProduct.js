/* eslint-disable radix */
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

import * as clr from '../utils/color';
import {
  now,
  selectCategories,
  showAlert,
  uniqueId,
  width,
} from '../utils/common';
import Devider from '../utils/Devider';

const ModalProduct = ({
  modalType,
  data,
  onHandleTransaction,
  onHandleCloseModal,
}) => {
  const [selectedType, setSelectedType] = useState(
    data ? data.transactions_type : null,
  );
  const [selectedCategory, setSelectedCategory] = useState(
    data ? data.category : null,
  );
  const [amount, setAmount] = useState(data ? data.amount : 0);
  const [note, setNote] = useState(data ? data.note : null);

  const handleSelectType = type => {
    console.log(type);
    setSelectedType(type);
  };

  const handleTransaction = () => {
    if (!selectedType || !amount || !selectedCategory) {
      showAlert('Notifications', 'Please fill in all information!');
      return;
    }
    const transaction = {
      id: data ? data.id : uniqueId,
      transactions_type: selectedType,
      amount: parseInt(amount),
      category: selectedCategory,
      note: note,
      date: now,
    };
    console.log(transaction);
    onHandleTransaction(transaction);
    if (modalType === 'Add') {
      handleClear();
    }
  };

  const handleCloseModal = () => {
    onHandleCloseModal();
  };

  const handleClear = () => {
    setSelectedType(null);
    setSelectedCategory(null);
    setNote(null);
    setAmount(0);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>
            {modalType === 'Add' ? 'Add New Transaction' : 'Edit Transaction'}
          </Text>
          <Pressable onPress={handleCloseModal} style={styles.closeBtn}>
            <Image
              style={styles.closeBtn}
              source={require('../assets/icon_cancel.png')}
            />
          </Pressable>
        </View>
        <Devider color={clr.txtLightestGrey} />
        <View style={styles.inputInfo}>
          {/* Input Infor */}
          <View style={styles.inputContainer}>
            {/* Select Type */}
            <View style={styles.typeWrapper}>
              <Text
                aria-label="Label for amount"
                nativeID="amount"
                style={styles.typeTitle}>
                Select transaction type:
              </Text>
              <View style={styles.typeItem}>
                <Pressable
                  style={styles.typeBtn}
                  onPress={() => {
                    handleSelectType('income');
                  }}>
                  <View style={styles.typeBtn.type}>
                    <Image
                      style={styles.typeBtn.iconType}
                      source={require('../assets/icon_income.png')}
                    />
                  </View>
                  {selectedType === 'income' && (
                    <Text style={styles.typeBtn.text}>Income</Text>
                  )}
                </Pressable>
                <Pressable
                  style={styles.typeBtn}
                  onPress={() => {
                    handleSelectType('expense');
                  }}>
                  <View style={styles.typeBtn.type}>
                    <Image
                      style={styles.typeBtn.iconType}
                      source={require('../assets/icon_expense.png')}
                    />
                  </View>
                  {selectedType === 'expense' && (
                    <Text style={styles.typeBtn.text}>Expense</Text>
                  )}
                </Pressable>
              </View>
            </View>
            {/* Select Category */}
            <View style={styles.selectCategoryWrapper}>
              <Text aria-label="Label for amount" nativeID="amount">
                Select Category:
              </Text>
              <SelectDropdown
                data={selectCategories}
                onSelect={(selectedItem, index) => {
                  setSelectedCategory(selectedItem.value);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) ||
                          (modalType === 'Add'
                            ? 'Select Category'
                            : selectedCategory)}
                      </Text>
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && {backgroundColor: '#D2D9DF'}),
                      }}>
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>
            {/* Amount */}
            <View style={styles.inputContainer.inputItem}>
              <Text aria-label="Label for amount" nativeID="amount">
                Amount:
              </Text>
              <TextInput
                style={styles.inputContainer.input}
                keyboardType="numeric"
                placeholder="Enter amount..."
                value={amount.toString()}
                onChangeText={e => setAmount(e)}
                aria-label="number"
                aria-labelledby="amount"
              />
            </View>
            {/* Note */}
            <View style={styles.inputContainer.inputItem}>
              <Text aria-label="Label for note" nativeID="note">
                Name:
              </Text>
              <TextInput
                style={styles.inputContainer.textArea}
                placeholder="Enter note..."
                value={note}
                onChangeText={e => setNote(e)}
                aria-label="input"
                aria-labelledby="note"
                multiline={true}
                numberOfLines={5}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          {/* Actions */}
          <View style={{width: width - 50}}>
            <Pressable onPress={handleClear} style={styles.clearBtn}>
              <Text style={styles.clearBtn.text}>Clear</Text>
            </Pressable>
            <Pressable onPress={handleTransaction} style={styles.saveBtn}>
              <Text style={styles.saveBtn.text}>SAVE</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ModalProduct;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  titleWrapper: {
    width: '100%',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    tintColor: clr.primary1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    padding: 15,
    textAlign: 'center',
  },
  typeWrapper: {
    marginBottom: 10,
  },
  typeTitle: {
    marginBottom: 7,
  },
  typeItem: {
    flexDirection: 'row',
    gap: 10,
  },
  typeBtn: {
    height: 60,
    backgroundColor: clr.primary1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 100,
    gap: 10,
    type: {
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: clr.primary,
      borderRadius: 100,
    },
    iconAll: {
      width: 40,
      height: 40,
      tintColor: clr.txtWhite,
    },
    iconType: {
      width: 20,
      height: 20,
      tintColor: clr.txtWhite,
    },
    text: {
      color: clr.txtWhite,
      marginRight: 10,
    },
  },
  selectCategoryWrapper: {
    marginBottom: 10,
  },
  inputInfo: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 10,
    inputItem: {
      marginBottom: 7,
    },
    input: {
      height: 50,
      width: width - 50,
      backgroundColor: '#EBF0F4',
      borderRadius: 7,
      marginBottom: 10,
      padding: 10,
    },
    textArea: {
      width: width - 50,
      textAlignVertical: 'top',
      backgroundColor: '#EBF0F4',
      borderRadius: 7,
      marginBottom: 10,
      padding: 10,
    },
  },
  clearBtn: {
    marginBottom: 20,
    text: {
      color: clr.primary1,
      textAlign: 'center',
    },
  },
  saveBtn: {
    backgroundColor: clr.primary1,
    padding: 15,
    borderRadius: 100,
    marginBottom: 20,
    text: {
      color: clr.txtWhite,
      textAlign: 'center',
    },
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 13,
  },
});
