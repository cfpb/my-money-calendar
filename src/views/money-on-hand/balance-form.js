import React from 'react'
import { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useStore } from '../../stores';
import { useBEM } from '../../lib/hooks';
import { CurrencyField } from '../../components/forms/forms';
import { useScrollToTop } from '../../components/scroll-to-top/scroll-to-top';

import categoryIcons from '../../lib/category-icons';
import { Button } from '@material-ui/core';

function BalanceForm() {
  const { wizardStore } = useStore();
  const bem = useBEM( 'wizard' );
  const { source } = useParams();
  const history = useHistory();
  let nextStep
  let goBack
  useScrollToTop();

  if ( wizardStore.fundingSources.length ){
    const currentIndex = wizardStore.fundingSources.indexOf( source );
    const prevSource = currentIndex > 0 ? wizardStore.fundingSources[currentIndex - 1] : null;
    const prevStep = prevSource ? `/money-on-hand/balances/${ prevSource }` : '/money-on-hand/sources';
    const nextSource =
      wizardStore.fundingSources.length > currentIndex + 1 ? wizardStore.fundingSources[currentIndex + 1] : null;
    nextStep = nextSource ? `/money-on-hand/balances/${ nextSource }` : '/money-on-hand/summary';
    goBack = evt => {
      evt.preventDefault();
      history.push( prevStep );
    };
  } 

  const initialValues = useMemo(
    () => wizardStore.fundingSources.reduce( ( values, source ) => {
      values[source] = wizardStore.fundingSourceBalances[source] || 0;
      return values;
    }, {} ),
    [ wizardStore.fundingSources ]
  );

  if( !wizardStore.fundingSources.length ) {
    return <Redirect to='/money-on-hand' />;
  }

  return (
    <>
      <header className={bem( 'header' )}>
        <h2 className={bem( 'section-title' )}>Money on Hand</h2>
      </header>

      <main className={bem( 'main' )}>
        <figure className={bem( 'step-image' )}>
          <img src={categoryIcons.moneyOnHand} />
        </figure>

        <Formik
          initialValues={initialValues}
          validationSchema={yup.object( {
            [source]: yup.number( 'Balance must be a number' ).required( 'Balance is required' )
          } )}
          onSubmit={ values => {
            wizardStore.logger.debug( 'Submit form: %O', values );
            wizardStore.setFundingSourceBalance( source, Number( values[source] ) );
            history.push( nextStep );
          }}
        >
          { formik => <form onSubmit={formik.handleSubmit}>
            <CurrencyField
              autoFocus
              required
              id={source}
              name={source}
              label={wizardStore.fundingSourceOptions[source].label}
              value={formik.values[source]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors[source]}
              touched={formik.touched[source]}
            />

            <div className={bem( 'buttons' )}>
              <Button type='button' onClick={goBack} variant="contained" color="secondary">Back</Button>
              <Button type='submit' variant="contained" color="secondary">Next</Button>
            </div>
          </form>
          }
        </Formik>
      </main>
    </>
  );
}

export default observer( BalanceForm );
