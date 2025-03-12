import { Wave } from 'react-animated-text';

import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';

import Loader from '../components/Loader/Loader';
import {
  selectIsLoading,
  selectBaseCurrency,
  selectFilteredRates,
} from '../redux/currency/selectors';
import { useDispatch, useSelector } from 'react-redux';
import RatesList from '../components/RatesList/RatesList';
import { useEffect } from 'react';
import { fetchRates } from '../redux/currency/operations';
import Filter from '../components/Filter/Filter';

const Rates = () => {
  const isError = false;
  const dispatch = useDispatch();

  const loader = useSelector(selectIsLoading);
  const fileredRates = useSelector(selectFilteredRates);
  const baseCurrency = useSelector(selectBaseCurrency);

  useEffect(() => {
    dispatch(fetchRates(baseCurrency));
  }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        <Filter />
        {fileredRates.length > 0 && <RatesList rates={fileredRates} />}

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
      {loader && <Loader />}
    </Section>
  );
};

export default Rates;
