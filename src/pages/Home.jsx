import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import { selectExchangeInfo } from '../redux/currency/selectors';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import { selectIsLoading } from '../redux/currency/selectors';

const Home = () => {
  const isError = false;
  const exchangeInfo = useSelector(selectExchangeInfo);
  const loader = useSelector(selectIsLoading);

  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />
        <ExchangeForm />
        {/*                               передаємо пропси */}
        {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
      {loader && <Loader />}
    </Section>
  );
};

export default Home;
