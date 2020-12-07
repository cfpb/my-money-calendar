import React from 'react'
import { observer } from 'mobx-react';
import { FieldArray, Formik } from 'formik';
import { useScrollToTop } from '../../components/scroll-to-top/scroll-to-top';
import { useBEM } from '../../lib/hooks';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../stores';

import SvgImage from '../../components/svg-image/svg-image';

import { Button, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import categoryIcons from '../../lib/category-icons'
import { useStyles } from '../../theme';


function Sources() {
  const classes = useStyles()
  const bem = useBEM( 'wizard' );
  const { wizardStore } = useStore();
  const history = useHistory();
  const { moneyOnHand } = categoryIcons;
  useEffect( () => {
    wizardStore.reset();
  } );

  useScrollToTop();

  return (
    <>
      <header className={bem( 'header' )}>
        <h2 className={bem( 'section-title' )}>Money on Hand</h2>
      </header>

      <main className={bem( 'main' )}>
        <figure className={classes['wizard-step-image']}>
          <SvgImage src={moneyOnHand} alt='placeholder' className={classes['wizard-step-image-asset']} />
        </figure>

        <Formik
          initialValues={{
            fundingSources: [],
            noFunds: false
          }}
          onSubmit={ values => {
            if ( values.noFunds ) {
              wizardStore.setNoStartingFunds();
              history.push( '/money-on-hand/summary' );
              return;
            }

            wizardStore.setFundingSources( values.fundingSources );
            history.push( `/money-on-hand/balances/${ values.fundingSources[0] }` );
          }}
        >
          { formik => <form onSubmit={formik.handleSubmit}>
            <p className='checkbox-group-label'>Where do you have money?</p>
            
            <div className={classes["wizard-field"]}>
              <FieldArray
                name='fundingSources'
                render={ arrayHelpers => <FormGroup>
                  {Object.entries( wizardStore.fundingSourceOptions ).map( ( [ key, { name } ], idx ) => 
                   <FormControlLabel
                    control={
                    <Checkbox 
                      disabled={formik.values.noFunds}
                      key={`funding-source-opt-${ idx }`}
                      name='fundingSources'
                      id={`fundingSources-opt-${ idx }`}
                      value={key}
                      checked={formik.values.fundingSources.includes( key )}
                      onChange={ e => {
                        if ( e.target.checked ) {
                          arrayHelpers.push( key );
                        } else {
                          const i = formik.values.fundingSources.indexOf( key );
                          arrayHelpers.remove( i );
                      }
                    }}/>
                  }
                   label={name}
                  />
                  )}
                </FormGroup>
                }
              />
            </div>
            <div className={classes['wizard-field-last']}>
              <FormControlLabel
                control={<Checkbox
                  id='funding-source-none'
                  key='funding-source-none'
                  name='noFunds'
                  checked={Boolean( formik.values.noFunds )}
                  onChange={ e => {
                    formik.setFieldValue( 'fundingSources', [] );
                    formik.handleChange( e );
                  }}
                />}
                label='None'
                />
              </div>

            <div className={bem( 'buttons' )} style={{ justifyContent: 'flex-end' }}>
              <Button type='submit' disabled={!formik.values.fundingSources.length && !formik.values.noFunds} 
                      className={classes['flex-end']} variant="contained" color="secondary" size="large" disableElevation>
                Next
              </Button>
            </div>
          </form>
          }
        </Formik>
      </main>
    </>
  );
}

export default observer( Sources );
