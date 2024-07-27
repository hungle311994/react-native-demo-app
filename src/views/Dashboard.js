import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modalbox';
import Toast from 'react-native-toast-message';

import {height, width} from '../utils/common';
import Devider from '../utils/Devider';
import * as clr from '../utils/color';

import {BASE_URL, endpoint} from '../api/api';
import ModalProduct from '../components/ModalProduct';
import Loading, {hideLoading, showLoading} from '../components/Loading';
import Transactions from '../components/Transactions';
import SelectTransactionType from '../components/SelectTransactionType';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [transactionType, setTransactionType] = useState('');
  const [transactionEdit, setTransactionEdit] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTransactions = async () => {
    try {
      const response = await fetch(BASE_URL + endpoint.getTransactions, {
        method: 'GET',
      });
      const resBody = await response.json();
      setData(resBody.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalBalance = () => {
    const balance = getTotalIncomes() - getTotalExpenses();
    let str = '';
    if (balance >= 0) {
      str = `$${balance}`;
    } else {
      str = `- $${balance * -1}`;
    }
    return str;
  };

  const getTotalIncomes = () => {
    let arrIncome = [],
      totalIncome = 0;
    data.forEach(e => {
      if (e.transactions_type === 'income') {
        arrIncome.push(e.amount);
        totalIncome = arrIncome.reduce((a, b) => a + b);
      }
    });
    return totalIncome;
  };

  const getTotalExpenses = () => {
    let arrExpenses = [],
      totalExpenses = 0;
    data.forEach(e => {
      if (e.transactions_type === 'expense') {
        arrExpenses.push(e.amount);
        totalExpenses = arrExpenses.reduce((a, b) => a + b);
      }
    });
    return totalExpenses;
  };

  const selectType = type => {
    setTransactionType(type);
  };

  const onHandleAddTransaction = async transaction => {
    try {
      const response = await fetch(BASE_URL + endpoint.addTransaction, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(transaction),
      });
      const result = await response.json();
      console.log(result);
      if (result.result === true) {
        getTransactions();
        setIsShowModal(false);
        Toast.show({
          type: 'success',
          text1: 'Add transaction: SUCCESS',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onHandleShowModalEditTransaction = transaction => {
    setTransactionEdit(transaction);
    setIsShowModal(true);
  };

  const onHandleEditTransaction = async transaction => {
    try {
      const response = await fetch(
        BASE_URL + endpoint.updateTransaction(transaction.id),
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(transaction),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.result === true) {
        getTransactions();
        setIsShowModal(false);
        Toast.show({
          type: 'success',
          text1: 'Update transaction: DONE',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onHandleDeleteTransaction = async transaction => {
    try {
      const response = await fetch(
        BASE_URL + endpoint.deleteTransaction(transaction.id),
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.result === true) {
        getTransactions();
        setIsShowModal(false);
        Toast.show({
          type: 'success',
          text1: 'Successfully delete transaction',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onHandleCloseModal = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    showLoading(setIsLoading);
    getTransactions();
    hideLoading(setIsLoading);
  }, []);

  useEffect(() => {
    selectType(data.length);
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        {/* Balance */}
        <View style={styles.balance}>
          <Text style={styles.balance.title}>Available Balance</Text>
          <Text style={styles.balance.total}>{getTotalBalance()}</Text>
          <Text style={styles.balance.des}>
            By this time last month, you spent slightly higher ($
            {getTotalExpenses()})
          </Text>
        </View>
        <Devider />
        {/* Select Transaction Type */}
        <SelectTransactionType onSelectType={e => selectType(e)} />
        {/* Transactions */}
        <View style={styles.transactions}>
          <View style={styles.transactions.container}>
            <View style={styles.transactions.firstLine}>
              <Text style={styles.transactions.title}>Transactions</Text>
              {/* Button Add Product */}
              <Pressable
                style={styles.addTransaction}
                onPress={() => {
                  setIsShowModal(true);
                  setTransactionEdit(null);
                }}>
                <Text style={styles.addTransaction.iconPlus}>+</Text>
              </Pressable>
            </View>
            {isLoading ? (
              <Loading position={-200} />
            ) : (
              <Transactions
                type={transactionType}
                transactions={data}
                onHandleShowModalEditTransaction={
                  onHandleShowModalEditTransaction
                }
                onHandleDeleteTransaction={onHandleDeleteTransaction}
              />
            )}
          </View>
        </View>
      </ScrollView>
      {/* Modal Product */}
      <Modal
        position="center"
        style={styles.modalTransaction}
        onClosed={() => {
          setIsShowModal(false);
          setTransactionEdit(null);
        }}
        isOpen={isShowModal}>
        <ModalProduct
          modalType={transactionEdit ? 'Edit' : 'Add'}
          data={transactionEdit ?? null}
          onHandleTransaction={
            transactionEdit ? onHandleEditTransaction : onHandleAddTransaction
          }
          onHandleCloseModal={onHandleCloseModal}
        />
      </Modal>
      {/* Toast Noti */}
      <Toast position="bottom" />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    maxHeight: height - 150,
  },
  balance: {
    width: '100%',
    backgroundColor: clr.primary,
    paddingHorizontal: 15,
    paddingVertical: 30,
    title: {
      fontSize: 16,
      color: clr.txtWhite,
    },
    total: {
      fontSize: 40,
      color: clr.secondary,
    },
    des: {
      fontSize: 13,
      color: clr.txtLightGrey,
    },
  },
  transactions: {
    flex: 1,
    backgroundColor: clr.primary,
    container: {
      flex: 1,
      backgroundColor: clr.txtWhite,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 15,
    },
    firstLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      color: clr.primary,
    },
  },
  addTransaction: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: clr.primary1,
    justifyContent: 'center',
    alignItems: 'center',
    iconPlus: {
      color: clr.txtWhite,
      fontSize: 15,
    },
  },
  modalTransaction: {
    height: 'auto',
    borderRadius: 10,
    width: width - 25,
  },
});
