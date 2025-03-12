import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { fetchExchangeCurrenty } from '../../redux/currency/operations';
import { useDispatch } from 'react-redux';

const ExchangeForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const value = e.target.elements.currency.value.trim();
    //       15    USD  in UAH
    const [amount, from, , to] = value.split(' ');
    dispatch(fetchExchangeCurrenty({ amount, from, to }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        name="currency"
        title="Request format 15 USD in UAH"
        className={styles.input}
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
      />
    </form>
  );
};

export default ExchangeForm;
