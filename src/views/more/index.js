import React from 'react'
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import ModalDialog from '../../components/modal-dialog/modal-dialog';
import { useStore } from '../../stores';
import { useBEM } from '../../lib/hooks';
import { useScrollToTop } from '../../components/scroll-to-top/scroll-to-top';
import { Button } from '@material-ui/core';
import { useStyles } from '../../theme';

function More() {
  const classes = useStyles()
  const { eventStore, uiStore } = useStore();
  const bem = useBEM( 'more' );
  const history = useHistory();
  const [ clearDataModalOpen, toggleClearDataModal ] = useToggle( false );

  const clearAllData = useCallback( async evt => {
    evt.preventDefault();
    await eventStore.clearAllData();
    history.push( '/' );
  }, [ eventStore, history ] );

  useScrollToTop();

  return (
    <section className={bem()}>
      <header className={bem( 'header' )}>
        <h1 className={bem( 'app-title' )}>myMoney Calendar</h1>
        <h2 className={bem( 'section-title' )}>More Options</h2>
      </header>

      <main className={bem( 'main' )}>
        <ul className={bem( 'actions' )}>
          <li className={bem( 'actions-item' )}>
          <Link to='/more/export/strategies'>
            <Button variant="contained" color="secondary" size="large">
              Save Strategies
            </Button>
          </Link>
          </li>
          <li className={bem( 'actions-item' )}>
            <Link to='/more/export/calendar'>
              <Button variant="contained" color="secondary" size="large">
                Save Calendar
              </Button>
            </Link>
          </li>
          <li className={bem( 'actions-item' )}>
              <Button variant="contained" className={'warn-button'} size="large" onClick={() => toggleClearDataModal( true )}>
                Clear My Data
              </Button>
          </li>
        </ul>
      </main>

      <ModalDialog
        contentLabel='Clear all user data confirmation dialog'
        isOpen={clearDataModalOpen}
        onRequestClose={() => toggleClearDataModal( false )}
        id='clear-data-modal'
        prompt='Really delete all of your data and reset the app?'
        showCancel
        actions={[
          {
            label: 'Yes',
            onClick: clearAllData
          }
        ]}
      />
    </section>
  );
}

export default observer( More );
