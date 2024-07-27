import {Alert, Dimensions} from 'react-native';

export const uniqueId = Math.floor(Math.random() * 100);

export const now = new Date().toLocaleString();

export const {width, height} = Dimensions.get('window');

export const categories = [
  {
    category: 'Mua sắm',
    value: require('../assets/icon_shopping_bag.png'),
  },
  {
    category: 'Ăn uống ngoài',
    value: require('../assets/icon_dinner.png'),
  },
  {
    category: 'Di chuyển',
    value: require('../assets/icon_move.png'),
  },
  {
    category: 'Lương',
    value: require('../assets/icon_salary.png'),
  },
  {
    category: 'Thưởng',
    value: require('../assets/icon_ponus.png'),
  },
  {
    category: 'Khác',
    value: require('../assets/icon_other.png'),
  },
];

export const selectCategories = [
  {
    title: 'Mua sắm',
    value: 'Mua sắm',
  },
  {
    title: 'Ăn uống ngoài',
    value: 'Ăn uống ngoài',
  },
  {
    title: 'Di chuyển',
    value: 'Di chuyển',
  },
  {
    title: 'Lương',
    value: 'Lương',
  },
  {
    title: 'Thưởng',
    value: 'Thưởng',
  },
  {
    title: 'Khác',
    value: 'Khác',
  },
];

export const headerOptions = () => ({
  headerTransparent: true,
  headerShown: false,
});

export const headerOptionsDetail = ({route}) => ({title: route.params.name});

export const showAlert = (title, message) => {
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: () => {},
    },
  ]);
};
