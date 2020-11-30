import React from 'react'
import * as yup from 'yup';
import { CustomCheckBox, CurrencyField, DateField, RadioButton, SelectField, CustomTextField } from '../../../components/forms/forms';
import { dayjs, numberWithOrdinal, recurrenceRules } from '../../../lib/calendar-helpers';
import { Redirect, useHistory, useParams, withRouter } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Categories } from '../../../stores/models/categories';
import { Formik } from 'formik';
import { narrativeCopy } from '../../../lib/narrative-copy';
import { observer } from 'mobx-react';
import { pluck } from '../../../lib/object-helpers';
import { range } from '../../../lib/array-helpers';
import { useScrollToTop } from '../../../components/scroll-to-top/scroll-to-top';
import { useStore } from '../../../stores';

import CashFlowEvent from '../../../stores/models/cash-flow-event';
import Logger from '../../../lib/logger';
import ModalDialog from '../../../components/modal-dialog/modal-dialog';
import NarrativeModal from '../../../components/narrative-notification/narrative-notification';
import { Button } from '@material-ui/core';


function Form() {
  useScrollToTop();

  const { uiStore, eventStore } = useStore();
  const formValues = useRef( null );
  const history = useHistory();
  const [
    recurrenceUpdateModalState,
    showRecurrenceUpdateModal ] = useState( false );
  const [ showModal, setShowModal ] = useState();
  const logger = useMemo( () => Logger.addGroup( 'eventForm' ), [] );
  const monthDayOptions = useMemo(
    () => [ ...range( 1, 30 ) ].map( num => ( { label: numberWithOrdinal( num ), value: num } ) ),
    []
  );
  const paydaySchema = useMemo(
    () => yup.number().when( [ 'recurs', 'recurrenceType' ],
      { is: ( recurs, recurrenceType ) => recurs && recurrenceType === 'semimonthly',
        then: yup
          .number()
          .integer()
          .required( 'Day of month is required for semimonthly recurrences' )
          .cast(),
        otherwise: yup.number()
      } ),
    []
  );
  const handleCatName = category => (
    category === 'TANF' || category === 'SNAP' ? category : category.toLowerCase() );
  const { id, categories = '' } = useParams();

  useEffect( () => {
    const isNew = !id;
    const categoryPath = categories.replace( /\//g, '.' );
    const category = Categories.get( categoryPath );
    const handleModalSession = () => {
      const snapVisit = localStorage.getItem( 'snapVisit' );
      if ( category.name === 'SNAP' && !snapVisit ) {
        setShowModal( true );
      } else {
        setShowModal( false );
      }
    };

    handleModalSession();
  }, [] );

  // Toggle bottom nav bar when inputs are focused, to prevent it from obscuring text on mobile screens:
  const focusHandler = useCallback(
    evt => {
      uiStore.toggleBottomNav( false );
    },
    [ uiStore ]
  );
  const blurHandler = useCallback(
    cb => evt => {
      uiStore.toggleBottomNav( true );
      cb( evt );
    },
    [ uiStore ]
  );
  const saveEvent = useCallback( async ( values,
    updateRecurrences = false ) => {
    try {
      await eventStore.saveEvent( values, updateRecurrences );
      history.push( '/calendar' );
    } catch ( err ) {
      logger.error( err );
      uiStore.setError( err );
    }
  }, [ eventStore, logger, uiStore ] );

  /* let { id, categories = '' } = useParams(); */
  const isNew = !id;
  let categoryPath = categories.replace( /\//g, '.' );
  let pathSegments = categoryPath.split( '.' );
  let category = Categories.get( categoryPath );
  let eventType = pathSegments[0];
  // Should eventually return a loading spinner here:
  if ( id && !eventStore.eventsLoaded ) return null;

  if ( isNew && !category ) return <Redirect to='/calendar/add' />;

  const event = id ?
    eventStore.getEvent( id ) :
    new CashFlowEvent( {
      category: categoryPath,
      dateTime: uiStore.selectedDate
    } );

  if ( id && event ) {
    categoryPath = event.category;
    category = Categories.get( categoryPath );
    pathSegments = categoryPath.split( '.' );
    eventType = pathSegments[0];
    logger.log( 'Editing existing event: %O', event );
  }

  const recurrenceOptions = Object.entries(
    category.recurrenceTypes ?
      pluck( recurrenceRules, category.recurrenceTypes ) :
      recurrenceRules
  ).map( ( [ value, { label } ] ) => ( { label, value } ) );

  const handleToggleModal = event => {
    event.preventDefault();
    localStorage.setItem( 'snapVisit', true );
    setShowModal( !showModal );
  };

  return (
    <section className='add-event'>
      { showModal &&
        <NarrativeModal showModal={showModal}
          handleOkClick={handleToggleModal}
          copy={narrativeCopy.step4}
        />
      }
      <Button variant='contained' className="back-button" onClick={() => history.goBack()}>
        Back
      </Button>

      <h2 className='add-event__title'>{category.name}</h2>
      {category.name === 'Job' ?
        <p className='add-event__intro'> Enter your paycheck information.</p> :
        <p className='add-event__intro'>
          Enter the details of your {handleCatName( category.name )} {eventType}.
        </p>
      }
      {Boolean( category.description ) &&
        <p className='add-event__description'>
          {category.description}
        </p>}

      <Formik
        initialValues={event.toFormValues()}
        validationSchema={yup.object( {
          name: yup.string(),
          totalCents: yup
            .number( 'Total must be a number' )
            .integer()
            .positive( 'Total must be greater than $0.00' )
            .required( 'Total is required' ),
          dateTime: yup.date( 'Must be a valid date' ).required( 'Date is required' ),
          recurrenceType: yup.string().nullable().when( 'recurs', {
            is: true,
            then: yup.string().required( 'Frequency is required for recurring transactions' ),
            otherwise: yup.string()
          } ),
          payday1: paydaySchema,
          payday2: paydaySchema
        } )}
        onSubmit={ values => {
          if ( !values.name ) values.name = category.name;

          logger.debug( 'Event form submission: %O', values );
          logger.debug( 'Category %s', categoryPath );

          values.totalCents = Number.parseInt( values.totalCents, 10 );
          values.dateTime = dayjs( values.dateTime, 'YYYY-MM-DD' );

          if ( eventType === 'expense' ) values.totalCents = -values.totalCents;

          if ( values.recurs ) {
            const { handler } = recurrenceRules[values.recurrenceType];
            values.recurrenceRule =
              values.recurrenceType === 'semimonthly' ?
                handler( values.dateTime.toDate(),
                  values.payday1, values.payday2 ) :
                handler( values.dateTime.toDate() );
          }

          if ( event.persisted && event.recurs ) {
            formValues.current = values;
            return showRecurrenceUpdateModal( true );
          }

          if ( localStorage.getItem( 'enteredData' ) === null ) {
            localStorage.setItem( 'enteredData', 'initial' );
          } else {
            localStorage.setItem( 'enteredData', 'subsequent' );
          }

          return saveEvent( values );
        }}
      >
        { formik => <form onSubmit={formik.handleSubmit}>
          {console.log(formik.errors)}
          <CustomTextField
            name='name'
            id='name'
            label='Description'
            onChange={formik.handleChange}
            onFocus={focusHandler}
            onBlur={blurHandler( formik.handleBlur )}
            value={formik.values.name}
            errors={formik.errors.name}
            touched={formik.touched.name}
            tabIndex='0'
            placeholder={`For example: ${ category.name }`}
          />
          <CustomCheckBox
            id='recurs'
            name='recurs'
            label='Recurring?'
            checked={formik.values.recurs}
            onChange={formik.handleChange}
            tabIndex='0'
          />

          {formik.values.recurs &&
              <SelectField
                id='recurrenceType'
                name='recurrenceType'
                label='Frequency'
                options={recurrenceOptions}
                value={formik.values.recurrenceType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors.recurrenceType}
                touched={formik.touched.recurrenceType}
                tabIndex='0'
              />
          }

          {formik.values.recurs && formik.values.recurrenceType === 'semimonthly' &&
              <>
                <SelectField
                  id='payday1'
                  name='payday1'
                  label='First Payday'
                  options={monthDayOptions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payday1}
                  required={formik.values.recurrenceType === 'semimonthly'}
                  tabIndex='0'
                />
                <SelectField
                  id='payday2'
                  name='payday2'
                  label='Second Payday'
                  options={monthDayOptions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payday2}
                  required={formik.values.recurrenceType === 'semimonthly'}
                  tabIndex='0'
                />
              </>
          }
          <CurrencyField
            id='totalCents'
            name='totalCents'
            label='Amount'
            onChange={formik.handleChange}
            onFocus={focusHandler}
            onBlur={blurHandler( formik.handleBlur )}
            value={formik.values.totalCents}
            errors={formik.errors.totalCents}
            touched={formik.touched.totalCents}
            tabIndex='0'
            required
          />

          <DateField
            id='dateTime'
            name='dateTime'
            label='Date'
            onChange={formik.handleChange}
            onFocus={focusHandler}
            onBlur={blurHandler( formik.handleBlur )}
            value={formik.values.dateTime || ''}
            errors={formik.errors.dateTime}
            touched={formik.touched.dateTime}
            tabIndex='0'
            required
          />

          <Button
            disabled={!formik.dirty && !formik.isValid}
            type='submit'
            tabIndex='0'
            color="secondary"
            variant="contained"
            >
              Save
          </Button>
        </form>
        }
      </Formik>

      <ModalDialog
        contentLabel='Recurring event update options'
        isOpen={recurrenceUpdateModalState}
        onRequestClose={() => showRecurrenceUpdateModal( false )}
        id='recurrence-update-dialog'
        prompt='Update the totals of future occurrences of this event?'
        actions={[
          {
            label: 'Yes',
            onClick: async () => {
              showRecurrenceUpdateModal( false );
              await saveEvent( formValues.current, true );
            }
          },
          {
            label: 'No',
            onClick: async () => {
              showRecurrenceUpdateModal( false );
              await saveEvent( formValues.current );
            }
          }
        ]}
        showCancel={false}
      />
    </section>
  );
}

export default withRouter( observer( Form ) );
